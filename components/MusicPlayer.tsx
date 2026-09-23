"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { invitation } from "@/lib/invitation";

const { songs } = invitation;

// Just the slice of the YouTube IFrame API used here.
type YTPlayer = { playVideo(): void; pauseVideo(): void; nextVideo(): void; getVideoData(): { video_id: string } };
type YTEvent = { data: number; target: YTPlayer };
declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement, opts: object) => unknown };
    onYouTubeIframeAPIReady?: () => void;
  }
}

// Both CC0 from freesound.org: #466652 "Indian Temple Bell" (ganiket), #712286 "Dhol_Tasha_Maharashtra_Urban_2".
const BELL = "/audio/bell.m4a";
const DHOL = "/audio/dhol-tasha.m4a";
const PLAY = "M8 5.5v13l11-6.5z";
const PAUSE = "M7 5h3.5v14H7zM13.5 5H17v14h-3.5z";

/**
 * Curtain tap → temple bell. Curtain parted → dhol-tasha. Then the song list, from a hidden YouTube player.
 * Browsers allow sound only after a tap, so a guest who scrolls the curtain open instead starts it with their first tap.
 * iPhones won't let a hidden YouTube player play; there the dhol-tasha just keeps looping.
 */
export default function MusicPlayer() {
  const bell = useRef<HTMLAudioElement>(null);
  const dhol = useRef<HTMLAudioElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const yt = useRef<YTPlayer | null>(null);
  const stage = useRef<"idle" | "dhol" | "songs">("idle");
  const opened = useRef(false);
  const ytWorks = useRef(false);
  const [title, setTitle] = useState("Dhol Tasha");
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const loadYouTube = () => {
    if (mount.current!.firstChild) return;
    // YouTube swaps this element for its iframe — keep it out of React's tree.
    const el = mount.current!.appendChild(document.createElement("div"));
    const create = () =>
      new window.YT!.Player(el, {
        host: "https://www.youtube-nocookie.com",
        videoId: songs[0].id,
        // the API starts at the first playlist entry, so the list order is the play order; loop replays it
        playerVars: { playlist: songs.map((s) => s.id).join(","), loop: 1, playsinline: 1, rel: 0 },
        events: {
          onReady: (e: YTEvent) => {
            yt.current = e.target;
            if (stage.current === "songs") e.target.playVideo(); // the dhol-tasha ended before YouTube loaded
          },
          onError: (e: YTEvent) => e.target.nextVideo(), // a label blocked embedding: skip it
          onStateChange: (e: YTEvent) => {
            if (e.data === 1) ytWorks.current = true;
            // YouTube came up late, after we fell back to the dhol-tasha: never play both
            if (stage.current !== "songs") return void (e.data === 1 && e.target.pauseVideo());
            setPlaying(e.data === 1 || e.data === 3); // playing or buffering
            const song = songs.find((s) => s.id === e.target.getVideoData().video_id);
            if (song) setTitle(song.title);
          },
        },
      });
    if (window.YT?.Player) return void create();
    window.onYouTubeIframeAPIReady = create;
    document.head.appendChild(document.createElement("script")).src = "https://www.youtube.com/iframe_api";
  };

  const playDhol = () => {
    stage.current = "dhol";
    setTitle("Dhol Tasha");
    dhol.current!.play().then(
      () => setStarted(true),
      () => (stage.current = "idle"), // no tap yet — the first tap starts it
    );
  };

  const playSongs = () => {
    stage.current = "songs";
    dhol.current!.pause();
    setStarted(true);
    loadYouTube();
    yt.current?.playVideo();
    setTimeout(() => {
      if (ytWorks.current || stage.current !== "songs") return;
      dhol.current!.loop = true; // YouTube can't play here (iPhone): keep the dhol-tasha going
      playDhol();
    }, 10000);
  };

  const onOpen = useEffectEvent(() => {
    bell.current!.play().catch(() => {});
    loadYouTube();
  });

  const onOpened = useEffectEvent(() => {
    opened.current = true;
    if (stage.current === "idle") playDhol();
  });

  const onFirstTap = useEffectEvent(() => {
    loadYouTube();
    if (stage.current !== "idle") return;
    if (opened.current) return playDhol(); // the curtain was scrolled open in silence
    // iOS: an <audio> started inside a tap may be played later without one — prime the dhol-tasha for the curtain
    const a = dhol.current!;
    a.muted = true;
    a.play().then(
      () => {
        if (stage.current === "idle") {
          a.pause();
          a.currentTime = 0;
        }
        a.muted = false;
        if (!a.paused) setPlaying(true);
      },
      () => (a.muted = false),
    );
  });

  // the aarti book opened: stop everything; the guest can press play again when they want it
  const hush = () => {
    dhol.current!.pause();
    yt.current?.pauseVideo();
  };

  useEffect(() => {
    const open = () => onOpen();
    const parted = () => onOpened();
    const tap = () => onFirstTap();
    window.addEventListener("invite:open", open);
    window.addEventListener("invite:opened", parted);
    window.addEventListener("pointerdown", tap, { once: true });
    window.addEventListener("aarti:read", hush);
    return () => {
      window.removeEventListener("aarti:read", hush);
      window.removeEventListener("invite:open", open);
      window.removeEventListener("invite:opened", parted);
      window.removeEventListener("pointerdown", tap);
    };
  }, []);

  const toggle = () => {
    const a = dhol.current!;
    if (stage.current === "idle") return playDhol();
    if (stage.current === "dhol") return a.paused ? void a.play().catch(() => {}) : a.pause();
    if (playing) yt.current?.pauseVideo();
    else yt.current?.playVideo();
  };

  const next = () => (stage.current === "songs" ? yt.current?.nextVideo() : playSongs());

  return (
    <>
      <audio ref={bell} src={BELL} preload="auto" />
      <audio
        ref={dhol}
        src={DHOL}
        preload="none"
        onPlaying={(e) => !e.currentTarget.muted && setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={playSongs}
      />
      <div ref={mount} aria-hidden inert className="pointer-events-none fixed left-[-640px] top-0 h-[200px] w-[356px] opacity-0 [&_iframe]:size-full" />

      <div className="fixed right-4 top-4 z-[60] flex items-center gap-0.5 rounded-full border border-gold/40 bg-night/85 p-1.5 shadow-[0_12px_40px_-10px_rgba(0,0,0,.9)] backdrop-blur-md">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          title={title}
          className="relative grid size-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(180deg,#f7dc93,#d4a64a_55%,#a8752a)] text-night transition-transform active:scale-95"
        >
          {!started && <span aria-hidden className="absolute inset-0 rounded-full bg-gold/50 motion-safe:animate-ping" />}
          <svg viewBox="0 0 24 24" aria-hidden className="relative size-5 fill-current">
            <path d={playing ? PAUSE : PLAY} />
          </svg>
        </button>
        <span aria-hidden className={`eq flex h-4 items-end gap-[3px] px-2 ${playing ? "" : "eq-paused"}`}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="block h-full w-[3px] rounded-full bg-gold-light" />
          ))}
        </span>
        <button
          type="button"
          onClick={next}
          aria-label="Next song"
          title="Next song"
          className="grid size-10 shrink-0 place-items-center rounded-full text-gold-light transition-colors hover:bg-gold/10"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="size-5 fill-current">
            <path d="M6 5.5v13l9-6.5zM16 5h2.5v14H16z" />
          </svg>
        </button>
        <span className="sr-only" aria-live="polite">
          {playing ? `Now playing: ${title}` : ""}
        </span>
      </div>
    </>
  );
}
