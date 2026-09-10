const ALLOWED_ORIGINS = new Set([
  "https://www.cleardessertpack.com",
  "https://cleardessertpack.com",
]);

const MAX_LENGTHS = {
  name: 120,
  company: 160,
  country: 100,
  contact: 200,
  product: 200,
  custom_options: 400,
  application: 200,
  logo_files: 200,
  quantity: 100,
  message: 4000,
  source: 500,
};

function clean(value, maxLength) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function row(label, value) {
  if (!value) return "";
  return `<tr><td style="padding:9px 12px;color:#66737d;border-bottom:1px solid #e8ecef;width:170px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:9px 12px;color:#13212d;border-bottom:1px solid #e8ecef;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`;
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const origin = req.headers.origin;
  const isVercelPreview = origin && /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
  if (origin && !ALLOWED_ORIGINS.has(origin) && !isVercelPreview) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid request" });
    }
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid request" });
  }

  if (clean(body.website, 200)) {
    return res.status(200).json({ ok: true });
  }

  const startedAt = Number(body.started_at);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 1500) {
    return res.status(429).json({ error: "Please wait before submitting" });
  }

  const data = Object.fromEntries(
    Object.entries(MAX_LENGTHS).map(([key, maxLength]) => [key, clean(body[key], maxLength)])
  );

  if (!data.name || !data.contact) {
    return res.status(400).json({ error: "Name and contact details are required" });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error("RESEND_API_KEY is not configured");
    return res.status(503).json({ error: "Enquiry service is not configured" });
  }

  const to = process.env.INQUIRY_TO_EMAIL || "cleardessertpack@gmail.com";
  const sendingDomain = process.env.RESEND_EMAIL_DOMAIN;
  const from =
    process.env.INQUIRY_FROM_EMAIL ||
    (sendingDomain
      ? `Clear Dessert Pack <enquiries@${sendingDomain}>`
      : "Clear Dessert Pack <onboarding@resend.dev>");
  const subjectParts = ["New website enquiry", data.product, data.company || data.name].filter(Boolean);
  const subject = subjectParts.join(" | ").slice(0, 180);

  const rows = [
    row("Name", data.name),
    row("Company", data.company),
    row("Country / market", data.country),
    row("Email / WhatsApp", data.contact),
    row("Product", data.product),
    row("Custom options", data.custom_options),
    row("Application", data.application),
    row("Logo files", data.logo_files),
    row("Estimated quantity", data.quantity),
    row("Project details", data.message),
    row("Source page", data.source),
  ].join("");

  const plainText = [
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Country / market: ${data.country}`,
    `Email / WhatsApp: ${data.contact}`,
    `Product: ${data.product}`,
    `Custom options: ${data.custom_options}`,
    `Application: ${data.application}`,
    `Logo files: ${data.logo_files}`,
    `Estimated quantity: ${data.quantity}`,
    `Project details: ${data.message}`,
    `Source page: ${data.source}`,
  ].join("\n");

  const email = {
    from,
    to: [to],
    subject,
    html: `<div style="font-family:Arial,sans-serif;background:#f4f6f7;padding:28px"><div style="max-width:720px;margin:auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e2e7ea"><div style="background:#0f2637;color:#fff;padding:22px 24px"><div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#ff9fa2;font-weight:700">Clear Dessert Pack</div><h1 style="font-size:22px;margin:7px 0 0">New website enquiry</h1></div><table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table><div style="padding:18px 24px;color:#74818a;font-size:12px">Submitted through cleardessertpack.com</div></div></div>`,
    text: plainText,
  };

  if (isEmail(data.contact)) email.reply_to = data.contact;

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `inquiry-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      },
      body: JSON.stringify(email),
    });

    const result = await emailResponse.json().catch(() => ({}));
    if (!emailResponse.ok) {
      console.error("Resend error", emailResponse.status, result);
      return res.status(502).json({ error: "Email delivery failed" });
    }

    return res.status(200).json({ ok: true, id: result.id });
  } catch (error) {
    console.error("Enquiry email error", error);
    return res.status(502).json({ error: "Email delivery failed" });
  }
};
