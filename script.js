const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const copyEmail = document.querySelector("#copyEmail");
const email = "firdavs@example.com";

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
    copyEmail.innerHTML = '<i data-lucide="mail" aria-hidden="true"></i>firdavs@example.com';
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

updateThemeIcon();
