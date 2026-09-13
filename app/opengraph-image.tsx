import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { Bappa } from "@/components/Art";
import { invitation } from "@/lib/invitation";

// Runs only at build (the image is prerendered), so the bundler needn't trace these paths.
const file = (p: string) => readFile(join(/*turbopackIgnore: true*/ process.cwd(), p));

// The real murti when one is configured, else the SVG illustration.
const murti = invitation.bappaImage
  ? `data:image/png;base64,${(await file(join("public", invitation.bappaImage))).toString("base64")}`
  : null;

// Same faces as the site. tiro-om.ttf holds only ॐ: the image renderer can't join Devanagari letters, so no shloka.
const fonts = [
  { name: "Cormorant", data: await file("assets/cormorant-600.ttf"), weight: 600 as const, style: "normal" as const },
  { name: "Cormorant", data: await file("assets/cormorant-500-italic.ttf"), weight: 500 as const, style: "italic" as const },
  { name: "Tiro", data: await file("assets/tiro-om.ttf"), weight: 400 as const, style: "normal" as const },
];

const maroon = "#6d0c1b";
const gold = "#d4a64a";
const kesari = "#c4531c";
const label = { fontSize: 17, letterSpacing: 5, textTransform: "uppercase", color: "rgba(109,12,27,.7)" } as const;

// The card WhatsApp shows when the link is shared: Bappa beside the invitation card.
export const alt = "Ganpati Bappa beside the invitation card for the Sthapna & Aarti";
export const size = { width: 1200, height: 630 };
// JPEG, not PNG: WhatsApp skips preview images much over 300 KB, and the PNG is ~600 KB.
export const contentType = "image/jpeg";

export default async function Image() {
  const [sthapna] = invitation.events;
  const png = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          fontFamily: "Cormorant",
          background: "radial-gradient(circle at 28% 45%, #8a1424 0%, #3d0610 55%, #1e0307 100%)",
          border: `12px solid ${gold}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 400,
            height: 566,
            background: "radial-gradient(circle at 50% 42%, rgba(255,200,100,.45), transparent 65%)",
          }}
        >
          {murti ? <img src={murti} alt="" width={400} height={566} /> : <Bappa uid="og" />}
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 600,
            padding: "38px 44px",
            borderRadius: 26,
            textAlign: "center",
            color: maroon,
            background: "radial-gradient(ellipse at 50% 40%, #fdf8ec 0%, #f1e1bf 100%)",
            boxShadow: "0 30px 80px -20px rgba(0,0,0,.85)",
          }}
        >
          {[
            { at: 9, radius: 20, line: "2px solid rgba(212,166,74,.7)" },
            { at: 17, radius: 14, line: "1px solid rgba(212,166,74,.35)" },
          ].map(({ at, radius, line }) => (
            <div key={at} style={{ position: "absolute", top: at, left: at, right: at, bottom: at, borderRadius: radius, border: line }} />
          ))}

          <div style={{ fontFamily: "Tiro", fontSize: 34, lineHeight: 1, color: kesari }}>ॐ</div>
          <div style={{ ...label, marginTop: 10 }}>With the divine blessings of</div>
          <div style={{ fontSize: 32, fontStyle: "italic", fontWeight: 500 }}>Shree Ganpati Bappa</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "12px 0" }}>
            <div style={{ width: 90, height: 1, background: gold }} />
            <div style={{ width: 9, height: 9, background: gold, transform: "rotate(45deg)" }} />
            <div style={{ width: 90, height: 1, background: gold }} />
          </div>
          <div style={{ fontSize: 23, color: "rgba(109,12,27,.85)" }}>Far from home, together for Bappa. Join us for</div>
          <div style={{ marginTop: 6, fontSize: 64, lineHeight: 1, color: "#4a0712" }}>Ganpati Bappa Sthapna</div>
          <div style={{ fontSize: 38, fontStyle: "italic", fontWeight: 500, color: kesari }}>&amp; Evening Aarti</div>
          <div style={{ ...label, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${gold}`, color: maroon }}>
            {invitation.dayDate}
          </div>
          <div style={{ marginTop: 4, fontSize: 22 }}>{`Sthapna at ${sthapna.time}, aarti daily at ${invitation.aarti.time}`}</div>
          <div style={{ marginTop: 10, fontSize: 24, fontStyle: "italic", fontWeight: 500, color: kesari }}>
            {`With love, The ${invitation.family} Family`}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
  const jpg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpg), { headers: { "Content-Type": contentType } });
}
