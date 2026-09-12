import Image from "next/image";
import { invitation } from "@/lib/invitation";

type Props = { className?: string };

const INK = "#5a2a0a";

// Trunk outline, open at the top so no stroke crosses the face.
const TRUNK =
  "M175 222 C173 275 178 330 202 358 C220 374 245 372 258 366 C275 358 287 345 285 330 C284 315 280 305 272 300 " +
  "C265 296 258 295 250 297 C244 300 244 310 248 312 C255 311 259 314 260 320 C261 328 256 334 247 336 " +
  "C238 338 232 336 226 331 C215 320 220 300 222 280 C223 262 226 248 228 222";

/** Stylised Ganpati Bappa. `uid` keeps gradient ids unique per instance. */
export function Bappa({ uid, className }: Props & { uid: string }) {
  const id = (s: string) => `${uid}-${s}`;
  const url = (s: string) => `url(#${id(s)})`;
  const beads = Array.from({ length: 15 }, (_, i) => {
    const t = i / 14;
    const u = 1 - t;
    return { x: u * u * 128 + 2 * u * t * 200 + t * t * 272, y: u * u * 318 + 2 * u * t * 424 + t * t * 318 };
  });

  return (
    <svg viewBox="0 0 400 470" role="img" aria-label="Ganpati Bappa" className={className}>
      <defs>
        <linearGradient id={id("skin")} gradientUnits="userSpaceOnUse" x1="0" y1="120" x2="0" y2="470">
          <stop offset="0" stopColor="#ffd98a" />
          <stop offset=".5" stopColor="#f3a64c" />
          <stop offset="1" stopColor="#d4702a" />
        </linearGradient>
        <linearGradient id={id("gold")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3c2" />
          <stop offset=".45" stopColor="#e9b84f" />
          <stop offset="1" stopColor="#9a6418" />
        </linearGradient>
        <radialGradient id={id("ear")} cx=".6" cy=".5" r=".7">
          <stop offset="0" stopColor="#f08a3c" />
          <stop offset="1" stopColor="#b8321f" />
        </radialGradient>
        <linearGradient id={id("cloth")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a51d30" />
          <stop offset="1" stopColor="#5c0a16" />
        </linearGradient>
        <linearGradient id={id("fade")} x1="0" y1="0" x2="0" y2="1">
          <stop offset=".8" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={id("mask")}>
          <rect width="400" height="470" fill={url("fade")} />
        </mask>
      </defs>

      <g mask={url("mask")} stroke={INK} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        {/* shoulders, shawl, mala */}
        <path d="M64 470 C60 396 98 330 158 304 L242 304 C302 330 340 396 336 470 Z" fill={url("skin")} />
        <path d="M112 322 C168 366 246 424 290 470 L236 470 C196 424 146 384 96 352 Z" fill={url("cloth")} />
        <path d="M112 322 C168 366 246 424 290 470" fill="none" stroke={url("gold")} strokeWidth="4" />
        <path d="M136 312 Q200 372 264 312" fill="none" stroke={url("gold")} strokeWidth="5" />
        {beads.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r="8" fill={i % 2 ? "#e8772e" : "#f7b334"} strokeWidth="1.2" />
        ))}

        {/* ears */}
        <path d="M152 168 C104 132 46 150 44 212 C42 272 96 304 150 268 Z" fill={url("skin")} />
        <path d="M248 168 C296 132 354 150 356 212 C358 272 304 304 250 268 Z" fill={url("skin")} />
        <path d="M146 184 C112 162 72 176 72 214 C72 252 110 270 144 250 Z" fill={url("ear")} strokeWidth="1.5" />
        <path d="M254 184 C288 162 328 176 328 214 C328 252 290 270 256 250 Z" fill={url("ear")} strokeWidth="1.5" />
        <path d="M118 196 q-18 18 0 36 M282 196 q18 18 0 36" fill="none" stroke={url("gold")} strokeWidth="3" />
        <g fill="#f3d88b" stroke="none">
          <circle cx="96" cy="214" r="3" />
          <circle cx="104" cy="200" r="2.2" />
          <circle cx="104" cy="228" r="2.2" />
          <circle cx="304" cy="214" r="3" />
          <circle cx="296" cy="200" r="2.2" />
          <circle cx="296" cy="228" r="2.2" />
        </g>

        {/* face */}
        <path d="M136 156 C126 196 140 232 176 246 L226 246 C262 232 274 196 264 156 Z" fill={url("skin")} />

        {/* crown */}
        <path d="M136 156 C116 146 110 124 122 110 C126 128 136 140 150 146 Z" fill={url("gold")} />
        <path d="M264 156 C284 146 290 124 278 110 C274 128 264 140 250 146 Z" fill={url("gold")} />
        <path d="M142 150 C146 112 166 86 186 62 L200 30 L214 62 C234 86 254 112 258 150 Z" fill={url("gold")} />
        <path d="M154 134 Q200 104 246 134 M166 108 Q200 86 234 108" fill="none" stroke="#8a5a14" />
        <path d="M200 100 C209 110 209 122 200 128 C191 122 191 110 200 100 Z" fill="#b3121f" stroke="#f3d88b" />
        <circle cx="176" cy="130" r="4" fill="#1f7a4d" stroke="#f3d88b" strokeWidth="1" />
        <circle cx="224" cy="130" r="4" fill="#1f7a4d" stroke="#f3d88b" strokeWidth="1" />
        <circle cx="200" cy="26" r="6" fill={url("gold")} />
        <path d="M196 21 L200 8 L204 21 Z" fill={url("gold")} />
        <rect x="134" y="146" width="132" height="18" rx="9" fill={url("gold")} />
        {[148, 174, 200, 226, 252].map((x, i) => (
          <circle key={x} cx={x} cy="155" r="4" fill={i % 2 ? "#1f7a4d" : "#b3121f"} stroke="#f3d88b" strokeWidth="1" />
        ))}

        {/* tilak, brows, eyes */}
        <path d="M192 168 L195 184 Q200 192 205 184 L208 168" fill="none" stroke="#e8572e" strokeWidth="4.5" />
        <circle cx="200" cy="177" r="3.2" fill="#b3121f" stroke="none" />
        <path d="M154 190 Q170 180 186 188 M214 188 Q230 180 246 190" fill="none" strokeWidth="2.5" />
        <path d="M156 203 Q171 191 186 203 Q171 210 156 203 Z" fill="#fff8e7" />
        <path d="M214 203 Q229 191 244 203 Q229 210 214 203 Z" fill="#fff8e7" />
        <circle cx="173" cy="202" r="4.5" fill="#2a1206" stroke="none" />
        <circle cx="227" cy="202" r="4.5" fill="#2a1206" stroke="none" />

        {/* trunk */}
        <path d={TRUNK + " Z"} fill={url("skin")} stroke="none" />
        <path d={TRUNK} fill="none" />
        <path
          d="M178 258 Q200 266 222 258 M176 280 Q199 289 221 280 M178 302 Q198 311 220 302 M186 324 Q203 332 219 322"
          fill="none"
          stroke="#a8621f"
          strokeWidth="2"
          opacity=".5"
        />

        {/* tusks */}
        <path d="M180 240 C172 258 160 270 146 274 C156 262 166 250 172 236 Z" fill="#fff6e2" strokeWidth="1.5" />
        <path d="M222 242 C228 250 233 254 238 255 C236 249 231 243 228 238 Z" fill="#fff6e2" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/** Uses /public image when configured, otherwise the SVG illustration. Parent must be `relative` and sized. */
export function BappaFigure({ uid, className, priority }: Props & { uid: string; priority?: boolean }) {
  if (!invitation.bappaImage) return <Bappa uid={uid} className={className} />;
  return (
    <Image
      src={invitation.bappaImage}
      alt="Ganpati Bappa"
      fill
      preload={priority}
      sizes="(min-width: 768px) 45vw, 80vw"
      className="object-contain"
    />
  );
}

export function Mandala({ className }: Props) {
  const ring = (n: number, r: number, rx: number, ry: number) =>
    Array.from({ length: n }, (_, i) => (
      <ellipse key={i} cx="0" cy={-r} rx={rx} ry={ry} transform={`rotate(${(i * 360) / n})`} />
    ));
  return (
    <svg viewBox="-200 -200 400 400" className={className} aria-hidden fill="none" stroke="#d4a64a">
      <circle r="196" strokeWidth=".8" opacity=".5" />
      <circle r="186" strokeWidth="2.5" strokeDasharray="0 9" strokeLinecap="round" />
      <g strokeWidth="1">{ring(24, 160, 12, 26)}</g>
      <circle r="132" strokeWidth=".8" />
      <circle r="146" strokeWidth="3" strokeDasharray="0 12" strokeLinecap="round" opacity=".7" />
      <g strokeWidth="1" opacity=".8">{ring(16, 106, 16, 30)}</g>
      <circle r="76" strokeWidth="1.2" />
      <g opacity=".7">{ring(8, 50, 14, 26)}</g>
      <circle r="24" />
    </svg>
  );
}

export function Arch({ className }: Props) {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="none" className={className} aria-hidden fill="none" stroke="#d4a64a">
      <path
        d="M30 500 V210 C30 120 110 70 160 60 C180 30 190 18 200 8 C210 18 220 30 240 60 C290 70 370 120 370 210 V500"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M50 500 V214 C50 136 124 92 170 82 C186 56 194 44 200 36 C206 44 214 56 230 82 C276 92 350 136 350 214 V500"
        strokeWidth="1"
        opacity=".6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Diya({ className }: Props) {
  return (
    <svg viewBox="0 0 120 130" className={className} aria-hidden>
      <defs>
        <radialGradient id="diya-glow">
          <stop offset="0" stopColor="#ffd36b" stopOpacity=".9" />
          <stop offset="1" stopColor="#ff9a2e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="diya-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffbe6" />
          <stop offset=".45" stopColor="#ffc53d" />
          <stop offset="1" stopColor="#e8572e" />
        </linearGradient>
        <linearGradient id="diya-brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d88b" />
          <stop offset=".5" stopColor="#c8912f" />
          <stop offset="1" stopColor="#7a4a12" />
        </linearGradient>
      </defs>
      <circle className="diya-glow" cx="60" cy="50" r="48" fill="url(#diya-glow)" />
      <ellipse cx="60" cy="76" rx="50" ry="7" fill="#7a4a12" opacity=".6" />
      <g className="flame">
        <path d="M60 22 C71 40 73 56 60 72 C47 56 49 40 60 22 Z" fill="url(#diya-flame)" />
        <path d="M60 46 C64 54 64 62 60 68 C56 62 56 54 60 46 Z" fill="#fff" />
      </g>
      <path d="M10 74 C18 104 102 104 110 74 C92 84 28 84 10 74 Z" fill="url(#diya-brass)" stroke="#6b3b0f" strokeWidth="1.5" />
      <path d="M42 100 h36 l8 18 h-52 z" fill="url(#diya-brass)" stroke="#6b3b0f" strokeWidth="1.5" />
    </svg>
  );
}

export function Lotus({ className }: Props) {
  return (
    <svg viewBox="0 0 120 60" className={`breathe ${className}`} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M60 8 C72 22 72 40 60 54 C48 40 48 22 60 8 Z" />
      <path d="M60 54 C58 36 44 22 26 18 C28 36 40 50 60 54 Z" />
      <path d="M60 54 C62 36 76 22 94 18 C92 36 80 50 60 54 Z" />
      <path d="M60 54 C48 46 30 42 8 44 C22 54 40 58 60 54 Z" />
      <path d="M60 54 C72 46 90 42 112 44 C98 54 80 58 60 54 Z" />
    </svg>
  );
}

export function Divider({ className = "" }: Props) {
  return (
    <div aria-hidden className={`flex items-center gap-3 ${className}`}>
      <span className="divider-line h-px flex-1 origin-right bg-gradient-to-l from-current to-transparent" />
      <Lotus className="w-9 shrink-0" />
      <span className="divider-line h-px flex-1 origin-left bg-gradient-to-r from-current to-transparent" />
    </div>
  );
}

export function Modak({ className }: Props) {
  const one = (t: string, delay: string) => (
    <g transform={t}>
      <g className="bob" style={{ animationDelay: delay }}>
        <path
          d="M50 8 C56 26 86 48 86 72 C86 88 70 94 50 94 C30 94 14 88 14 72 C14 48 44 26 50 8 Z"
          fill="#f7e7bd"
          stroke="#b8862e"
          strokeWidth="2"
        />
        <path
          d="M50 12 Q30 50 24 88 M50 12 Q40 52 37 92 M50 12 V94 M50 12 Q60 52 63 92 M50 12 Q70 50 76 88"
          fill="none"
          stroke="#d9b56a"
          strokeWidth="1.5"
        />
      </g>
    </g>
  );
  return (
    <svg viewBox="0 0 200 110" className={className} aria-hidden>
      {one("translate(14 32) scale(.78)", "-0.9s")}
      {one("translate(108 32) scale(.78)", "-1.8s")}
      {one("translate(50 10)", "0s")}
    </svg>
  );
}

export function Corner({ className }: Props) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden fill="none" stroke="#b8862e" strokeWidth="1.2">
      <path d="M2 38 V14 Q2 2 14 2 H38" />
      <path d="M8 38 V18 Q8 8 18 8 H38" opacity=".6" />
      <circle cx="14" cy="14" r="2.5" fill="#b8862e" />
    </svg>
  );
}

export function Tassel({ className }: Props) {
  return (
    <svg viewBox="0 0 40 120" className={className} aria-hidden>
      <defs>
        <linearGradient id="tassel-gold" x1="0" x2="1">
          <stop offset="0" stopColor="#8a5a14" />
          <stop offset=".5" stopColor="#f3d88b" />
          <stop offset="1" stopColor="#8a5a14" />
        </linearGradient>
      </defs>
      <path d="M20 0 V30" stroke="url(#tassel-gold)" strokeWidth="3" />
      <circle cx="20" cy="36" r="8" fill="url(#tassel-gold)" />
      <path d="M12 44 h16 l6 60 q-14 8 -28 0 z" fill="url(#tassel-gold)" />
      <path d="M14 60 v44 M18 60 v46 M22 60 v46 M26 60 v44" stroke="#7a4a12" strokeWidth=".8" opacity=".6" />
    </svg>
  );
}

/** Mango-leaf and marigold toran for the top of a section. */
export function Toran({ className }: Props) {
  const n = 14;
  return (
    <svg viewBox={`0 0 ${n * 40} 70`} preserveAspectRatio="xMidYMin slice" className={className} aria-hidden>
      <path
        d={`M0 6 ${Array.from({ length: n }, (_, i) => `Q${i * 40 + 20} 16 ${i * 40 + 40} 6`).join(" ")}`}
        fill="none"
        stroke="#b8862e"
        strokeWidth="2"
      />
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${i * 40 + 20} 11) scale(${i % 2 ? 0.8 : 1})`}>
          <g className="sway" style={{ animationDelay: `-${(i % 5) * 0.6}s` }}>
            <path d="M0 0 C10 14 8 36 0 52 C-8 36 -10 14 0 0 Z" fill="#2f6b2a" stroke="#1d4a1a" strokeWidth="1" />
            <path d="M0 4 V48" stroke="#6fa35a" strokeWidth=".8" />
            <circle cy="2" r="6.5" fill={i % 2 ? "#f2a33a" : "#e8772e"} />
            <circle cy="2" r="2.8" fill="#c2410c" />
          </g>
        </g>
      ))}
    </svg>
  );
}
