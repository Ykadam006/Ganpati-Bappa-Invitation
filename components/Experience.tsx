"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);

// Offset from an element's laid-out center to the center of `root`. Uses offsets, so transforms don't skew it.
function offsetToCenter(el: HTMLElement, root: HTMLElement) {
  let x = el.offsetWidth / 2;
  let y = el.offsetHeight / 2;
  for (let n: HTMLElement | null = el; n && n !== root; n = n.offsetParent as HTMLElement | null) {
    x += n.offsetLeft;
    y += n.offsetTop;
  }
  return { x: root.clientWidth / 2 - x, y: root.clientHeight / 2 - y };
}

// Tells MusicPlayer what the curtain is doing: "invite:open" on the tap (bell), "invite:opened" once it has parted (dhol).
const announce = (name: string) => window.dispatchEvent(new Event(name));

/** Owns every animation on the page. Markup stays in the section components; this only reads class hooks. */
export default function Experience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.config({ ignoreMobileResize: true });
      const mm = gsap.matchMedia();
      const openBtn = root.current!.querySelector<HTMLElement>(".curtain-open")!;
      const onTap = () => announce("invite:open");
      openBtn.addEventListener("click", onTap);

      // Reduced motion: no pin, no scrub, no parallax — the curtain simply fades and the page is plain.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(".curtain-wrap", { autoAlpha: 0, duration: 0.8, delay: 0.3 });
      });

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(".progress-fill", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });
      });

      mm.add(
        {
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const mobile = Boolean(ctx.conditions?.mobile);

          // Smooth wheel on desktop; touch stays native (Lenis leaves touch alone by default).
          const lenis = new Lenis();
          lenis.on("scroll", ScrollTrigger.update);
          const tick = (t: number) => lenis.raf(t * 1000);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);

          // ---- Scenes 1–3: one pinned, scrubbed timeline (units 0 → 10, see PLAN.md) ----
          const hero = root.current!.querySelector<HTMLElement>(".hero")!;
          const bappa = hero.querySelector<HTMLElement>(".bappa-move")!;
          const center = () => offsetToCenter(bappa, hero);
          const open = mobile ? 97 : 88;

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: mobile ? "+=200%" : "+=260%",
              pin: true,
              scrub: mobile ? 0.6 : true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          tl.to(".curtain-intro", { autoAlpha: 0, y: -40, duration: 1.2 }, 0)
            .to(".curtain-l", { xPercent: -open, scaleX: 0.9, duration: 4.1, ease: "power2.inOut" }, 0.4)
            .to(".curtain-r", { xPercent: open, scaleX: 0.9, duration: 4.1, ease: "power2.inOut" }, 0.4)
            .fromTo(".hero-glow", { opacity: 0 }, { opacity: 1, duration: 3.5 }, 1)
            .fromTo(".hero-dust", { opacity: 0 }, { opacity: 0.7, duration: 3 }, 2)
            .fromTo(".hero-mandala", { rotate: 0 }, { rotate: 8, duration: 10 }, 0)
            .fromTo(".hero-mandala", { opacity: 0 }, { opacity: 0.5, duration: 3 }, 2)
            .from(".bappa-reveal", { opacity: 0, scale: 0.88, y: 35, duration: 2.5, ease: "power1.out" }, 2.5)
            .from(".bappa-move", { x: () => center().x, y: () => center().y, duration: 2, ease: "power2.inOut" }, 5.5)
            .from(".hero-card", { ...(mobile ? { yPercent: 70 } : { x: -90 }), duration: 2, ease: "power2.out" }, 5.5)
            // fade fast so the paper never sits half-transparent (muddy) over the dark ground
            .from(".hero-card", { autoAlpha: 0, duration: 0.6 }, 5.5)
            .from(".card-line", { yPercent: 115, duration: 0.6, stagger: 0.35, ease: "power2.out" }, 6.5)
            .to({}, { duration: 0.5 })
            .call(announce, ["invite:opened"], 4.3); // curtains fully parted
          // Desktop keeps the valance as a proscenium frame; phones (incl. landscape) need the space.
          if (mobile || matchMedia("(max-height: 560px)").matches) tl.to(".valance", { yPercent: -160, duration: 1.5 }, 3.5);

          // Tap = open: glide through the whole curtain scene instead of making guests scroll it.
          const glide = () =>
            lenis.scrollTo(tl.scrollTrigger!.end, { duration: mobile ? 4.5 : 5.5, lock: true, easing: gsap.parseEase("power1.inOut") });
          openBtn.addEventListener("click", glide);

          // ---- Reveals for everything after the hero ----
          // opacity (not autoAlpha): hidden links must stay keyboard-focusable
          gsap.set(".reveal", { opacity: 0, y: 30 });
          ScrollTrigger.batch(".reveal", {
            start: "top 90%",
            once: true,
            onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power2.out", overwrite: true }),
          });

          gsap.utils.toArray<HTMLElement>(".split").forEach((el) => {
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 110,
                  duration: 1.1,
                  stagger: 0.12,
                  ease: "power3.out",
                  scrollTrigger: { trigger: el, start: "top 88%", once: true },
                }),
            });
          });

          // Lotus dividers draw outward from the flower.
          gsap.set(".divider-line", { scaleX: 0 });
          ScrollTrigger.batch(".divider-line", {
            start: "top 92%",
            once: true,
            onEnter: (els) => gsap.to(els, { scaleX: 1, duration: 1.2, ease: "power2.out" }),
          });

          // ---- Pages: each sheet tilts up as it arrives, then sinks back while the next one slides over it ----
          const pages = gsap.utils.toArray<HTMLElement>(".page");
          pages.forEach((page, i) => {
            const sheet = page.querySelector<HTMLElement>(".sheet")!;
            gsap.set(page, { zIndex: i + 1 }); // later sheets paint over pinned ones

            // negative: the sheet lies back and stands up. (Positive tips its bottom toward you, and on a tall page
            // that projects wider than the screen, which zooms phones out.)
            gsap.fromTo(
              sheet,
              { rotateX: -10, transformPerspective: 1400, transformOrigin: "50% 0%" },
              { rotateX: 0, ease: "none", scrollTrigger: { trigger: page, start: "top bottom", end: "top 30%", scrub: true } },
            );

            // one entrance every page shares: the gold frame settles and the corner ornaments draw themselves
            gsap
              .timeline({ scrollTrigger: { trigger: page, start: "top 65%", once: true } })
              .from(page.querySelectorAll(".frame"), { opacity: 0, scale: 1.04, duration: 1.2, stagger: 0.15, ease: "power2.out" })
              .from(page.querySelectorAll(".corner path"), { drawSVG: 0, duration: 1.4, ease: "power2.inOut" }, 0.2);

            const next = pages[i + 1];
            if (!next) return;
            ScrollTrigger.create({ trigger: page, start: "bottom bottom", endTrigger: next, end: "top top", pin: true, pinSpacing: false });
            const sink = page.querySelector<HTMLElement>(".sink")!;
            const covered = () => ({ trigger: next, start: "top bottom", end: "top top", scrub: true, invalidateOnRefresh: true });
            gsap.to(sink, {
              scale: 0.9,
              // shrink about the middle of the screen, wherever this (possibly tall) page sits
              transformOrigin: () => `50% ${Math.max(0, sink.offsetHeight - innerHeight / 2)}px`,
              ease: "none",
              scrollTrigger: covered(),
            });
            gsap.to(page.querySelector(".page-shade"), { opacity: 0.7, ease: "none", scrollTrigger: covered() });
          });

          // ---- Each page's own moment ----
          // Details: the gold timeline draws as you scroll.
          gsap.utils.toArray<HTMLElement>(".timeline-seg").forEach((seg) =>
            gsap.fromTo(
              seg,
              { scaleY: 0 },
              { scaleY: 1, ease: "none", scrollTrigger: { trigger: seg, start: "top 85%", end: "bottom 60%", scrub: true } },
            ),
          );

          // Aarti: lines grow, diyas brighten, Bappa drifts ≤20px, the twelve evenings fall into place.
          const aarti = () => ({ trigger: ".aarti", start: "top 75%", end: "center 55%", scrub: true });
          gsap.fromTo(".aarti-line", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: aarti() });
          gsap.fromTo(".aarti-glow", { opacity: 0.25 }, { opacity: 1, ease: "none", scrollTrigger: aarti() });
          gsap.fromTo(".aarti-diya .diya-glow", { opacity: 0.2 }, { opacity: 1, ease: "none", scrollTrigger: aarti() });
          const drift = mobile ? 10 : 20;
          gsap.fromTo(
            ".aarti-bappa",
            { y: drift },
            { y: -drift, ease: "none", scrollTrigger: { trigger: ".aarti", start: "top bottom", end: "bottom top", scrub: true } },
          );
          gsap.from(".aarti-day", {
            opacity: 0,
            y: 18,
            scale: 0.85,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.6)",
            scrollTrigger: { trigger: ".aarti-days", start: "top 85%", once: true },
          });

          // Venue: the toran drops in and settles.
          gsap.from(".toran", { yPercent: -100, duration: 1.4, ease: "back.out(1.4)", scrollTrigger: { trigger: ".venue", start: "top 70%", once: true } });

          // Family: the modaks pop onto the page.
          gsap.from(".modak-pop", {
            opacity: 0,
            y: 40,
            scale: 0.6,
            duration: 1.1,
            ease: "back.out(1.8)",
            scrollTrigger: { trigger: ".modak-pop", start: "top 90%", once: true },
          });

          // Finale: ground warms to gold, Bappa returns.
          gsap.fromTo(
            ".finale-gold",
            { opacity: 0 },
            { opacity: 1, ease: "none", scrollTrigger: { trigger: ".finale", start: "top 50%", end: "bottom bottom", scrub: true } },
          );
          gsap.from(".finale-bappa", {
            autoAlpha: 0,
            scale: 0.9,
            y: 40,
            ease: "none",
            scrollTrigger: { trigger: ".finale-bappa", start: "top 90%", end: "top 45%", scrub: true },
          });

          return () => {
            openBtn.removeEventListener("click", glide);
            gsap.ticker.remove(tick);
            lenis.destroy();
          };
        },
      );

      return () => openBtn.removeEventListener("click", onTap);
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
