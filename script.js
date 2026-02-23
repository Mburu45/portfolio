const THEME_KEY = "portfolio_theme";

const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const typingText = document.getElementById("typing-text");
const backToTop = document.getElementById("back-to-top");

function applyTheme(theme) {
  body.setAttribute("data-theme", theme);
  const icon = themeToggle?.querySelector("i");

  if (icon) {
    icon.className = theme === "dark" ? "fas fa-moon" : "fas fa-sun";
  }
}

function initializeTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  themeToggle?.addEventListener("click", () => {
    const nextTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

function initializeTyping() {
  if (!typingText) {
    return;
  }

  const roles = [
    "usable interfaces that reduce friction",
    "checkout flows that convert under constraints",
    "reliable APIs and maintainable systems",
    "mobile experiences for real-world conditions"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const phrase = roles[roleIndex];
    const output = deleting ? phrase.slice(0, charIndex--) : phrase.slice(0, charIndex++);

    typingText.textContent = output;

    if (!deleting && charIndex > phrase.length) {
      deleting = true;
      setTimeout(tick, 1300);
      return;
    }

    if (deleting && charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(tick, deleting ? 38 : 72);
  }

  tick();
}

function initializeRevealAnimations() {
  const revealNodes = document.querySelectorAll("[data-reveal]");

  if (!revealNodes.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function initializeSkillClusters() {
  const clusterButtons = document.querySelectorAll(".cluster-toggle");

  clusterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const panelId = button.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;

      if (!panel) {
        return;
      }

      button.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  });
}

function initializeBackToTop() {
  if (!backToTop) {
    return;
  }

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 380);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

initializeTheme();
initializeTyping();
initializeRevealAnimations();
initializeSkillClusters();
initializeBackToTop();