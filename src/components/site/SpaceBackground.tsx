"use client";

/**
 * Light atmosphere tuned to Slack's palette —
 * white field, soft aubergine / blue / green washes.
 */
export default function SpaceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(90%_55%_at_50%_-5%,rgba(255,255,255,0.98),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_0%_100%,rgba(74,21,75,0.06),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_100%_0%,rgba(54,197,240,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_70%_60%,rgba(46,182,125,0.05),transparent_70%)]" />
    </div>
  );
}
