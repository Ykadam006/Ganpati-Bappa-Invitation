# Ganpati Bappa Sthapna & Aarti — Build Plan

> One scroll-cinematic invitation page. Guests open it from WhatsApp on a phone,
> so the phone layout is the baseline and desktop builds on top of it.
> **The centerpiece:** closed velvet curtain → scroll → curtains part → golden light →
> Bappa appears → invitation card rises underneath.

---

## 0. Ground rules (locked)

| Decision | Choice |
|---|---|
| Framework | Next.js 16 App Router + TypeScript |
| Styling | Tailwind v4 (tokens in `app/globals.css`) + plain CSS for textures |
| Animation | GSAP 3 + ScrollTrigger + SplitText + `@gsap/react` (`useGSAP`) — **one engine only** |
| Scroll | Lenis, synced to GSAP's ticker. Wheel is smoothed; touch stays native (Lenis default `syncTouch: false`) |
| Art | SVG for everything decorative (curtain folds via CSS, mandala, arch, diya, lotus, modak, Bappa placeholder) |
| Not used | Three.js, Framer Motion, Locomotive, particle libs, video, icon libraries |
| Audio | Curtain tap → temple bell (`public/audio/bell.m4a`) → curtain glides open → dhol-tasha (`public/audio/dhol-tasha.m4a`, both CC0 from freesound) → `songs` from a hidden YouTube player. Sound needs a tap: scrolling open stays silent until the first tap. iPhones block hidden YouTube, so the dhol-tasha loops there |
| Content | **Every guest-facing word lives in `lib/invitation.ts`** — no editing components to change a date |

Motion vocabulary (nothing outside this list):
curtain slide · masked text rise · slow scale+fade · `y: 30 → 0` cards · gold line draw · petal drift · ≤20px parallax.

---

## 1. File map

```
app/
  layout.tsx            fonts (Tiro Devanagari Marathi, Cormorant Garamond, Manrope), metadata, theme color
  page.tsx              composes the scenes in order
  globals.css           palette tokens, velvet/paper textures, petals, diya flame, reduced-motion CSS
  opengraph-image.tsx   the WhatsApp link-preview card (1200×630, generated at build)
components/
  Experience.tsx        "use client" — Lenis + every GSAP timeline (gsap.matchMedia), scoped to one root
  Hero.tsx              Scene 1–3: curtain, valance, glow, mandala, Bappa, invitation card
  Sections.tsx          Scenes 4–8: timeline, aarti, venue, family note, RSVP, finale
  Art.tsx               SVG pieces: Bappa, Mandala, Arch, Diya, Lotus, Modak, Divider, Corner
  Petals.tsx            CSS-animated marigold/rose petals (deterministic positions — no hydration mismatch)
  MusicPlayer.tsx       small fixed pill: play/pause, equaliser, next. Listens for "invite:open" / "invite:opened" from Experience
lib/
  invitation.ts         all content + derived links (WhatsApp, Maps, Google Calendar)
public/
  bappa.webp            ← drop your own Bappa image here (optional; SVG is the fallback)
  mantra.mp3            ← optional instrumental
```

Why one `Experience.tsx`: all timelines share one `gsap.matchMedia()` so desktop / mobile /
reduced-motion setups are created and torn down together. Sections stay dumb markup with class hooks.

---

## 2. Scene-by-scene spec

### Scene 1–3 · The Curtain → Bappa → Card (one pinned, scrubbed timeline)

Pinned section, `100svh`. Timeline runs 0 → 10 units, mapped to the pin distance.

| Units | What moves | Values |
|---|---|---|
| 0 → 1.2 | Intro text on curtain (`॥ श्री गणेशाय नमः ॥`, "Scroll to welcome Bappa", bouncing chevron) | fade + rise out |
| 0.4 → 4.5 | Left / right curtain | `xPercent 0 → ∓88` (mobile `∓96`), slight `scaleX` gather toward the outer edge, `power2.inOut` |
| 0.4 → 4.5 | Center tassels | move out with their curtain |
| 1 → 4.5 | Golden radial glow behind | `opacity 0 → 1` |
| 2 → 5 | Dust specks in the light | `opacity 0 → .7` |
| 0 → 10 | Mandala | `rotate 0 → 8°` (never spins), fades in 2 → 5 |
| 2.5 → 5 | **Bappa reveal** | `opacity 0 → 1`, `scale .88 → 1`, `y 35 → 0` (starts centered in the viewport) |
| 3.5 → 5 | Valance (pelmet) | lifts away `yPercent → -100` |
| 5.5 → 7.5 | Bappa settles into final spot | mobile: rises to top; desktop: slides right |
| 5.5 → 7.5 | Invitation card | mobile: rises from below, Bappa overlaps its top edge; desktop: enters from left, overlapping Bappa |
| 6.5 → 9.5 | Card lines (masked upward reveal, staggered) | `॥ श्री गणेशाय नमः ॥` → "With the divine blessings of Shree Ganpati Bappa" → "you & your family are lovingly invited to" → **Ganpati Bappa Sthapna** → "& Evening Aarti" → date |

Pin distance: mobile `+=200%` (curtain opens over ~0.8 viewport of scroll), desktop `+=260%`.
Scrub: mobile `0.6` (a touch of smoothing on native scroll), desktop `true` (Lenis already smooths).
Petals drift slowly across the lit area (8 petals, CSS only).

### Scene 4 · Details timeline
Not boxes — a single vertical gold line that **draws downward as you scroll** (`scaleY 0 → 1`, scrubbed),
with a glowing node per event: **Sthapna** (day, date, time) → **Aarti** (time) → **Mahaprasad** (time).
Each node + text rises in as it's reached. "Add to Google Calendar" link under the line.

### Scene 5 · Aarti moment
Darker ground. Two SVG diyas with flickering CSS flames that brighten as the section scrolls in.
Bappa faintly in the background (8% opacity, ≤20px parallax). Lotus + gold line grows outward (`scaleX`).
Copy: "Join us for — Ganpati Aarti — Let us come together in devotion, prayer and celebration."
Mantra button (if audio provided).

### Scene 6 · Venue
"You're invited to our home" · address · big thumb-friendly **Get Directions** (opens Google Maps).
"We would be delighted to have you and your family join us."

### Scene 7 · Family message
Slow, large type: **Bappa is coming home.** · paragraph · "With love, The ___ Family" · modak illustration.

### Scene 8 · RSVP + Finale
Two WhatsApp buttons: **I'll Be There 🙏** (pre-filled message) and **Message Us**.
Finale: background warms to gold (scrubbed overlay), Bappa returns, `गणपती बाप्पा मोरया · मंगलमूर्ती मोरया`,
"We look forward to seeing you", falling petals, closing line **Ganpati Bappa Morya! 🙏**

### Progress
Desktop only: thin vertical gold line fixed on the right, fills with page progress. Hidden on phones.

---

## 3. Responsive & motion setups (`gsap.matchMedia`)

| Setup | Condition | Differences |
|---|---|---|
| Mobile | `(max-width: 767px) and (prefers-reduced-motion: no-preference)` | shorter pin, curtains open wider, Bappa centered → top, card from below, parallax halved |
| Desktop | `(min-width: 768px) and (prefers-reduced-motion: no-preference)` | longer pin, card left / Bappa right with overlap, progress rail |
| Reduced motion | `(prefers-reduced-motion: reduce)` | **no pin, no scrub, no parallax, no petals**. Curtains fade out on load (0.8s), everything else just visible |

Layout is authored in its **final** state with Tailwind (mobile-first); GSAP only animates *from* offsets.
So if JS fails, the page is still a complete, readable invitation below the curtain.

---

## 4. Performance budget (phones on 4G)

- Animate only `transform`, `opacity` (+ `scaleY` for the gold line). No layout properties.
- No images required at all: the whole page can ship as HTML + CSS + SVG + fonts. Target first load < 400 KB JS+CSS.
- `next/font` self-hosts fonts (no layout shift, no Google request at runtime). Devanagari font subset only.
- Petals: ≤ 14 elements, CSS keyframes, `will-change: transform`.
- `ScrollTrigger.config({ ignoreMobileResize: true })` so the iOS address bar collapsing doesn't re-layout the pin.
- Optional `bappa.webp` goes through `next/image` with `priority` (it's the hero).

## 5. Accessibility

- Real text everywhere (no text baked into images); the curtain is `aria-hidden`.
- `prefers-reduced-motion` gets its own setup (above).
- Buttons ≥ 48px tall, visible focus rings, `lang="en"` with `lang="mr"` on Marathi lines.
- Color contrast: ivory on maroon and maroon on ivory both exceed WCAG AA.

## 6. Sharing on WhatsApp

`app/opengraph-image.tsx` renders the preview card (maroon + gold, Bappa, "You're invited — Ganpati Bappa
Sthapna & Aarti — Monday, 14 Sep 2026"). Title/description in `metadata`. Next.js on Vercel fills in
`metadataBase` from the production URL automatically, so the preview works without extra config.

## 7. Build order (execution)

1. Scaffold + tokens + fonts + `lib/invitation.ts` ✅
2. Static markup of every scene in final layout (mobile first, then `md:`) ✅
3. SVG art (`Art.tsx`) + textures (velvet, paper, grain) ✅
4. Hero pinned timeline (mobile, then desktop) ✅ — tuned: tassels below intro text, card fades in fast (no muddy half-transparent paper), desktop card overlaps Bappa
5. Section reveals, gold line, finale warm-up, progress rail ✅
6. Reduced-motion setup ✅ (code path; verify on a phone with Reduce Motion on)
7. OG image, metadata ✅ (checked `/opengraph-image`)
8. Verify: `next build` ✅, 390×844 ✅, 360×780 ✅, 1920×929 desktop ✅, short phone (375×600) ✅,
   laptop 1366×650 + landscape phone 844×390 ✅ (`short:` is portrait-only; `low:` scales the stage for landscape)
9. ☐ Fill real content in `lib/invitation.ts` → deploy to Vercel → share link on WhatsApp → confirm preview card

> Testing note: when the Chrome tab is in the background, rAF is throttled and time-based reveals look
> "stuck" in screenshots. Not a bug — they complete as soon as frames run.

## 8. Before sending — content checklist (`lib/invitation.ts`)

- [ ] Family name / hosts
- [ ] Date + Sthapna / Aarti / Mahaprasad times
- [ ] Address + Google Maps link
- [ ] WhatsApp number (country code, no `+`)
- [ ] Optional: `public/bappa.webp` (transparent, ~900px tall) and `public/mantra.mp3`
