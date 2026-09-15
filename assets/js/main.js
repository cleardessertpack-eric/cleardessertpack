document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => btn.closest(".faq-item").classList.toggle("open"));
  });

  const FORM_ENDPOINT = "/api/inquiry";
  const SALES_EMAIL = "cleardessertpack@gmail.com";
  const mobileEmailMode = window.matchMedia && window.matchMedia("(max-width: 820px)").matches;

  function showFormMessage(form, type, text) {
    let el = form.querySelector(".form-status-message");
    if (!el) {
      el = document.createElement("div");
      el.className = "form-status-message";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      el.style.marginTop = "14px";
      el.style.padding = "12px 14px";
      el.style.borderRadius = "10px";
      el.style.fontWeight = "700";
      el.style.fontSize = ".9rem";
      form.appendChild(el);
    }
    el.textContent = text;
    el.style.background = type === "success" ? "#e9f6f1" : "#fdecec";
    el.style.color = type === "success" ? "#246853" : "#a3262b";
  }

  function cleanChoice(value, placeholderPattern) {
    const text = String(value || "").trim();
    return placeholderPattern.test(text) ? "" : text;
  }

  function formPayload(form, startedAt) {
    const data = new FormData(form);
    const checks = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
      .map((input) => input.value)
      .join(", ");

    return {
      name: data.get("name") || "",
      company: data.get("company") || "",
      country: data.get("country") || "",
      contact: data.get("contact") || "",
      product: cleanChoice(data.get("product"), /^Product interested in$/i),
      custom_options: checks,
      application: cleanChoice(data.get("application"), /^Application scene$/i),
      logo_files: cleanChoice(data.get("logo_files"), /^Do you have logo files\?$/i),
      quantity: data.get("quantity") || "",
      message: data.get("message") || "",
      website: data.get("website") || "",
      started_at: startedAt,
      source: window.location.href,
    };
  }

  function buildMobileMailto(payload) {
    const pageTitle = (document.querySelector("h1")?.textContent || document.title || "Clear Dessert Pack").replace(/\s+/g, " ").trim();
    const subjectProduct = payload.product || pageTitle;
    const subject = `Custom Packaging RFQ - ${subjectProduct}`.slice(0, 180);
    const lines = [
      "Hello Clear Dessert Pack,",
      "",
      `Product / project: ${payload.product || ""}`,
      `Custom options: ${payload.custom_options || ""}`,
      `Application: ${payload.application || ""}`,
      `Estimated quantity: ${payload.quantity || ""}`,
      `Country / market: ${payload.country || ""}`,
      `Logo files: ${payload.logo_files || ""}`,
      `Company: ${payload.company || ""}`,
      `Contact: ${payload.contact || ""}`,
      "",
      "Project details:",
      payload.message || "",
      "",
      `Source page: ${payload.source}`,
      "",
      "Thank you."
    ];
    return `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  function trackMobileEmail(payload) {
    if (typeof window.gtag === "function") {
      window.gtag("event", "mobile_email_quote", {
        page_location: window.location.href,
        product: payload.product || "",
      });
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "mobile_email_quote",
        page_location: window.location.href,
        product: payload.product || "",
      });
    }
  }

  document.querySelectorAll("[data-inquiry-form]").forEach((form) => {
    const trap = document.createElement("input");
    trap.type = "text";
    trap.name = "website";
    trap.tabIndex = -1;
    trap.autocomplete = "off";
    trap.setAttribute("aria-hidden", "true");
    trap.style.position = "absolute";
    trap.style.left = "-9999px";
    form.appendChild(trap);

    const startedAt = Date.now();
    const submitBtn = form.querySelector('button[type="submit"]');

    if (mobileEmailMode) {
      form.setAttribute("novalidate", "novalidate");
      if (submitBtn) {
        submitBtn.textContent = "Email for Custom Quote";
        submitBtn.setAttribute("aria-label", `Open your email app to send a quote request to ${SALES_EMAIL}`);
      }
    }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const payload = formPayload(form, startedAt);

      if (mobileEmailMode) {
        trackMobileEmail(payload);
        window.location.href = buildMobileMailto(payload);
        return;
      }

      const originalLabel = submitBtn ? submitBtn.textContent : "";
      const previousMessage = form.querySelector(".form-status-message");
      if (previousMessage) previousMessage.remove();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute("aria-busy", "true");
        submitBtn.textContent = "Sending...";
      }

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || "Form submission failed");

        showFormMessage(
          form,
          "success",
          "Thank you. Your enquiry has been sent successfully. We normally reply within one business day."
        );
        form.reset();
      } catch (error) {
        showFormMessage(
          form,
          "error",
          `We could not send your enquiry right now. Please try again or email ${SALES_EMAIL}.`
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.removeAttribute("aria-busy");
          submitBtn.textContent = originalLabel;
        }
      }
    });
  });
});
