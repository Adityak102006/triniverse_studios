// Mobile navigation
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
  });
}

// Footer copyright year
document
  .querySelectorAll("[data-year]")
  .forEach((el) => (el.textContent = new Date().getFullYear()));

// Reveal sections and cards as they enter the viewport
const motionTargets = document.querySelectorAll(
  ".page-intro,.section-head,.project-card,.split-copy,.split-art,.quote-band,.cta-panel,.team-group,.contact-grid,.novel-panel",
);
if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
  );
  motionTargets.forEach((element, index) => {
    element.classList.add("reveal-on-view");
    element.style.setProperty("--reveal-delay", `${(index % 3) * 85}ms`);
    observer.observe(element);
  });
}

// Prologue Reader Dialog
(function () {
  const dialog = document.getElementById("prologue-dialog");
  const openBtn = document.getElementById("open-prologue");
  const closeBtn = dialog?.querySelector("[data-close-prologue]");
  let lastFocusedElement = null;
  let bodyOverflow = "";

  if (!dialog || !openBtn || !closeBtn) return;

  function lockBodyScroll() {
    bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  function unlockBodyScroll() {
    document.body.style.overflow = bodyOverflow;
  }

  function openDialog() {
    lastFocusedElement = document.activeElement;
    lockBodyScroll();
    dialog.showModal();
    closeBtn.focus();
  }

  function closeDialog() {
    unlockBodyScroll();
    dialog.close();
    lastFocusedElement?.focus();
  }

  openBtn.addEventListener("click", openDialog);

  closeBtn.addEventListener("click", closeDialog);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeDialog();
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog();
    }
    if (event.key === "Tab") {
      const focusableElements = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });
})();

// Contact and novel-update forms
const accessKey = "YOUR_WEB3FORMS_ACCESS_KEY";
document.querySelectorAll("[data-web3forms]").forEach((form) =>
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    if (!form.reportValidity()) return;
    if (accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      status.textContent =
        "This form is ready for Web3Forms. Add your access key in js/main.js to enable submissions.";
      return;
    }
    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    status.textContent = "Sending…";
    const payload = Object.fromEntries(new FormData(form));
    payload.access_key = accessKey;
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw new Error(result.message || "Unable to send your message.");
      status.textContent =
        form.dataset.success || "Thanks — your message has been sent.";
      form.reset();
    } catch (error) {
      status.textContent =
        error.message || "Something went wrong. Please try again.";
    } finally {
      button.disabled = false;
    }
  }),
);
