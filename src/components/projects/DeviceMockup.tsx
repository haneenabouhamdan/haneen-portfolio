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
 * Pure-CSS iPhone frame with a 9:19.5 screen and dynamic-island pill in the
 * top bezel (never over screenshot pixels). Portrait screenshots fill the
 * glass with object-cover/object-top.
 */
export function IPhoneMockup({ src, alt, className, priority }: Props) {
  return (
    <div className={`relative mx-auto w-full max-w-[250px] ${className ?? ""}`}>
      <div className="relative rounded-[8%] border border-white/12 bg-[#0a0a0d] px-[2.6%] pb-[2.6%] pt-[4.4%] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)]">
        {/* side buttons */}
        <span className="absolute -left-[2px] top-[22%] h-[7%] w-[2px] rounded-l bg-white/10" />
        <span className="absolute -left-[2px] top-[33%] h-[10%] w-[2px] rounded-l bg-white/10" />
        <span className="absolute -right-[2px] top-[26%] h-[13%] w-[2px] rounded-r bg-white/10" />
        {/* dynamic island — lives in the top bezel band, above the screen */}
        <span className="pointer-events-none absolute left-1/2 top-[1.6%] z-20 h-[2.2%] max-h-[10px] w-[28%] -translate-x-1/2 rounded-full bg-black" />
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[6%] bg-[#111114]">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="250px"
              className="object-cover object-top"
              style={{ objectFit: "cover", objectPosition: "top center" }}
              priority={priority}
              draggable={false}
            />
          ) : (
            <Placeholder />
          )}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
        </div>
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
