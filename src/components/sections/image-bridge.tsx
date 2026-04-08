"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImageBridge() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "+=200%",
          pin: containerRef.current,
          pinSpacing: true,
          scrub: 1,
        },
      });

      // Step 1: Padding collapse (simulating margin shrink)
      tl.fromTo(
        imgRef.current,
        { paddingLeft: 80, paddingRight: 80, borderRadius: 8 },
        { paddingLeft: 0, paddingRight: 0, borderRadius: 0, duration: 1, ease: "none" },
        0
      );

      // Step 2-3: Dark overlay fades in
      tl.to(
        overlayRef.current,
        { opacity: 0.92, duration: 1, ease: "power2.in" },
        0.6
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef}>
      <div ref={containerRef} className="bg-[#F0F0EC] pt-[200px]">
        <div
          ref={imgRef}
          className="relative w-full h-screen overflow-hidden"
          style={{ paddingLeft: 80, paddingRight: 80 }}
        >
          <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 8 }}>
            {/* Bridge image */}
            <img
              src="/services/bridge.jpg"
              alt="Brand world"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Fallback gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a3040] to-[#0D1117] -z-10" />

            {/* Dark overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-[#0D1117] opacity-0 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
