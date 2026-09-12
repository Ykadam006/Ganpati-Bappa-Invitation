import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Tiro_Devanagari_Marathi } from "next/font/google";
import { invitation } from "@/lib/invitation";
import "./globals.css";

const deva = Tiro_Devanagari_Marathi({ weight: "400", subsets: ["devanagari"], variable: "--font-tiro" });
const serif = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

const title = `Ganpati Bappa Sthapna & Aarti · ${invitation.family} Family`;
const description = `Bappa is coming home! You and your family are lovingly invited for Ganpati Bappa Sthapna & Aarti on ${invitation.dayDate}.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export const viewport: Viewport = { themeColor: "#1e0307" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${deva.variable} ${serif.variable} ${sans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
