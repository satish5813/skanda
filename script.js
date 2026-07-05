const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const projectSelect = document.querySelector("#project");
const form = document.querySelector(".lead-form");
const formStatus = document.querySelector(".form-status");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (projectSelect) {
  document.querySelectorAll("[data-project]").forEach((link) => {
    link.addEventListener("click", () => {
      projectSelect.value = link.dataset.project;
    });
  });
}

if (form && formStatus) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "there";
    formStatus.textContent = `Thanks ${name}. Your Skanda Estates enquiry has been captured. Connect this form to your CRM, WhatsApp, or email service next.`;
    form.reset();
  });
}

