import type { ReactNode } from "react";
import { invitation } from "@/lib/invitation";
import { Arch, BappaFigure, Corner, Divider, Mandala, Tassel } from "./Art";
import Petals from "./Petals";

// Each card line rises out of its own mask (animated via .card-line in Experience).
function Line({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mask-line ${className}`}>
      <div className="card-line">{children}</div>
    </div>
  );
}

/** Scenes 1–3: curtain → golden light → Bappa → invitation card. Pinned + scrubbed in Experience. */
export default function Hero() {
  return (
    <section className="hero relative h-svh overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#45091a_0%,#1e0307_70%)]">
      {/* light waiting behind the curtain */}
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_48%_at_50%_38%,rgba(255,200,100,.5),rgba(232,119,46,.16)_50%,transparent_74%)]" />
        <Arch className="absolute left-[4%] top-[5%] h-[95%] w-[92%] opacity-25 md:left-[20%] md:w-[60%]" />
      </div>
      <div aria-hidden className="hero-dust dust pointer-events-none absolute inset-0" />
      <Petals count={8} slow />

      {/* stage: mobile = Bappa over card; desktop = card left, Bappa right, overlapping */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-[5vw] md:flex-row-reverse low:scale-[.8]">
        <div className="bappa-move relative z-10 aspect-[400/470] h-[40svh] max-h-[360px] short:h-[33svh] md:z-0 md:h-[74svh] md:max-h-[680px]">
          {/* round clip: the spinning square would otherwise poke past the screen edge and zoom phones out */}
          <div aria-hidden className="hero-mandala absolute -inset-x-[30%] -top-[30%] -bottom-[6%] overflow-hidden rounded-full">
            <Mandala className="spin-slow size-full" />
          </div>
          <div className="bappa-reveal relative size-full">
            <BappaFigure uid="hero" priority className="float size-full" />
          </div>
        </div>

        <article className="hero-card paper relative -mt-[5svh] w-[90vw] max-w-[420px] rounded-[26px] px-6 pb-6 pt-9 text-center text-maroon shadow-[0_30px_80px_-20px_rgba(0,0,0,.85)] short:pb-5 short:pt-7 md:z-10 md:-mr-12 md:mt-0 low:-mr-6 md:w-[440px] md:px-10 md:py-12">
          <div aria-hidden className="pointer-events-none absolute inset-2 rounded-[20px] border border-gold/70" />
          <div aria-hidden className="pointer-events-none absolute inset-[14px] rounded-[14px] border border-gold/30" />
          <Corner className="absolute left-4 top-4 size-7" />
          <Corner className="absolute right-4 top-4 size-7 rotate-90" />
          <Corner className="absolute bottom-4 right-4 size-7 rotate-180" />
          <Corner className="absolute bottom-4 left-4 size-7 -rotate-90" />

          <Line>
            <p lang="sa" className="font-deva text-[17px] text-kesari">॥ श्री गणेशाय नमः ॥</p>
          </Line>
          <Line className="mt-3 short:mt-2">
            <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-maroon/70">With the divine blessings of</p>
          </Line>
          <Line>
            <p className="font-serif text-2xl italic">Shree Ganpati Bappa</p>
          </Line>
          <Line className="my-3 short:my-2">
            <Divider className="mx-auto max-w-[200px] text-gold" />
          </Line>
          <Line>
            <p className="mx-auto max-w-[30ch] text-[13px] leading-relaxed text-maroon/80">
              You and your family are lovingly invited to join us for
            </p>
          </Line>
          <Line className="mt-3 short:mt-2">
            <p lang="hi" className="font-deva text-[clamp(1.6rem,7vw,2.2rem)] leading-tight text-kesari short:text-[1.5rem]">
              गणपति बप्पा स्थापना
            </p>
          </Line>
          <Line className="mt-1">
            <h1 className="font-serif text-[clamp(2.1rem,9.5vw,3.2rem)] font-semibold leading-[.95] text-wine short:text-[2rem]">
              Ganpati Bappa
              <br />
              Sthapna
            </h1>
          </Line>
          <Line>
            <p className="mt-1 font-serif text-2xl italic text-kesari">&amp; Evening Aarti</p>
          </Line>
          <Line className="mt-4 short:mt-3">
            <p className="inline-block border-t border-gold/60 pt-3 text-[11px] font-bold uppercase tracking-[.28em] text-maroon">
              {invitation.dayDate}
            </p>
          </Line>
          <Line className="mt-1.5">
            <p className="text-[12px] text-maroon/75">
              Aarti daily at {invitation.aarti.time} · till {invitation.aarti.to} September
            </p>
          </Line>
        </article>
      </div>

      {/* the curtain */}
      <div className="curtain-wrap pointer-events-none absolute inset-0 z-20">
        <div aria-hidden className="curtain-l velvet absolute inset-y-0 left-0 w-[51%] origin-left shadow-[inset_-40px_0_50px_-20px_rgba(0,0,0,.7)]">
          <div className="fringe absolute inset-x-0 bottom-0" />
          <Tassel className="swing absolute -right-3 top-[70%] w-7 md:w-9" />
        </div>
        <div aria-hidden className="curtain-r velvet absolute inset-y-0 right-0 w-[51%] origin-right shadow-[inset_40px_0_50px_-20px_rgba(0,0,0,.7)]">
          <div className="fringe absolute inset-x-0 bottom-0" />
          <Tassel className="swing absolute -left-3 top-[70%] w-7 md:w-9" />
        </div>
        <div aria-hidden className="valance velvet absolute inset-x-0 top-0 h-14 md:h-20" />

        {/* tapping opens the curtain with the bell (Experience + MusicPlayer); scrolling still works */}
        <div className="curtain-intro absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center [text-shadow:0_2px_12px_rgba(0,0,0,.6)]">
          <button
            type="button"
            aria-label="Open the invitation"
            className="curtain-open group pointer-events-auto flex flex-col items-center gap-5"
          >
            <span className="halo grid size-20 place-items-center rounded-full border border-gold/60 bg-night/30 shadow-[0_0_40px_rgba(212,166,74,.35)] transition-transform group-active:scale-95 md:size-24">
              <span lang="sa" className="font-deva text-4xl text-gold-light md:text-5xl">ॐ</span>
            </span>
            <span lang="sa" className="font-deva text-2xl text-gold-light md:text-3xl">॥ श्री गणेशाय नमः ॥</span>
            <span className="font-serif text-xl italic text-ivory/85 md:text-2xl">You are warmly invited</span>
            <span className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-full border border-gold/60 bg-night/40 px-7 text-[11px] font-semibold uppercase tracking-[.3em] text-gold-light shadow-[0_0_30px_rgba(212,166,74,.25)] backdrop-blur-sm [text-shadow:none]">
              <span aria-hidden className="text-base">🔔</span> Tap to open
            </span>
          </button>
          <div aria-hidden className="flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[.35em] text-ivory/60">
            or scroll
            <svg viewBox="0 0 24 24" className="nudge size-5 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
