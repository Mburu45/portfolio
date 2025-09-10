const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
  const icon = themeToggle.querySelector("i");
  if (body.classList.contains("dark-mode")) {
    icon.className = "fas fa-moon";
  } else {
    icon.className = "fas fa-sun";
  }
});


const typingText = document.getElementById("typing-text");
const roles = ["Creative Code Artisan", "Innovative Problem Solver", "Full-Stack Web Developer", "UI/UX Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = roles[roleIndex];
  const displayed = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  typingText.textContent = displayed;

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => (isDeleting = true), 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();

const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});
