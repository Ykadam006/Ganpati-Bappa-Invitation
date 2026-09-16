import type { ReactNode } from "react";
import { aartiDays, invitation, links } from "@/lib/invitation";
import AartiBook from "./AartiBook";
import { BappaFigure, Corner, Diya, Divider, Lotus, Modak, Toran } from "./Art";
import Petals from "./Petals";

const btnPrimary =
  "inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#f7dc93,#d4a64a_55%,#a8752a)] px-8 text-base font-semibold text-night shadow-[0_12px_30px_-12px_rgba(212,166,74,.8)] transition-transform active:scale-[.97]";
const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * One sheet of the invitation: ivory paper or maroon card, a double gold frame and corner ornaments.
 * Experience stacks them — each sheet tilts up as it arrives (.sheet), then sinks back (.sink, .page-shade)
 * while the next slides over it. `hook` goes on the section for scroll triggers; `className` styles the sheet.
 */
function Page({
  tone,
  label,
  hook = "",
  className = "",
  children,
}: {
  tone: "paper" | "dark";
  label: string;
  hook?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={label} className={`page relative flex min-h-svh flex-col px-2.5 pb-2.5 md:px-6 md:pb-6 ${hook}`}>
      <div className="sink flex flex-1 flex-col">
        <div
          className={`sheet relative flex flex-1 flex-col justify-center overflow-hidden rounded-[30px] text-center shadow-[0_-30px_60px_-30px_rgba(0,0,0,.9)] ${tone === "paper" ? "paper text-maroon" : "paper-dark text-ivory"} ${className}`}
        >
          <div aria-hidden className="frame pointer-events-none absolute inset-3 rounded-[22px] border border-gold/50 md:inset-5" />
          <div aria-hidden className="frame pointer-events-none absolute inset-[18px] rounded-[17px] border border-gold/20 md:inset-[26px]" />
          <Corner className="corner absolute left-5 top-5 size-9 md:left-8 md:top-8" />
          <Corner className="corner absolute right-5 top-5 size-9 rotate-90 md:right-8 md:top-8" />
          <Corner className="corner absolute bottom-5 right-5 size-9 rotate-180 md:bottom-8 md:right-8" />
          <Corner className="corner absolute bottom-5 left-5 size-9 -rotate-90 md:bottom-8 md:left-8" />
          <div>{children}</div>
          <div aria-hidden className="page-shade pointer-events-none absolute inset-0 bg-night opacity-0" />
        </div>
      </div>
    </section>
  );
}

/** Scene 5: the aarti book — every aarti we sing, readable here, downloadable as the PDF. */
function Book() {
  return (
    <Page tone="paper" label="book-title" className="px-6 py-24 md:py-32">
      <p lang="mr" className="reveal font-deva text-lg text-kesari">आरती संग्रह</p>
      <h2 id="book-title" className="split mt-2 font-serif text-[clamp(2.5rem,10vw,4.5rem)] leading-none text-wine">
        Sing With Us
      </h2>
      <Divider className="reveal mx-auto mt-6 max-w-[220px] text-gold" />
      <p className="split mx-auto mt-7 max-w-sm text-[15px] leading-relaxed text-maroon/80">
        Don&apos;t know the words? Nobody does the first time. Here is the whole aarti book — open it right here, or
        keep it on your phone.
      </p>
      <AartiBook />
    </Page>
  );
}

/** Scene 4: the aarti moment — darker, diyas brighten, Bappa faint behind. */
function Aarti() {
  const { aarti } = invitation;
  return (
    <Page tone="dark" hook="aarti" label="aarti-title" className="px-6 py-28 md:py-40">
      <div
        aria-hidden
        className="aarti-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(255,170,70,.22),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="aarti-bappa relative aspect-[400/470] w-[85vw] max-w-[520px] opacity-[.08]">
          <BappaFigure uid="aarti" className="float size-full" />
        </div>
      </div>

      <div className="relative">
        <p className="reveal text-xs font-semibold uppercase tracking-[.4em] text-ivory/70">Join us for</p>
        <h2 id="aarti-title" className="reveal text-gold-gradient mt-4 font-serif text-[clamp(3.2rem,15vw,6.5rem)] font-semibold leading-[.9]">
          Ganpati
          <br />
          Aarti
        </h2>
        <p lang="mr" className="reveal mt-5 font-deva text-xl text-marigold">सुखकर्ता दुःखहर्ता वार्ता विघ्नाची</p>
        <div className="mx-auto mt-8 flex max-w-xs items-center gap-3 text-gold">
          <span className="aarti-line h-px flex-1 origin-right bg-gradient-to-l from-gold to-transparent" />
          <Lotus className="w-12 shrink-0" />
          <span className="aarti-line h-px flex-1 origin-left bg-gradient-to-r from-gold to-transparent" />
        </div>
        <p className="split mx-auto mt-8 max-w-sm text-lg leading-relaxed text-ivory/85">
          Come sing, pray and celebrate with us.
        </p>

        {/* daily schedule: one card, one glance */}
        <div className="reveal mx-auto mt-10 max-w-sm rounded-3xl border border-gold/35 bg-night/50 px-5 py-7 backdrop-blur-sm">
          <p lang="hi" className="font-deva text-lg text-marigold">प्रतिदिन संध्या आरती</p>
          <p className="mt-1 font-serif text-[2.6rem] leading-none text-gold-light">{aarti.time}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[.3em] text-ivory/70">onwards, every evening</p>
          <ol aria-label="Aarti dates, September 2026" className="aarti-days mt-6 flex flex-wrap justify-center gap-1.5">
            {aartiDays.map((d) => (
              <li key={d.getDate()} className="aarti-day w-12 rounded-xl border border-gold/25 bg-gold/5 py-1.5">
                <span className="block text-[9px] font-semibold uppercase tracking-wider text-ivory/50">
                  {d.toLocaleDateString("en-IN", { weekday: "short" })}
                </span>
                <span className="block font-serif text-xl leading-tight text-gold-light">{d.getDate()}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-ivory/75">
            {aarti.from}-{aarti.to} September. Drop by any evening!
          </p>
          <a
            href={links.calendar}
            {...external}
            className="mt-6 inline-block text-[11px] font-semibold uppercase tracking-[.25em] text-gold-light underline decoration-gold/50 underline-offset-8"
          >
            Add to Google Calendar
          </a>
        </div>
        <div className="mt-12 flex items-end justify-center gap-24 md:gap-40">
          <Diya className="aarti-diya w-16 md:w-20" />
          <Diya className="aarti-diya w-16 md:w-20" />
        </div>
      </div>
    </Page>
  );
}

/** Scene 6: venue + directions. */
function Venue() {
  return (
    <Page tone="paper" hook="venue" label="venue-title" className="px-6 pb-24 pt-28 md:pb-32 md:pt-36">
      <Toran className="toran absolute inset-x-0 top-0 h-16 w-full md:h-20" />
      <p className="reveal text-xs font-bold uppercase tracking-[.4em] text-maroon/60">You&apos;re invited to</p>
      <h2 id="venue-title" className="split mt-3 font-serif text-[clamp(3rem,13vw,5.5rem)] font-semibold leading-none text-wine">
        Our Home
      </h2>
      <Divider className="reveal mx-auto mt-6 max-w-[220px] text-gold" />
      <address className="reveal mt-8 not-italic text-lg leading-relaxed">
        <svg viewBox="0 0 24 24" aria-hidden className="mx-auto mb-2 size-7 text-kesari" fill="currentColor">
          <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
        </svg>
        {invitation.address.map((l) => (
          <span key={l} className="block">{l}</span>
        ))}
      </address>
      <a href={links.maps} {...external} className={`reveal mt-8 ${btnPrimary}`}>
        Get Directions
      </a>
      <p className="reveal mx-auto mt-10 max-w-xs font-serif text-xl italic text-maroon/80">
        A little piece of India in Chicago. Come over, the modaks are on us!
      </p>
    </Page>
  );
}

/** Scene 7: the personal note — slow, big type. */
function Family() {
  return (
    <Page tone="dark" label="family-title" className="px-6 py-28 md:py-40">
      {/* Ganesh Gayatri */}
      <p lang="sa" className="reveal font-deva text-lg leading-relaxed text-marigold">
        ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि ।
        <br />
        तन्नो दन्ती प्रचोदयात् ॥
      </p>
      <h2 id="family-title" className="split mx-auto mt-8 max-w-3xl font-serif text-[clamp(2.8rem,12vw,6rem)] leading-none text-ivory">
        Bappa is coming home.
      </h2>
      <p className="split mx-auto mt-8 max-w-md text-lg leading-relaxed text-ivory/80">
        We may be miles away from home, but Bappa always makes this place feel like ghar. There will be aarti,
        laughter and plenty of modaks. Come celebrate with us at the aarti, any evening you can.
      </p>
      <p className="reveal mt-12 font-serif text-2xl italic text-gold-light">
        Dher saara pyaar,
        <span className="mt-1 block text-3xl font-semibold not-italic">The {invitation.family} Family</span>
      </p>
      <div className="reveal mx-auto mt-8 max-w-sm">
        <p className="text-xs font-semibold uppercase tracking-[.4em] text-ivory/60">Invited by</p>
        <p className="mt-3 font-serif text-xl leading-relaxed text-ivory/90">
          {invitation.invitedBy.slice(0, -1).join(", ")} &amp; {invitation.invitedBy.at(-1)}
        </p>
      </div>
      <Modak className="modak-pop mx-auto mt-10 w-28" />
    </Page>
  );
}

/** Scene 8: shloka + heartfelt invitation — the ground warms to gold, Bappa returns. */
function Finale() {
  return (
    <Page tone="dark" hook="finale" label="finale-title" className="px-6 pb-28 pt-24 md:pt-32">
      <div
        aria-hidden
        className="finale-gold pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_72%,rgba(243,190,90,.42),rgba(190,100,30,.2)_45%,transparent_75%)]"
      />
      <Petals count={14} className="absolute inset-x-0 bottom-0 h-svh" />

      <div className="relative">
        {/* Vakratunda shloka — the prayer said before beginning anything auspicious */}
        <p lang="sa" className="reveal mx-auto max-w-md font-deva text-[clamp(1.2rem,5.2vw,1.7rem)] leading-relaxed text-gold-light">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।
          <br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
        </p>
        <p className="reveal mx-auto mt-4 max-w-sm font-serif text-lg italic leading-snug text-ivory/70">
          “O Lord of the curved trunk and mighty form, radiant as a million suns, may every good thing we begin be
          free of obstacles, always.”
        </p>
        <Divider className="reveal mx-auto mt-10 max-w-[220px] text-gold" />

        <h2 id="finale-title" className="split mt-10 font-serif text-[clamp(2.6rem,11vw,4.2rem)] leading-tight text-ivory">
          Please zaroor aana.
        </h2>
        <p className="split mx-auto mt-5 max-w-md text-lg leading-relaxed text-ivory/80">
          Bappa’s blessings are best when shared. Come as you are, sing the aarti with us, grab a modak (or three),
          and take his blessings home.
        </p>

        <div className="finale-bappa relative mx-auto mt-20 aspect-[400/470] w-[62vw] max-w-[300px]">
          <div aria-hidden className="absolute -inset-[20%] rounded-full bg-[radial-gradient(circle,rgba(255,200,100,.35),transparent_65%)]" />
          <BappaFigure uid="finale" className="float relative size-full" />
        </div>
        <p lang="mr" className="reveal mt-6 font-deva text-[clamp(2rem,9vw,3.4rem)] leading-tight text-gold-light">
          गणपती बाप्पा मोरया
        </p>
        <p lang="mr" className="reveal mt-1 font-deva text-[clamp(1.4rem,6vw,2.2rem)] text-marigold">मंगलमूर्ती मोरया</p>
        <Divider className="reveal mx-auto mt-8 max-w-[220px] text-gold" />
        <p className="reveal mt-8 font-serif text-2xl italic text-ivory/90">Can’t wait to see you!</p>
        <Diya className="reveal mx-auto mt-8 w-14" />
        <p className="reveal mt-8 font-serif text-3xl font-semibold text-gold-light">Ganpati Bappa Morya! 🙏</p>
        <p className="mt-16 text-[11px] uppercase tracking-[.3em] text-ivory/40">With love, The {invitation.family} Family</p>
      </div>
    </Page>
  );
}

export default function Sections() {
  return (
    <>
      <Aarti />
      <Book />
      <Venue />
      <Family />
      <Finale />
    </>
  );
}
