import Image from "next/image";

type Props = {
  src?: string | null;
  /** Optional muted autoplay loop for the MacBook screen (takes precedence over `src`). */
  videoSrc?: string | null;
  /** Poster frame while the video buffers; falls back to `src`. */
  poster?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
};

/**
 * Pure-CSS MacBook frame. The glass area is a true 16:10 region and the
 * screenshot fills it with object-cover/top — no letterboxing, no stretching.
 * When `videoSrc` is set, plays a muted autoplay loop inside the glass.
 */
export function MacBookMockup({ src, videoSrc, poster, alt, className, priority }: Props) {
  const posterSrc = poster ?? src ?? undefined;

  return (
    <div className={`relative mx-auto w-full ${className ?? ""}`}>
      {/* Lid */}
      <div className="relative rounded-[14px] border border-white/10 bg-[#0c0c10] p-[0.9%] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[8px] bg-[#111114]">
          {/* camera dot */}
          <span className="absolute left-1/2 top-[6px] z-20 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-white/25" />
          {videoSrc ? (
            <video
              className="absolute inset-0 h-full w-full object-cover object-top"
              src={videoSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={alt}
            />
          ) : src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width:1024px) 92vw, 760px"
              className="object-cover object-top"
              style={{ objectFit: "cover", objectPosition: "top center" }}
              priority={priority}
              draggable={false}
            />
          ) : (
            <Placeholder />
          )}
          {/* screen sheen */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
        </div>
      </div>
      {/* Base / hinge */}
      <div className="relative mx-auto h-[10px] w-[104%] -translate-x-[2%] rounded-b-[10px] border border-t-0 border-white/10 bg-gradient-to-b from-[#17171c] to-[#0c0c10] sm:h-[13px]">
        <span className="absolute left-1/2 top-0 h-[4px] w-[16%] -translate-x-1/2 rounded-b-[6px] bg-black/60 sm:h-[5px]" />
      </div>
    </div>
  );
}

/**
 * Photoreal iPhone 15 Pro frame (matches Figma Portfolio-web node 545:958).
 * Screenshot sits in the glass inset; device chrome PNG overlays with a
 * transparent screen hole so edges stay anti-aliased like the design file.
 */
export function IPhoneMockup({ src, alt, className, priority }: Props) {
  return (
    <div className={`relative mx-auto w-full max-w-[250px] ${className ?? ""}`}>
      {/* 1294×2656 device aspect */}
      <div className="relative aspect-[1294/2656] w-full">
        {/* Screen content — inset measured from Figma/iphone.png (57,50)–(1236,2606) */}
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            left: "4.405%",
            top: "1.883%",
            width: "91.113%",
            height: "96.235%",
            borderRadius: "7.5%",
          }}
        >
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width:768px) 45vw, 250px"
              quality={95}
              className="object-cover object-top"
              style={{ objectFit: "cover", objectPosition: "top center" }}
              priority={priority}
              draggable={false}
            />
          ) : (
            <Placeholder />
          )}
        </div>

        {/* Device chrome — Dynamic Island, bezel, side buttons, silver rim */}
        <Image
          src="/frames/iphone.png"
          alt=""
          fill
          sizes="(max-width:768px) 45vw, 250px"
          quality={100}
          className="pointer-events-none select-none object-contain"
          aria-hidden
          priority={priority}
          draggable={false}
        />
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-panel">
      <span className="micro text-muted">Preview</span>
    </div>
  );
}
