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

      // Trigger Form Submit Event
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'form_submit',
        form_id: form.id || 'wholesale-inquiry-form',
        form_name: form.getAttribute('name') || 'Wholesale Inquiry Form'
      });
      if (typeof gtag === 'function') {
        gtag('event', 'form_submit', {
          'form_id': form.id || 'wholesale-inquiry-form',
          'form_name': form.getAttribute('name') || 'Wholesale Inquiry Form'
        });
      }
      trackGoogleAdsConversion(10);

      window.location.href = "mailto:sales@cleardessertpack.com?subject=" + subject + "&body=" + body;
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
      const name = data.get("name") || "";
      const company = data.get("company") || "";
      const country = data.get("country") || "";
      const product = data.get("product") || "";
      const itemNo = data.get("item_no") || "";
      const checks = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
        .map((i) => i.value)
        .join(", ") || "None";
      const application = data.get("application") || "";
      const logoFiles = data.get("logo_files") || "";
      const quantity = data.get("quantity") || "";
      const message = data.get("message") || "";

      // Construct WhatsApp structured message
      const textMessage = `Hi, I would like to request a custom dessert packaging quote.
Name: ${name}
Company: ${company}
Country: ${country}
Product Interested In: ${product}
Item No.: ${itemNo}
Custom Options: ${checks}
Application Scene: ${application}
Logo File: ${logoFiles}
Estimated Quantity: ${quantity}
Message: ${message}`;

      // Trigger Form Submit Event
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'form_submit',
        form_id: form.id || 'wholesale-inquiry-form-whatsapp',
        form_name: (form.getAttribute('name') || 'Wholesale Inquiry Form') + ' via WhatsApp'
      });
      if (typeof gtag === 'function') {
        gtag('event', 'form_submit', {
          'form_id': form.id || 'wholesale-inquiry-form-whatsapp',
          'form_name': (form.getAttribute('name') || 'Wholesale Inquiry Form') + ' via WhatsApp'
        });
      }
      trackGoogleAdsConversion(10);

      const encodedMsg = encodeURIComponent(textMessage);
      const url = `https://wa.me/8618358130956?text=${encodedMsg}`;
      window.open(url, "_blank");
    });
  });

  // Global Event Listener for Clicks (WhatsApp, Request Quote, Size Chart, Email)
  document.addEventListener("click", function(e) {
    const target = e.target.closest("a, button");
    if (!target) return;

    const href = target.getAttribute("href") || "";
    const text = (target.innerText || target.textContent || "").trim();

    // 1. WhatsApp Click Tracking (href contains wa.me)
    if (href.includes("wa.me")) {
      let locationName = "other";
      if (target.closest(".hero")) {
        locationName = "hero";
      } else if (target.classList.contains("wa-floating") || target.closest(".wa-floating")) {
        locationName = "floating";
      } else if (target.closest(".products-section") || target.closest("#sku-grid") || target.closest(".grid-3") || target.closest(".grid-4")) {
        locationName = "core_offering_or_grid";
      } else if (target.closest(".site-footer")) {
        locationName = "footer";
      } else if (target.closest(".contact-section") || target.closest(".split") || window.location.pathname.includes("contact")) {
        locationName = "contact_page";
      } else if (target.closest(".product-card") || target.closest(".card")) {
        locationName = "sku_card";
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "whatsapp_click",
        link_url: href,
        button_location: locationName
      });
      if (typeof gtag === "function") {
        gtag("event", "whatsapp_click", {
          "link_url": href,
          "button_location": locationName
        });
      }
    }

    // 3. Request Quote Click Tracking
    const matchTexts = ["Request Quote", "Request Box Quote", "Request Custom Quote", "Ask for Stencil Quote", "Request Quote & Sample"];
    if (matchTexts.some(t => text.includes(t))) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "request_quote_click",
        button_text: text
      });
      if (typeof gtag === "function") {
        gtag("event", "request_quote_click", {
          "button_text": text
        });
      }
    }

    // 4. View Size Chart Click Tracking
    if (href.includes("clear-dessert-box-sizes.html") || text === "View Full Size Chart") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "view_size_chart_click",
        source_page: window.location.pathname
      });
      if (typeof gtag === "function") {
        gtag("event", "view_size_chart_click", {
          "source_page": window.location.pathname
        });
      }
    }

    // 5. Email Click Tracking (href starts with mailto:)
    if (href.startsWith("mailto:")) {
      const email = href.replace("mailto:", "").split("?")[0];
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "email_click",
        email_address: email
      });
      if (typeof gtag === "function") {
        gtag("event", "email_click", {
          "email_address": email
        });
      }
    }
  });
});

// Google Ads Conversion Tracking Placeholder Function
function trackGoogleAdsConversion(value = 0) {
  // Placeholder for Google Ads Conversion Tracking
  // Once ID and Label are provided, user can uncomment and configure:
  /*
  gtag('event', 'conversion', {
    'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
    'value': value,
    'currency': 'USD'
  });
  */
  console.log('Google Ads Conversion Tracked with value:', value);
}
