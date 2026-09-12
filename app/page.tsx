import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import Sections from "@/components/Sections";

export default function Page() {
  return (
    <Experience>
      <main>
        <Hero />
        <Sections />
      </main>
      {/* desktop scroll progress */}
      <div aria-hidden className="pointer-events-none fixed right-5 top-1/2 z-40 hidden h-36 w-px -translate-y-1/2 bg-ivory/15 md:block">
        <span className="progress-fill block size-full origin-top bg-gold" />
      </div>
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-50" />
      <MusicPlayer />
    </Experience>
  );
}
