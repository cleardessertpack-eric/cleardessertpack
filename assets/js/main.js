
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => btn.closest(".faq-item").classList.toggle("open"));
  });

  const FORM_ENDPOINT = "https://formsubmit.co/ajax/cleardessertpack@gmail.com";

  function showFormMessage(form, type, text) {
    let el = form.querySelector(".form-status-message");
    if (!el) {
      el = document.createElement("div");
      el.className = "form-status-message";
      el.style.marginTop = "14px";
      el.style.padding = "12px 14px";
      el.style.borderRadius = "10px";
      el.style.fontWeight = "700";
      el.style.fontSize = ".9rem";
      form.appendChild(el);
    }
    el.textContent = text;
    if (type === "success") {
      el.style.background = "#e9f6f1";
      el.style.color = "#246853";
    } else {
      el.style.background = "#fdecec";
      el.style.color = "#a3262b";
    }
  }

  const forms = document.querySelectorAll("[data-inquiry-form]");
  forms.forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const checks = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
        .map((i) => i.value)
        .join(", ");

      const payload = {
        _subject: "New wholesale inquiry - Clear Dessert Pack",
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
      };

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Form submission failed");
        showFormMessage(form, "success", "Thanks - your inquiry has been sent. We usually reply within one business day.");
        form.reset();
      } catch (err) {
        showFormMessage(
          form,
          "error",
          "Something went wrong sending your inquiry. Please email us directly at cleardessertpack@gmail.com."
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      }
    });
  });
});
