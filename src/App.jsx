import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Mail,
  Menu,
  MonitorSmartphone,
  Moon,
  Phone,
  Rocket,
  Send,
  Sun,
  X
} from "lucide-react";
import {
  SiFramer,
  SiGithub,
  SiJavascript,
  SiReact,
  SiTelegram,
  SiTailwindcss,
  SiVercel,
  SiVite
} from "react-icons/si";

import heroImage from "../assets/portfolio-hero.png";
import medlineImage from "../assets/project-sampi-medline.png";
import gilamImage from "../assets/project-gilam-yuvish.png";
import vercelImage from "../assets/project-sampi-vercel.png";
import { ContactAccent, HeroAccent } from "./components/PremiumAccent.jsx";

const navItems = [
  { href: "#about", label: "Men haqimda" },
  { href: "#work", label: "Loyihalar" },
  { href: "#skills", label: "Ko'nikmalar" },
  { href: "#contact", label: "Aloqa" }
];

const projects = [
  {
    title: "Sampi Medline Project",
    type: "Medical website",
    image: medlineImage,
    href: "https://sampi-medline.uz",
    linkLabel: "sampi-medline.uz",
    text: "Tibbiyot xizmatlari uchun ishonchli ko'rinish, qulay navigatsiya va tezkor aloqa yo'llarini bir joyga jamlaganman."
  },
  {
    title: "Gilam yuvish loyihasi",
    type: "Service website",
    image: gilamImage,
    href: "https://gilam-yuvish.vercel.app",
    linkLabel: "gilam-yuvish.vercel.app",
    text: "Xizmat haqida ma'lumot, buyurtmaga tez o'tish va mobil ekranda ham tartibli ko'rinishga e'tibor berganman."
  },
  {
    title: "Sampi Medline Vercel",
    type: "Deploy version",
    image: vercelImage,
    href: "https://sampi-medline.vercel.app",
    linkLabel: "sampi-medline.vercel.app",
    text: "Loyihaning demo versiyasi. Tez ochilishi, responsivligi va tekshirishga qulay bo'lishi uchun alohida tayyorlangan."
  }
];

const skills = [
  { name: "React", Icon: SiReact, color: "text-cyan-400" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "text-sky-400" },
  { name: "JavaScript", Icon: SiJavascript, color: "text-yellow-300" },
  { name: "Vite", Icon: SiVite, color: "text-violet-400" },
  { name: "GitHub", Icon: SiGithub, color: "text-slate-700 dark:text-white" },
  { name: "Vercel", Icon: SiVercel, color: "text-slate-900 dark:text-white" },
  { name: "Framer Motion", Icon: SiFramer, color: "text-pink-400" },
  { name: "Responsive UI", Icon: MonitorSmartphone, color: "text-emerald-400" }
];

const contacts = [
  {
    label: "Email",
    value: "sharipovfirdavs5520@gmail.com",
    href: "mailto:sharipovfirdavs5520@gmail.com",
    Icon: Mail
  },
  {
    label: "Telegram",
    value: "@Firdavs_5520",
    href: "https://t.me/Firdavs_5520",
    Icon: SiTelegram
  },
  {
    label: "Telefon",
    value: "+998 95 336 37 37",
    href: "tel:+998953363737",
    Icon: Phone
  },
  {
    label: "GitHub",
    value: "GitHub profil",
    href: "https://github.com/Firdavs5520",
    Icon: SiGithub
  }
];

const socialCards = [
  {
    label: "GitHub",
    href: "https://github.com/Firdavs5520",
    Icon: SiGithub,
    color: "text-slate-900 dark:text-white",
    ring: "from-slate-500/20 to-sky-400/20"
  },
  {
    label: "Telegram",
    href: "https://t.me/Firdavs_5520",
    Icon: SiTelegram,
    color: "text-sky-500",
    ring: "from-sky-500/20 to-cyan-300/20"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.08
    }
  }
};

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark");
  const [switching, setSwitching] = useState(false);
  const timerRef = useRef(null);
  const unlockRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#020817" : "#eef6ff");
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
      window.clearTimeout(unlockRef.current);
    };
  }, []);

  const toggleTheme = () => {
    if (switching) {
      return;
    }

    const nextTheme = theme === "dark" ? "light" : "dark";
    setSwitching(true);

    timerRef.current = window.setTimeout(() => {
      setTheme(nextTheme);
    }, 280);

    unlockRef.current = window.setTimeout(() => {
      setSwitching(false);
    }, 1250);
  };

  return { theme, switching, toggleTheme };
}

function App() {
  const { theme, switching, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 90]);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const blockSelection = (event) => event.preventDefault();

    document.addEventListener("copy", blockSelection);
    document.addEventListener("cut", blockSelection);
    document.addEventListener("selectstart", blockSelection);
    document.addEventListener("dragstart", blockSelection);

    return () => {
      document.removeEventListener("copy", blockSelection);
      document.removeEventListener("cut", blockSelection);
      document.removeEventListener("selectstart", blockSelection);
      document.removeEventListener("dragstart", blockSelection);
    };
  }, []);

  useEffect(() => {
    let frameId;
    const cancelScroll = () => cancelAnimationFrame(frameId);

    const clickHandler = (event) => {
      const link = event.target.closest('a[href^="#"]');

      if (!link) {
        return;
      }

      const target = link.getAttribute("href");
      const targetElement = target === "#top" ? document.body : document.querySelector(target);

      if (!targetElement) {
        return;
      }

      event.preventDefault();
      cancelAnimationFrame(frameId);

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const startY = window.scrollY;
      const offset = target === "#top" ? 0 : 88;
      const endY = target === "#top" ? 0 : Math.max(0, targetElement.getBoundingClientRect().top + window.scrollY - offset);

      if (prefersReducedMotion) {
        window.scrollTo({ top: endY });
      } else {
        const startTime = performance.now();
        const duration = 920;

        const step = (time) => {
          const progressValue = Math.min((time - startTime) / duration, 1);
          const y = startY + (endY - startY) * easeOutCubic(progressValue);

          window.scrollTo(0, y);

          if (progressValue < 1) {
            frameId = requestAnimationFrame(step);
          }
        };

        frameId = requestAnimationFrame(step);
      }

      setMenuOpen(false);
      window.history.pushState(null, "", target);
    };

    document.addEventListener("click", clickHandler);
    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchstart", cancelScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("click", clickHandler);
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
    };
  }, []);

  return (
    <Tooltip.Provider delayDuration={140} skipDelayDuration={80}>
      <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_44%,#e2efff_100%)] text-slate-950 transition-colors duration-1000 dark:bg-[linear-gradient(180deg,#020817_0%,#020817_46%,#06152a_100%)] dark:text-white">
        <motion.div
          className="fixed left-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-200 shadow-[0_0_24px_rgba(56,189,248,0.75)]"
          style={{ scaleX: progress, width: "100%" }}
        />

        <AnimatePresence>
          {switching && (
            <motion.div
              className="pointer-events-none fixed inset-[-28px] z-[100] bg-slate-950/20 backdrop-blur-xl"
              initial={{ opacity: 0, scale: 1.045 }}
              animate={{ opacity: [0, 1, 0.78, 0], scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-300/30 blur-3xl" />
              <div className="absolute bottom-10 left-8 h-64 w-64 rounded-full bg-blue-700/30 blur-3xl" />
            </motion.div>
          )}
        </AnimatePresence>

        <Header
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          theme={theme}
          switching={switching}
          toggleTheme={toggleTheme}
        />

        <main id="top">
        <section className="relative isolate min-h-[760px] overflow-hidden pt-20 sm:min-h-[760px] lg:min-h-[880px]">
          <motion.img
            src={heroImage}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_center] opacity-85 transition duration-1000 max-sm:opacity-34 dark:opacity-74 dark:max-sm:opacity-36"
            style={{ y: heroY }}
            fetchPriority="high"
            decoding="async"
            draggable="false"
          />
          <HeroAccent />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(248,251,255,0.98)_0%,rgba(239,246,255,0.84)_46%,rgba(37,99,235,0.10)_100%)] transition duration-1000 dark:bg-[linear-gradient(90deg,rgba(2,8,23,0.95)_0%,rgba(8,24,48,0.72)_48%,rgba(14,55,112,0.20)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(90deg,rgba(37,99,235,0.08)_0_1px,transparent_1px_86px)] opacity-80 dark:bg-[repeating-linear-gradient(90deg,rgba(147,197,253,0.08)_0_1px,transparent_1px_86px)]" />

          <motion.div
            className="section-shell flex min-h-[680px] flex-col justify-center pb-12 pt-28 sm:min-h-[720px] sm:pt-28 lg:min-h-[820px]"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeUp} className="kicker">
              Frontend developer
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-5 max-w-[10ch] text-balance text-[3.65rem] font-extrabold leading-[0.92] tracking-normal text-slate-950 dark:text-white max-[360px]:text-[3.2rem] sm:text-8xl lg:text-[9.5rem]"
            >
              Firdavs
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[20rem] break-words text-base font-semibold leading-7 text-slate-700 transition duration-1000 dark:text-white/[0.84] sm:max-w-2xl sm:text-xl sm:leading-8"
            >
              Men tez yuklanadigan, mobilga mos va ko'zga yoqimli web-saytlar
              yarataman. Har bir ishda foydalanuvchi uchun qulaylik, toza kod va
              real natijaga e'tibor beraman.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#work"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-blue-700 to-sky-400 px-5 font-extrabold text-white shadow-glow transition duration-1000 hover:-translate-y-1 sm:w-auto"
              >
                <BriefcaseBusiness size={18} />
                Loyihalarni ko'rish
                <span className="absolute h-20 w-16 -translate-x-28 skew-x-[-18deg] bg-white/30 blur-sm transition duration-1000 group-hover:translate-x-36" />
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-blue-500/25 bg-white/70 px-5 font-extrabold text-slate-900 backdrop-blur-xl transition duration-1000 hover:-translate-y-1 hover:bg-sky-100/80 dark:border-cyan-200/25 dark:bg-slate-950/[0.62] dark:text-white dark:hover:bg-slate-800 sm:w-auto"
              >
                <Send size={18} />
                Bog'lanish
              </a>

              <div className="glass-panel flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-3 sm:w-auto">
                {socialCards.map(({ label, href, Icon, color, ring }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative grid h-11 w-11 place-items-center overflow-hidden rounded-lg border border-sky-300/20 bg-white/70 shadow-glow transition duration-1000 hover:-translate-y-1 dark:bg-slate-950/70"
                    whileTap={{ scale: 0.94 }}
                    aria-label={label}
                  >
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <span className="grid h-full w-full place-items-center">
                          <span className={`absolute inset-0 bg-gradient-to-br ${ring} opacity-0 transition duration-1000 group-hover:opacity-100`} />
                          <span className={`relative text-2xl ${color}`}>
                            <Icon />
                          </span>
                        </span>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content className="rounded-lg border border-cyan-300/20 bg-slate-950/95 px-3 py-2 text-xs font-extrabold text-cyan-100 shadow-glow backdrop-blur-xl" sideOffset={10}>
                          {label}
                          <Tooltip.Arrow className="fill-slate-950" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        </main>

        <footer className="border-t border-sky-500/15 bg-sky-50 px-4 py-7 text-sm font-semibold text-slate-600 transition duration-1000 dark:border-white/10 dark:bg-slate-950 dark:text-white/[0.62] sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>{currentYear} Firdavs. Portfolio doim yangilanib boradi.</span>
            <a href="#top" className="font-extrabold text-sky-600 transition duration-1000 hover:text-blue-700 dark:text-cyan-300">
              Yuqoriga
            </a>
          </div>
        </footer>
      </div>
    </Tooltip.Provider>
  );
}

function Header({ menuOpen, setMenuOpen, theme, switching, toggleTheme }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-sky-500/15 bg-white/[0.82] px-3 py-3 shadow-[0_18px_52px_rgba(37,99,235,0.08)] backdrop-blur-2xl transition duration-1000 dark:border-white/10 dark:bg-slate-950/[0.78] dark:shadow-none sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
        <a href="#top" className="group flex min-w-0 items-center gap-3 font-extrabold">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-blue-700 to-sky-400 text-lg text-white shadow-glow transition duration-1000 group-hover:-translate-y-1 group-hover:rotate-3">
            F
          </span>
          <span className="truncate text-lg text-slate-950 dark:text-white max-[340px]:hidden">Firdavs</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-sky-500/15 bg-sky-50/72 p-1 text-sm font-bold text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl transition duration-1000 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/[0.74] md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative overflow-hidden rounded-full px-5 py-2.5 transition duration-1000 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 hover:shadow-[0_14px_32px_rgba(37,99,235,0.14)] dark:hover:bg-slate-900 dark:hover:text-white"
            >
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <span className="relative block">
                    <span className="absolute inset-y-1 left-1 w-8 -translate-x-12 rounded-full bg-cyan-300/30 blur-md transition duration-1000 group-hover:translate-x-28" />
                    <span className="relative">{item.label}</span>
                  </span>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="rounded-lg border border-cyan-300/20 bg-slate-950/95 px-3 py-2 text-xs font-extrabold text-cyan-100 shadow-glow backdrop-blur-xl" sideOffset={12}>
                    {item.label} bo'limiga o'tish
                    <Tooltip.Arrow className="fill-slate-950" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Rang rejimini almashtirish"
            aria-pressed={theme === "dark"}
            disabled={switching}
            onClick={toggleTheme}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-sky-400/25 bg-sky-100/70 text-slate-900 transition duration-1000 hover:-translate-y-1 hover:bg-sky-200 disabled:cursor-wait disabled:opacity-70 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            {theme === "dark" ? <Moon size={19} /> : <Sun size={19} />}
          </button>
          <button
            type="button"
            aria-label="Menyuni ochish"
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-sky-400/25 bg-sky-100/70 text-slate-900 transition duration-1000 hover:bg-sky-200 dark:border-white/10 dark:bg-slate-900 dark:text-white md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mx-auto mt-3 grid max-w-6xl grid-cols-2 gap-2 rounded-2xl border border-sky-400/20 bg-white/90 p-2 text-sm font-extrabold text-slate-700 shadow-glow backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/[0.94] dark:text-white md:hidden"
            initial={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.45 }}
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-full px-4 py-3 text-center transition hover:bg-sky-100 dark:hover:bg-slate-800">
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-white py-16 transition duration-1000 dark:bg-slate-900 sm:py-24">
      <motion.div
        className="section-shell grid gap-9 lg:grid-cols-[0.95fr_0.82fr] lg:items-start"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div variants={fadeUp}>
          <p className="kicker">Men haqimda</p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-5xl">
            G'oyani ishlaydigan, chiroyli va ishonchli web tajribaga aylantiraman.
          </h2>
        </motion.div>
        <motion.p variants={fadeUp} className="text-lg font-medium leading-8 text-slate-600 dark:text-white/70">
          Men frontendda tartib, tezlik va foydalanuvchiga qulaylikni birinchi
          o'ringa qo'yaman. Landing page, portfolio, xizmat sayti yoki kichik web
          ilova bo'lsa ham, ishni real foydalanishga tayyor holatda chiqarishga harakat qilaman.
        </motion.p>
      </motion.div>

      <motion.div
        className="section-shell mt-12 grid gap-px overflow-hidden rounded-lg bg-sky-500/[0.18] sm:grid-cols-3"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {[
          ["01", "Responsiv dizayn", "Telefon, planshet va desktopda tartibli ko'rinadigan sahifalar qilaman."],
          ["02", "Toza frontend", "React va Tailwind bilan yengil, o'qilishi oson interfeys quraman."],
          ["03", "Natijaga fokus", "Dizayn chiroyli bo'lishi bilan birga foydalanuvchi vazifasini ham yengillashtiradi."]
        ].map(([number, title, text]) => (
          <motion.div
            key={number}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative min-h-52 overflow-hidden bg-sky-50 p-7 transition duration-1000 dark:bg-slate-950 sm:p-9"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-sky-300/20 to-transparent transition duration-1000 group-hover:translate-x-full" />
            <span className="text-sm font-extrabold text-blue-700 dark:text-cyan-300">{number}</span>
            <strong className="mt-7 block text-xl font-extrabold">{title}</strong>
            <p className="mt-3 text-slate-600 dark:text-white/[0.68]">{text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="work" className="py-16 sm:py-24">
      <motion.div
        className="section-shell"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
      >
        <motion.div variants={fadeUp} className="mb-9">
          <p className="kicker">Tanlangan ishlar</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Loyihalar</h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.01 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel group overflow-hidden rounded-lg"
            >
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt=""
                  className="h-full w-full object-cover opacity-90 transition duration-1000 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-sky-500/[0.12]" />
                <div className="absolute bottom-5 right-5 grid h-14 w-24 place-items-center rounded-lg border border-white/[0.18] bg-white/15 text-white backdrop-blur-md transition duration-1000 group-hover:-translate-y-1 group-hover:rotate-2">
                  <Rocket size={24} />
                </div>
              </div>
              <div className="p-6">
                <p className="kicker">{project.type}</p>
                <h3 className="mt-4 text-2xl font-extrabold leading-tight">{project.title}</h3>
                <p className="mt-4 leading-7 text-slate-600 dark:text-white/70">{project.text}</p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-extrabold text-blue-700 transition duration-1000 hover:translate-x-2 dark:text-cyan-300"
                >
                  {project.linkLabel}
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="relative overflow-hidden bg-white py-16 transition duration-1000 dark:bg-slate-900 sm:py-24">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(37,99,235,0.07)_0_1px,transparent_1px_76px)] dark:bg-[repeating-linear-gradient(90deg,rgba(147,197,253,0.07)_0_1px,transparent_1px_76px)]" />
      <motion.div
        className="section-shell relative"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.24 }}
      >
        <motion.div variants={fadeUp} className="mb-9">
          <p className="kicker">Texnologiyalar</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Ishlaydigan stack</h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map(({ name, Icon, color }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              whileHover={{ y: -9, rotate: 0 }}
              className="glass-panel group relative overflow-hidden rounded-lg p-5"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-sky-300/[0.18] to-transparent transition duration-1000 group-hover:translate-x-full" />
              <div className={`relative grid h-14 w-14 place-items-center rounded-lg bg-sky-100 text-3xl shadow-glow transition duration-1000 group-hover:-translate-y-1 group-hover:rotate-3 dark:bg-slate-950 ${color}`}>
                <Icon size={name === "Responsive UI" ? 28 : undefined} />
              </div>
              <p className="relative mt-5 text-lg font-extrabold">{name}</p>
              <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-sky-500/[0.12]">
                <span className="block h-full origin-left scale-x-90 rounded-full bg-gradient-to-r from-blue-700 to-cyan-300 transition duration-1000 group-hover:scale-x-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(248,251,255,0.96),rgba(191,219,254,0.68))] transition duration-1000 dark:bg-[linear-gradient(135deg,rgba(2,8,23,0.98),rgba(14,55,112,0.72))]" />
      <motion.div
        className="section-shell relative grid gap-10 lg:grid-cols-[0.95fr_0.62fr] lg:items-start"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div variants={fadeUp}>
          <p className="kicker">Aloqa</p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold leading-tight sm:text-5xl">
            Keyingi loyihani yaxshi reja va toza frontend bilan boshlayman.
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-slate-600 dark:text-white/70">
            Portfolio, landing page yoki web ilova kerak bo'lsa, men bilan bog'lanish
            mumkin. Vazifani tushunib, kerakli yechimni aniq va tartibli qilib chiqaraman.
          </p>
          <ContactAccent />
        </motion.div>

        <motion.div variants={stagger} className="grid gap-3">
          {contacts.map(({ label, value, href, Icon }) => (
            <motion.a
              key={label}
              variants={fadeUp}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              whileHover={{ x: 8 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel group flex min-h-16 items-center gap-4 overflow-hidden rounded-lg p-4 font-extrabold"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-sky-100 text-blue-700 shadow-glow transition duration-1000 group-hover:-translate-y-1 group-hover:bg-white dark:bg-slate-950 dark:text-cyan-300">
                <Icon size={20} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-[0.18em] text-sky-500 dark:text-cyan-300">{label}</span>
                <span className="block break-all text-sm sm:text-base">{value}</span>
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default App;
