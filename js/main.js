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
  ".page-intro,.section-head,.project-card,.split-copy,.split-art,.quote-band,.cta-panel,.team-group,.contact-grid,.novel-hero,.novel-updates",
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

// Chapter reader dialog
const chapterDialog = document.querySelector("#chapter-dialog");
const openChapterButton = document.querySelector("#open-prologue");
const closeChapterButton = chapterDialog?.querySelector(
  ".chapter-dialog__close",
);
if (
  chapterDialog &&
  openChapterButton &&
  closeChapterButton &&
  typeof chapterDialog.showModal === "function"
) {
  openChapterButton.addEventListener("click", () => {
    if (!chapterDialog.open) {
      chapterDialog.showModal();
      document.body.classList.add("reader-open");
    }
  });
  closeChapterButton.addEventListener("click", () => chapterDialog.close());
  chapterDialog.addEventListener("click", (event) => {
    if (event.target === chapterDialog) chapterDialog.close();
  });
  chapterDialog.addEventListener("close", () =>
    document.body.classList.remove("reader-open"),
  );
}

// Image viewer dialog (Work page)
(function () {
  const viewer = document.getElementById("image-viewer");
  const viewerImg = document.getElementById("image-viewer-img");
  const viewerCaption = document.getElementById("image-viewer-caption");
  const closeBtn = viewer?.querySelector("[data-close-viewer]");
  const triggerImages = document.querySelectorAll(".art-card img[data-fullsrc]");
  let lastFocused = null;

  if (!viewer || !viewerImg || !viewerCaption || !closeBtn || triggerImages.length === 0) return;

  function openViewer(src, caption) {
    lastFocused = document.activeElement;
    viewerImg.src = src;
    viewerImg.alt = caption || "";
    viewerCaption.textContent = caption || "";
    viewer.showModal();
    closeBtn.focus();
    document.body.style.overflow = "hidden";
  }

  function closeViewer() {
    viewer.close();
    viewerImg.src = "";
    viewerCaption.textContent = "";
    document.body.style.overflow = "";
    lastFocused?.focus();
  }

  triggerImages.forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      const src = img.dataset.fullsrc || img.src;
      const caption = img.dataset.caption || img.alt;
      openViewer(src, caption);
    });
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        img.click();
      }
    });
  });

  closeBtn.addEventListener("click", closeViewer);

  viewer.addEventListener("click", (e) => {
    if (e.target === viewer || e.target === viewer.querySelector(".image-viewer__backdrop")) {
      closeViewer();
    }
  });

  viewer.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeViewer();
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
