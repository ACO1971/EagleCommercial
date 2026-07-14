(() => {
  "use strict";

  const body = document.body;
  const lang = body.dataset.language === "en" ? "en" : "es";
  const messages = {
    es: {
      required: "Revise los campos obligatorios antes de continuar.",
      invalidEmail: "Ingrese un correo electrónico válido.",
      sending: "Enviando solicitud…",
      sent: "La solicitud fue enviada correctamente.",
      fallback: "Se abrirá su aplicación de correo para completar el envío.",
      sendError: "No fue posible enviar el formulario. Escriba a info@eaglecommercial.com.co.",
      demo: "Esta interfaz es una demostración. El acceso requiere un backend seguro antes de producción.",
      spam: "No fue posible procesar la solicitud."
    },
    en: {
      required: "Please review the required fields before continuing.",
      invalidEmail: "Enter a valid email address.",
      sending: "Sending request…",
      sent: "The request was sent successfully.",
      fallback: "Your email application will open to complete the request.",
      sendError: "The form could not be sent. Email info@eaglecommercial.com.co.",
      demo: "This interface is a demonstration. A secure backend is required before production.",
      spam: "The request could not be processed."
    }
  }[lang];

  const header = document.querySelector("[data-site-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
    body.classList.remove("menu-open");
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      mobileMenu.hidden = isOpen;
      body.classList.toggle("menu-open", !isOpen);
    });
    mobileMenu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1180) closeMenu();
    }, { passive: true });
  }

  const backToTop = document.querySelector("[data-back-to-top]");
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 24);
    backToTop?.classList.toggle("is-visible", y > 700);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.11, rootMargin: "0px 0px -35px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const heroVisual = document.querySelector("[data-hero-visual]");
  if (heroVisual && window.matchMedia("(pointer:fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const hero = heroVisual.closest(".hero");
    hero?.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      heroVisual.style.transform = `perspective(1100px) rotateY(${x * 3.5}deg) rotateX(${y * -3}deg) translate3d(${x * 8}px, ${y * 8}px, 0)`;
    });
    hero?.addEventListener("pointerleave", () => { heroVisual.style.transform = ""; });
  }

  const cookieBanner = document.querySelector("[data-cookie-banner]");
  const cookieKey = "eagle-cookie-preference-v1";
  try {
    if (cookieBanner && !localStorage.getItem(cookieKey)) cookieBanner.hidden = false;
    document.querySelector("[data-cookie-accept]")?.addEventListener("click", () => {
      localStorage.setItem(cookieKey, "accepted");
      cookieBanner.hidden = true;
    });
    document.querySelector("[data-cookie-reject]")?.addEventListener("click", () => {
      localStorage.setItem(cookieKey, "essential-only");
      cookieBanner.hidden = true;
    });
  } catch {
    if (cookieBanner) cookieBanner.hidden = true;
  }

  const messageInput = document.querySelector("#message");
  const charCount = document.querySelector("[data-char-count]");
  if (messageInput && charCount) {
    const updateCount = () => { charCount.textContent = String(messageInput.value.length); };
    updateCount();
    messageInput.addEventListener("input", updateCount);
  }

  const setStatus = (node, message, type = "") => {
    if (!node) return;
    node.textContent = message;
    node.classList.remove("is-success", "is-error");
    if (type) node.classList.add(`is-${type}`);
  };

  const markInvalid = (field) => {
    field.setAttribute("aria-invalid", "true");
    field.addEventListener("input", () => field.removeAttribute("aria-invalid"), { once: true });
    field.addEventListener("change", () => field.removeAttribute("aria-invalid"), { once: true });
  };

  const validBusinessEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);

  const contactForm = document.querySelector("[data-contact-form]");
  contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = contactForm.querySelector("[data-form-status]");
    const submit = contactForm.querySelector("button[type='submit']");
    const required = [...contactForm.querySelectorAll("[required]")];
    let invalid = false;

    required.forEach((field) => {
      const checked = field.type === "checkbox" ? field.checked : field.value.trim().length > 0;
      if (!checked) {
        invalid = true;
        markInvalid(field);
      }
    });

    const email = contactForm.elements.email;
    if (email && email.value && !validBusinessEmail(email.value)) {
      invalid = true;
      markInvalid(email);
      setStatus(status, messages.invalidEmail, "error");
    }

    if (invalid) {
      if (!status?.textContent) setStatus(status, messages.required, "error");
      contactForm.querySelector("[aria-invalid='true']")?.focus();
      return;
    }

    if (contactForm.elements.website?.value) {
      setStatus(status, messages.spam, "error");
      return;
    }

    const formData = Object.fromEntries(new FormData(contactForm).entries());
    delete formData.website;
    formData.language = lang;
    formData.source = window.location.href;
    const config = window.EAGLE_SITE_CONFIG || {};

    if (config.contactEndpoint) {
      setStatus(status, messages.sending);
      if (submit) submit.disabled = true;
      try {
        const response = await fetch(config.contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        contactForm.reset();
        if (charCount) charCount.textContent = "0";
        setStatus(status, messages.sent, "success");
      } catch (error) {
        console.error("Contact form error", error);
        setStatus(status, messages.sendError, "error");
      } finally {
        if (submit) submit.disabled = false;
      }
      return;
    }

    const destination = config.contactEmail || "info@eaglecommercial.com.co";
    const subject = lang === "es"
      ? `Solicitud web — ${formData.organization || formData.name}`
      : `Website enquiry — ${formData.organization || formData.name}`;
    const lines = [
      `Nombre / Name: ${formData.name || ""}`,
      `Cargo / Position: ${formData.position || ""}`,
      `Organización / Organization: ${formData.organization || ""}`,
      `Sector: ${formData.sector || ""}`,
      `Email: ${formData.email || ""}`,
      `Teléfono / Phone: ${formData.phone || ""}`,
      `Ciudad / City: ${formData.city || ""}`,
      `Tipo / Type: ${formData.requestType || ""}`,
      `Horizonte / Horizon: ${formData.urgency || ""}`,
      "",
      formData.message || ""
    ];
    setStatus(status, messages.fallback, "success");
    window.location.href = `mailto:${encodeURIComponent(destination)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  });

  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus(status, messages.required, "error");
        return;
      }
      setStatus(status, messages.demo, "success");
    });
  });
})();
