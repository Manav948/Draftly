"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Github, Star } from "lucide-react";
import { homePageTasksImgs } from "@/lib/constants";
import SpotlightBeam from "../SpotlightBeam";

const logos = ["BET A AI", "VENTO...", "REFR...", "GENIX", "VRE A D", "ZAP"];

export const Header = () => {
  const locale = useLocale();
  const signUpPath = locale ? `/${locale}/sign-up` : "/sign-up";

  return (
    <>
      <section className="flex flex-col items-center text-center pt-32 pb-24 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-[#0a0a0a] bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] opacity-100 z-0 pointer-events-none" />
        <SpotlightBeam />

        <div className="relative z-10 flex flex-wrap justify-center items-center gap-3 mb-8">
          <div className="hero-badge inline-flex items-center gap-2 bg-[#111] border border-[#333] shadow-[0_0_15px_rgba(255,255,255,0.05)] rounded-full px-4 py-2 hover:border-[#555] transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#a1a1aa] text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              Draftly is live in beta
            </span>
          </div>

          <a
            href="https://github.com/Manav948/Draftly"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-badge inline-flex items-center gap-2 bg-[#111] border border-[#333] hover:border-[#555] hover:bg-[#161616] text-[#a1a1aa] hover:text-white transition-all duration-200 rounded-full px-4 py-2 cursor-pointer group shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              Star on GitHub
            </span>
            <span className="flex items-center gap-0.5 text-xs text-[#525252] group-hover:text-amber-400 transition-colors pl-1.5 border-l border-[#222]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </span>
          </a>
        </div>

        <h1 className="relative z-10 hero-h1 font-extrabold text-5xl sm:text-7xl lg:text-[80px] max-w-5xl leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mt-2 pb-2 drop-shadow-sm">
          The unified workspace for <br className="hidden md:block" /> tasks & mind maps.
        </h1>
        <p className="relative z-10 hero-desc text-[#888] text-lg sm:text-xl mt-6 max-w-2xl leading-relaxed font-medium">
          Draftly is a modern productivity platform that combines structured task management with visual planning and focused workflows — all in one place.
        </p>

        <div className="relative z-10 hero-btns mt-12 flex flex-wrap justify-center gap-4">
          <Link href={signUpPath} className="bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:bg-white/90 transition-all duration-200 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Start Shipping Today
          </Link>
          <button className="bg-transparent text-white border border-[#333] px-8 py-3.5 rounded-full font-medium hover:bg-[#111] hover:border-[#555] transition-all duration-200 hover:scale-105 backdrop-blur-sm">
            View Documentation
          </button>
        </div>

        <div className="relative z-10 hero-image mt-20 w-full max-w-[1000px] bg-[#0c0c0c] p-2 rounded-2xl border border-[#222] shadow-[0_0_60px_-15px_rgba(255,255,255,0.1)] transition-transform duration-500 hover:scale-[1.01] mx-auto">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
          <Image src={homePageTasksImgs[0].src} alt="Draftly Dashboard" width={1200} height={750} className="rounded-xl w-full border border-[#1a1a1a]" priority />
        </div>
      </section>

      <div className="logo-bar flex justify-between items-center text-[#404040] font-mono text-sm uppercase mb-32 border-t border-b border-[#1d1d1d] py-5 w-full">
        {logos.map((l) => <span key={l} className="tracking-widest">{l}</span>)}
      </div>
    </>
  );
};
