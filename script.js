const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const copyEmail = document.querySelector("#copyEmail");
const email = "sharipovfirdavs5520@gmail.com";

document.querySelector("#year").textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  root.classList.add("dark");
}

function updateThemeIcon() {
  const iconName = root.classList.contains("dark") ? "moon" : "sun";
  themeToggle.innerHTML = `<i data-lucide="${iconName}" aria-hidden="true"></i>`;
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

themeToggle.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("portfolio-theme", root.classList.contains("dark") ? "dark" : "light");
  updateThemeIcon();
});

copyEmail.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyEmail.innerHTML = '<i data-lucide="check" aria-hidden="true"></i>Email nusxalandi';
  } catch {
    copyEmail.innerHTML = '<i data-lucide="mail" aria-hidden="true"></i>sharipovfirdavs5520@gmail.com';
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }

  window.setTimeout(() => {
    copyEmail.innerHTML = '<i data-lucide="copy" aria-hidden="true"></i>Emailni nusxalash';
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 2200);
});

const revealItems = document.querySelectorAll(
  ".intro-band, .metric, .section-heading, .project-card, .skill-list span, .contact-copy, .contact-link"
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 260)}ms`);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

updateThemeIcon();
