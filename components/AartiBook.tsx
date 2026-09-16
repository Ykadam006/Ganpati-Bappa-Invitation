"use client";

import { useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { invitation } from "@/lib/invitation";
import { Lotus } from "./Art";

/**
 * The aarti book: the pages of ganpati-aartis.pdf, rendered as images and read inside the site
 * in a native <dialog> (top layer, so the pinned/transformed pages behind it can't skew it).
 * The PDF itself stays one tap away for anyone who wants it on their phone.
 *
 * The dialog is portalled to <body>: ScrollTrigger's pinning moves this section into a pin-spacer
 * on every refresh, and a dialog detached from the document silently drops out of the top layer —
 * it stays open but turns into a plain, unscrollable box in the middle of the page.
 */
export default function AartiBook() {
  const dlg = useRef<HTMLDialogElement>(null);
  // false while rendering on the server, true once hydrated — createPortal needs a real document
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // the page behind stops scrolling via CSS (:has in globals.css), so nothing to clean up on close
  const open = (i = 0) => {
    const el = dlg.current!;
    el.showModal();
    el.querySelector(`#aarti-page-${i}`)?.scrollIntoView();
  };

  return (
    <>
      <ol className="mx-auto mt-10 max-w-md space-y-2 text-left">
        {invitation.aartis.map((a, i) => (
          <li key={a.name}>
            <button
              type="button"
              onClick={() => open(i)}
              className="flex w-full items-center gap-4 rounded-2xl border border-gold/30 bg-ivory/40 px-4 py-3 text-left transition-colors hover:bg-gold/10 active:bg-gold/15"
            >
              <span className="font-serif text-lg text-kesari">{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span
                  lang="mr"
                  className="block font-deva text-[15px] leading-snug text-kesari"
                >
                  {a.hi}
                </span>
                <span className="block truncate text-[13px] text-maroon/70">
                  {a.first}…
                </span>
              </span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="size-4 shrink-0 text-maroon/50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </li>
        ))}
      </ol>

      <div className="reveal mt-9 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() => open(0)}
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#f7dc93,#d4a64a_55%,#a8752a)] px-8 text-base font-semibold text-night shadow-[0_12px_30px_-12px_rgba(212,166,74,.8)] transition-transform active:scale-[.97]"
        >
          <span aria-hidden>📖</span> Read the Aartis
        </button>
        <a
          href={invitation.aartiPdf}
          download="Ganpati-Aartis.pdf"
          className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[.25em] text-maroon underline decoration-gold/60 underline-offset-8"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" />
          </svg>
          Download PDF
        </a>
      </div>

      {mounted &&
        createPortal(
          <dialog ref={dlg} data-lenis-prevent className="aarti-dialog">
            <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-gold/25 bg-night/90 px-4 py-3 backdrop-blur-md">
              <Lotus className="w-8 shrink-0 text-gold" />
              <p className="min-w-0 flex-1 text-left">
                <span
                  lang="mr"
                  className="block font-deva text-sm leading-tight text-marigold"
                >
                  आरती संग्रह
                </span>
                <span className="block truncate text-[11px] font-semibold uppercase tracking-[.2em] text-ivory/60">
                  Aarti Sangrah
                </span>
              </p>
              <a
                href={invitation.aartiPdf}
                download="Ganpati-Aartis.pdf"
                aria-label="Download the aarti PDF"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold-light"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" />
                </svg>
              </a>
              <button
                type="button"
                onClick={() => dlg.current!.close()}
                aria-label="Close the aarti book"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold-light"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="space-y-8 px-3 py-6 md:px-6">
              {invitation.aartis.map((a, i) => (
                <section
                  key={a.name}
                  id={`aarti-page-${i}`}
                  className="scroll-mt-16"
                >
                  <h3 className="mb-3 text-center">
                    <span
                      lang="mr"
                      className="block font-deva text-xl text-marigold"
                    >
                      {a.hi}
                    </span>
                    <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[.3em] text-ivory/55">
                      {a.name}
                    </span>
                  </h3>
                  {/* the PDF pages are black on white: multiply drops the white into the ivory paper */}
                  <div className="paper overflow-hidden rounded-2xl border border-gold/30 p-2 shadow-[0_18px_40px_-20px_rgba(0,0,0,.8)]">
                    <Image
                      src={`/aartis/${i + 1}.jpg`}
                      alt={`${a.name} — ${a.hi}`}
                      width={1100}
                      height={a.h}
                      sizes="(min-width: 768px) 700px, 100vw"
                      loading={i ? "lazy" : "eager"}
                      className="h-auto w-full mix-blend-multiply"
                    />
                  </div>
                </section>
              ))}

              <Lotus className="mx-auto w-16 text-gold" />
              <p
                lang="mr"
                className="pb-2 text-center font-deva text-lg text-gold-light"
              >
                गणपती बाप्पा मोरया
              </p>
            </div>
          </dialog>,
          document.body,
        )}
    </>
  );
}
