"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SpotlightBeam() {
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const beam = beamRef.current;
    if (!beam) return;

    // Start: beam comes in from the right, sweeps left, then fades out
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      beam,
      { opacity: 0, rotateZ: 18, x: 200 },
      { opacity: 1, rotateZ: 18, x: 200, duration: 0.4, ease: "power2.out" }
    )
      .to(beam, {
        rotateZ: -12,
        x: -180,
        duration: 1.8,
        ease: "power1.inOut",
      })
      .to(beam, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      });
  }, []);

  return (
    <div
      ref={beamRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: 0, transformOrigin: "top center" }}
    >
      {/* The beam cone – originates from top, fans downward */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          width: "340px",
          height: "130%",
          transformOrigin: "top center",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 100%)",
          clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
          filter: "blur(8px)",
        }}
      />
      {/* Bright core of the beam */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          width: "80px",
          height: "80%",
          transformOrigin: "top center",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)",
          clipPath: "polygon(35% 0%, 65% 0%, 72% 100%, 28% 100%)",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}
