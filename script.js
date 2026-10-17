"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }));
  }

  const typingName = document.getElementById("typingName");
  if (typingName) {
    const fullName = "Krisshajene.";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typingName.textContent = fullName;
    } else {
      let i = 0, deleting = false;
      const type = () => {
        typingName.textContent = fullName.slice(0, i);
        if (!deleting) {
          i++;
          if (i > fullName.length) { deleting = true; setTimeout(type, 1600); return; }
          setTimeout(type, 120);
        } else {
          i--;
          if (i < 0) { i = 0; deleting = false; setTimeout(type, 500); return; }
          setTimeout(type, 60);
        }
      };
      typingName.textContent = "";
      type();
    }
  }

  const photo = document.getElementById("profilePhoto");
  const placeholder = document.getElementById("photoPlaceholder");
  if (photo && placeholder) {
    const showPhoto = () => { photo.hidden = false; placeholder.hidden = true; };
    const showPlaceholder = () => { photo.hidden = true; placeholder.hidden = false; };
    photo.addEventListener("load", showPhoto);
    photo.addEventListener("error", showPlaceholder);
    if (photo.complete) photo.naturalWidth ? showPhoto() : showPlaceholder();
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const portfolioEmail = "your.email@example.com"; // Replace with your real email.
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const subject = String(data.get("subject") || "").trim();
      const message = String(data.get("message") || "").trim();
      const body = [`Name: ${name}`, `Email: ${email}`, "", "Message:", message].join("\\n");
      if (status) status.textContent = "Opening your email application. If nothing opens, check your default email settings.";
      window.location.href = `mailto:${portfolioEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav-link");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }), { rootMargin: "-30% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }
});
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  const recipient = "gariandokrisshajene24@gmail.com";

  const emailSubject = encodeURIComponent(subject);
  const emailBody = encodeURIComponent(
    `Name: ${name}\n` +
    `Sender's email: ${email}\n\n` +
    `Message:\n${message}`
  );

  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${recipient}` +
    `&su=${emailSubject}` +
    `&body=${emailBody}`;

  formStatus.textContent = "Opening Gmail with your message...";
  window.open(gmailUrl, "_blank");

});