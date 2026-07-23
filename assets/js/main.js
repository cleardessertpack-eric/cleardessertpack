document.addEventListener("DOMContentLoaded", function () {
  // Global extra-large WhatsApp button: fixed at the right center on every page.
  const floatingLinks = Array.from(document.querySelectorAll("a.wa-floating"));
  const floatingWhatsApp = floatingLinks.shift() || document.createElement("a");
  floatingLinks.forEach((link) => link.remove());

  const whatsappMessage = encodeURIComponent(
    "Hi, I'm interested in your clear dessert packaging products. Please send me more information."
  );
  floatingWhatsApp.id = "global-whatsapp-float";
  floatingWhatsApp.className = "wa-floating global-wa-floating";
  floatingWhatsApp.href = "https://wa.me/8618358130956?text=" + whatsappMessage;
  floatingWhatsApp.target = "_blank";
  floatingWhatsApp.rel = "noopener noreferrer";
  floatingWhatsApp.title = "WhatsApp Us";
  floatingWhatsApp.setAttribute("aria-label", "Contact Clear Dessert Pack on WhatsApp");
  floatingWhatsApp.innerHTML =
    '<svg aria-hidden="true" focusable="false" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.5 32 1.9 131.6 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1C346.2 476.1 448 376.5 448 254c0-59.3-25.2-115-67.1-156.9zM223.9 438.7c-33.2 0-65.7-8.9-93.8-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7C49.4 322.8 39.7 288.9 39.7 254c0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.9 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>';
  document.body.appendChild(floatingWhatsApp);

  if (!document.getElementById("global-whatsapp-float-style")) {
    const whatsappStyle = document.createElement("style");
    whatsappStyle.id = "global-whatsapp-float-style";
    whatsappStyle.textContent = `
      #global-whatsapp-float {
        position: fixed !important;
        right: 24px !important;
        top: 50% !important;
        bottom: auto !important;
        transform: translateY(-50%) !important;
        width: 108px !important;
        height: 108px !important;
        min-width: 108px !important;
        min-height: 108px !important;
        padding: 0 !important;
        margin: 0 !important;
        border: 4px solid #ffffff !important;
        border-radius: 50% !important;
        background: #25d366 !important;
        color: #ffffff !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-shadow: 0 16px 38px rgba(0, 0, 0, 0.28) !important;
        z-index: 9999 !important;
        line-height: 1 !important;
        text-decoration: none !important;
        transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        animation: whatsappButtonGlow 2.4s ease-in-out infinite !important;
        isolation: isolate !important;
      }
      #global-whatsapp-float::before,
      #global-whatsapp-float::after {
        content: "" !important;
        position: absolute !important;
        inset: -5px !important;
        border: 3px solid rgba(37, 211, 102, 0.72) !important;
        border-radius: 50% !important;
        pointer-events: none !important;
        z-index: -1 !important;
        animation: whatsappRipple 2.4s ease-out infinite !important;
      }
      #global-whatsapp-float::after {
        animation-delay: 1.2s !important;
      }
      #global-whatsapp-float:hover {
        transform: translateY(-50%) scale(1.08) !important;
        box-shadow: 0 20px 46px rgba(37, 211, 102, 0.42) !important;
      }
      #global-whatsapp-float:focus-visible {
        outline: 4px solid rgba(37, 211, 102, 0.32) !important;
        outline-offset: 4px !important;
      }
      #global-whatsapp-float svg {
        width: 60px !important;
        height: 60px !important;
        display: block !important;
        fill: currentColor !important;
        position: relative !important;
        z-index: 1 !important;
      }
      @keyframes whatsappButtonGlow {
        0%, 100% {
          filter: drop-shadow(0 0 0 rgba(37, 211, 102, 0));
        }
        50% {
          filter: drop-shadow(0 0 14px rgba(37, 211, 102, 0.72));
        }
      }
      @keyframes whatsappRipple {
        0% {
          transform: scale(0.94);
          opacity: 0.78;
        }
        72%, 100% {
          transform: scale(1.34);
          opacity: 0;
        }
      }
      @media (max-width: 640px) {
        #global-whatsapp-float {
          right: 12px !important;
          width: 84px !important;
          height: 84px !important;
          min-width: 84px !important;
          min-height: 84px !important;
          border-width: 3px !important;
        }
        #global-whatsapp-float svg {
          width: 48px !important;
          height: 48px !important;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        #global-whatsapp-float,
        #global-whatsapp-float::before,
        #global-whatsapp-float::after {
          transition: none !important;
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(whatsappStyle);
  }

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
    if (href.includes("/clear-dessert-box-sizes") || text === "View Full Size Chart") {
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
