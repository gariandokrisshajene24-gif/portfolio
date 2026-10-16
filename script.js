
"use strict";

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });
}

// Profile photo: display a placeholder if the image is missing
const profilePhoto = document.getElementById("profilePhoto");
const photoPlaceholder = document.getElementById("photoPlaceholder");

if (profilePhoto && photoPlaceholder) {
  const showPhoto = () => {
    profilePhoto.hidden = false;
    photoPlaceholder.hidden = true;
  };

  const showPlaceholder = () => {
    profilePhoto.hidden = true;
    photoPlaceholder.hidden = false;
  };

  profilePhoto.addEventListener("load", showPhoto);
  profilePhoto.addEventListener("error", showPlaceholder);

  if (profilePhoto.complete && profilePhoto.naturalWidth > 0) {
    showPhoto();
  } else if (profilePhoto.complete) {
    showPlaceholder();
  }
}

// Current year in the footer
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Contact form: prepare a message in the visitor's email app
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// Replace this with your real email address
const portfolioEmail = "your.email@example.com";

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message
    ].join("\n");

    const mailto =
      `mailto:${portfolioEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    if (formStatus) {
      formStatus.textContent =
        "Opening your email application. If it does not open, check your email app settings.";
    }

    window.location.href = mailto;
  });
}
