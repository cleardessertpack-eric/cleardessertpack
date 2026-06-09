document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => btn.closest(".faq-item").classList.toggle("open"));
  });

  const forms = document.querySelectorAll("[data-inquiry-form]");
  forms.forEach((form) => {
    form.addEventListener("submit", function(e){
      e.preventDefault();
      const data = new FormData(form);
      const checks = Array.from(form.querySelectorAll('input[type="checkbox"]:checked')).map(i => i.value).join(", ");
      const subject = encodeURIComponent("Wholesale inquiry - Clear Dessert Pack V2");
      const body = encodeURIComponent(
        "Name: " + (data.get("name") || "") + "\n" +
        "Company: " + (data.get("company") || "") + "\n" +
        "Country: " + (data.get("country") || "") + "\n" +
        "Email/WhatsApp: " + (data.get("contact") || "") + "\n" +
        "Product interested in: " + (data.get("product") || "") + "\n" +
        "Custom options: " + checks + "\n" +
        "Application: " + (data.get("application") || "") + "\n" +
        "Logo files: " + (data.get("logo_files") || "") + "\n" +
        "Estimated quantity: " + (data.get("quantity") || "") + "\n" +
        "Message: " + (data.get("message") || "")
      );
      window.location.href = "mailto:cleardessertpack@gmail.com?subject=" + subject + "&body=" + body;
    });
  });

  // Dynamic WhatsApp Form Inquiry Binding
  const waButtons = document.querySelectorAll("[data-wa-inquiry-btn]");
  waButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault(); // Intercept static fallback link
      const form = btn.closest("form");
      if (!form) return;

      const data = new FormData(form);
      const company = data.get("company") || "";
      const country = data.get("country") || "";
      const product = data.get("product") || "";
      const checks = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
        .map((i) => i.value)
        .join(", ") || "None";
      const application = data.get("application") || "";
      const logoFiles = data.get("logo_files") || "";
      const quantity = data.get("quantity") || "";
      const message = data.get("message") || "";

      // Construct WhatsApp structured message
      const textMessage = `Hi, I would like to request a custom dessert packaging quote.
Company: ${company}
Country: ${country}
Product Interested In: ${product}
Custom Options: ${checks}
Application Scene: ${application}
Logo File: ${logoFiles}
Estimated Quantity: ${quantity}
Message: ${message}`;

      const encodedMsg = encodeURIComponent(textMessage);
      const url = `https://wa.me/8618358130956?text=${encodedMsg}`;
      window.open(url, "_blank");
    });
  });
});
