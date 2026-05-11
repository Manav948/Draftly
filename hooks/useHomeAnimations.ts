"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHomeAnimations() {
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ── Hero entrance ─────────────────────────────────
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTl
          .from(".hero-badge", { opacity: 0, y: -16, duration: 0.6, clearProps: "all" })
          .from(".hero-h1", { opacity: 0, y: 40, duration: 0.8, clearProps: "all" }, "-=0.3")
          .from(".hero-desc", { opacity: 0, y: 24, duration: 0.7, clearProps: "all" }, "-=0.5")
          .from(".hero-btns", { opacity: 0, y: 16, duration: 0.6, clearProps: "all" }, "-=0.4")
          .from(".hero-image", { opacity: 0, y: 32, scale: 0.97, duration: 0.9, clearProps: "all" }, "-=0.4");

        // ── Logo bar ──────────────────────────────────────
        gsap.from(".logo-bar span", {
          opacity: 0,
          y: 12,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: ".logo-bar",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        // ── Feature grid cards stagger ────────────────────
        gsap.from(".feature-card", {
          opacity: 0,
          y: 40,
          stagger: 0.06,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: ".feature-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // ── Generic section reveals ───────────────────────
        gsap.utils.toArray<Element>(".reveal-section").forEach((el) => {
          const children = el.querySelectorAll(
            "h2, p, span, .scroll-image, .activity-feed"
          );
          if (children.length) {
            gsap.from(children, {
              opacity: 0,
              y: 50,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          } else {
            gsap.from(el, {
              opacity: 0,
              y: 50,
              duration: 0.8,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }
        });

        // ── Scroll images scale-in ────────────────────────
        gsap.utils.toArray<Element>(".scroll-image").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            scale: 0.94,
            duration: 1,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

        // ── Activity feed items ───────────────────────────
        gsap.from(".activity-item", {
          opacity: 0,
          x: 30,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: ".activity-feed",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        // ── CTA section ───────────────────────────────────
        gsap.from(".cta-section", {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);
}
