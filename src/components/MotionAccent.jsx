import Rive from "@rive-app/react-canvas";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const pulseAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 180,
  h: 180,
  nm: "contact pulse",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "outer pulse",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [15] }, { t: 45, s: [80] }, { t: 90, s: [15] }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [90, 90, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [60, 60, 100] }, { t: 45, s: [122, 122, 100] }, { t: 90, s: [60, 60, 100] }] }
      },
      shapes: [
        { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [108, 108] } },
        { ty: "st", c: { a: 0, k: [0.22, 0.74, 0.97, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 6 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "center dot",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [90, 90, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [84, 84, 100] }, { t: 45, s: [100, 100, 100] }, { t: 90, s: [84, 84, 100] }] }
      },
      shapes: [
        { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [54, 54] } },
        { ty: "fl", c: { a: 0, k: [0.05, 0.18, 0.38, 1] }, o: { a: 0, k: 100 } },
        { ty: "st", c: { a: 0, k: [0.42, 0.91, 1, 1] }, o: { a: 0, k: 80 }, w: { a: 0, k: 4 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0
    }
  ]
};

export default function MotionAccent() {
  return (
    <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-[0.62fr_1fr]">
      <div className="glass-panel relative min-h-36 overflow-hidden rounded-lg p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/16 to-blue-800/10" />
        <DotLottieReact
          data={JSON.stringify(pulseAnimation)}
          autoplay
          loop
          speed={0.82}
          className="relative mx-auto h-28 w-28"
          renderConfig={{ devicePixelRatio: 1 }}
        />
        <p className="relative text-center text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">dotLottie</p>
      </div>

      <div className="glass-panel relative min-h-36 overflow-hidden rounded-lg p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-blue-700/14 to-transparent" />
        <div className="relative h-24 overflow-hidden rounded-lg border border-cyan-300/15 bg-slate-950/60">
          <Rive
            src="https://cdn.rive.app/animations/vehicles.riv"
            autoPlay
            className="h-full w-full opacity-75 mix-blend-screen"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/70" />
        </div>
        <p className="relative mt-3 text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">Rive motion layer</p>
      </div>
    </div>
  );
}
