const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const copyEmail = document.querySelector("#copyEmail");
const email = "sharipovfirdavs5520@gmail.com";
const reduceMotion = false;
const smoothScroller =
  !reduceMotion && window.Lenis
    ? new window.Lenis({
        autoRaf: true,
        duration: 1.8,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.15
      })
    : null;

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

let ticking = false;

function updateScrollMotion() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

  root.style.setProperty("--scroll-progress", `${Math.min(progress, 100)}%`);

  if (!reduceMotion) {
    root.style.setProperty("--parallax-y", `${Math.min(window.scrollY * 0.12, 90)}px`);
  }

  ticking = false;
}

function requestScrollUpdate() {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollMotion);
    ticking = true;
  }
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);
smoothScroller?.on("scroll", requestScrollUpdate);
updateScrollMotion();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = link.getAttribute("href");

    if (!target || target === "#") {
      return;
    }

    const targetElement = target === "#top" ? document.body : document.querySelector(target);

    if (!targetElement) {
      return;
    }

    event.preventDefault();

    if (smoothScroller) {
      smoothScroller.scrollTo(targetElement, {
        duration: 1.8,
        easing: (t) => 1 - Math.pow(1 - t, 4)
      });
    } else {
      targetElement.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }

    window.history.pushState(null, "", target);
  });
});

const revealItems = document.querySelectorAll(
  ".intro-band, .section-grid > div, .section-grid > p, .metric, .section-heading, .project-card, .skill-list span, .contact-copy, .contact-link, .site-footer"
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");

  if (item.matches(".section-grid > div, .section-heading, .contact-copy")) {
    item.classList.add("reveal-left");
  } else if (item.matches(".section-grid > p, .contact-link, .site-footer")) {
    item.classList.add("reveal-right");
  } else if (item.matches(".project-card")) {
    item.classList.add("reveal-zoom");
  } else if (item.matches(".metric, .skill-list span")) {
    item.classList.add("reveal-pop");
  }

  const siblingIndex = Array.from(item.parentElement?.children || []).indexOf(item);
  const delayIndex = siblingIndex >= 0 ? siblingIndex : index;
  item.style.setProperty("--reveal-delay", `${Math.min(delayIndex * 90, 360)}ms`);
});

function startRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

if ("IntersectionObserver" in window) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(startRevealAnimations);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

updateThemeIcon();
