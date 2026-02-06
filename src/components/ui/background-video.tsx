"use client";

export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-10"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
