# Ganpati Bappa Sthapna & Aarti — Invitation

A scroll-cinematic, one-page invitation: velvet curtain → golden light → Bappa → invitation card.
Full design and scene timings: [PLAN.md](PLAN.md).

## Personalise (the only file to edit)

`lib/invitation.ts` — family name, date, event times, address, WhatsApp number.
Optional: put a transparent `bappa.webp` and/or `mantra.mp3` in `public/` and set their paths there.

## Run

```bash
npm run dev     # http://localhost:3000
npm run build   # production check
```

## Share

Deploy to Vercel (`npx vercel --prod`), then paste the link in WhatsApp — the preview card comes from `app/opengraph-image.tsx`.
