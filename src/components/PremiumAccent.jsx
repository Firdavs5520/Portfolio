import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";

export function HeroAccent() {
  return (
    <motion.div
      className="pointer-events-none absolute right-[8%] top-[20%] z-0 hidden h-64 w-64 opacity-70 lg:block xl:right-[12%] xl:h-72 xl:w-72"
      initial={{ opacity: 0, y: 24, rotate: -4 }}
      animate={{ opacity: 0.7, y: 0, rotate: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-[2rem] border border-cyan-300/18 bg-slate-950/36 shadow-glow backdrop-blur-md" />
      <div className="absolute left-8 top-9 grid h-28 w-28 place-items-center rounded-2xl bg-gradient-to-br from-blue-800 to-sky-500 text-5xl font-extrabold text-white shadow-glow">
        F
      </div>
      <div className="absolute bottom-8 right-7 flex h-16 w-28 items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-white/10 text-cyan-200 backdrop-blur-xl">
        <Code2 size={28} />
        <span className="h-2 w-10 rounded-full bg-cyan-300/70" />
      </div>
      <div className="absolute right-4 top-10 text-cyan-200">
        <Sparkles size={28} />
      </div>
    </motion.div>
  );
}

export function ContactAccent() {
  return (
    <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
      {[
        ["Tezkor javob", "Loyihani qisqa va aniq brief bilan boshlayman."],
        ["Silliq frontend", "Animatsiya, responsive va performance balansda turadi."]
      ].map(([title, text]) => (
        <motion.div
          key={title}
          className="glass-panel relative min-h-32 overflow-hidden rounded-lg p-5"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
          <span className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-cyan-300 shadow-glow">
            <Sparkles size={20} />
          </span>
          <h3 className="text-base font-extrabold">{title}</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-white/68">{text}</p>
        </motion.div>
      ))}
    </div>
  );
}
