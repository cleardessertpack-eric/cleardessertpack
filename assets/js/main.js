
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

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const checks = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
        .map((input) => input.value)
        .join(", ");

      const payload = {
        name: data.get("name") || "",
        company: data.get("company") || "",
        country: data.get("country") || "",
        contact: data.get("contact") || "",
        product: data.get("product") || "",
        custom_options: checks,
        application: data.get("application") || "",
        logo_files: data.get("logo_files") || "",
        quantity: data.get("quantity") || "",
        message: data.get("message") || "",
        website: data.get("website") || "",
        started_at: startedAt,
        source: window.location.href,
      };

      const submitBtn = form.querySelector('button[type="submit"]');
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
          "We could not send your enquiry right now. Please try again or email cleardessertpack@gmail.com."
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
