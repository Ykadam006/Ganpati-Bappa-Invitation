import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Bappa } from "@/components/Art";
import { invitation } from "@/lib/invitation";

// The real murti when one is configured, else the SVG illustration.
const murti = invitation.bappaImage
  ? `data:image/png;base64,${(await readFile(join(process.cwd(), "public", invitation.bappaImage))).toString("base64")}`
  : null;

// The card WhatsApp shows when the link is shared.
export const alt = "Ganpati Bappa Sthapna & Aarti — you're invited";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
          gap: 56,
          background: "radial-gradient(circle at 30% 45%, #8a1424 0%, #3d0610 55%, #1e0307 100%)",
          color: "#f8efdc",
          border: "12px solid #d4a64a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 400,
            height: 566,
            background: "radial-gradient(circle at 50% 42%, rgba(255,200,100,.4), transparent 65%)",
          }}
        >
          {murti ? <img src={murti} alt="" width={400} height={566} /> : <Bappa uid="og" />}
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 26, letterSpacing: 8, color: "#f3d88b" }}>YOU&apos;RE INVITED</div>
          <div style={{ fontSize: 76, lineHeight: 1.02, marginTop: 18, fontWeight: 700 }}>Ganpati Bappa Sthapna</div>
          <div style={{ fontSize: 52, color: "#f2a33a", marginTop: 8 }}>&amp; Evening Aarti</div>
          <div style={{ fontSize: 30, marginTop: 36, color: "#f3d88b" }}>{invitation.dayDate}</div>
          <div style={{ fontSize: 26, marginTop: 10, opacity: 0.75 }}>{`With love, the ${invitation.family} Family`}</div>
        </div>
      </div>
    ),
    size,
  );
}
