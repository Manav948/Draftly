"use client";

import Image from "next/image";
import { homePageRolesAndSettingsImgs } from "@/lib/constants";

export default function SettingsSection() {
  return (
    <div className="relative w-full" style={{ background: "#0d0d0d", backgroundImage: "linear-gradient(to right, #161616 1px, transparent 1px), linear-gradient(to bottom, #161616 1px, transparent 1px)", backgroundSize: "28px 28px" }}>
      <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
        <section className="reveal-section py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-[#525252] text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>PERSONALIZATION</span>
            <h2 className="font-semibold text-3xl sm:text-4xl text-white">Truly yours.</h2>
            <p className="text-[#737373] text-lg leading-relaxed">
              Custom themes, notification sounds, and workflow settings. Draftly adapts to your unique way of working, not the other way around.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex -space-x-2">
                {["#2a2a2a", "#1a1a1a", "#111111"].map((c) => (
                  <div key={c} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a]" style={{ background: c }} />
                ))}
              </div>
              <span className="text-[#525252] text-sm">Joined by 12,000+ developers</span>
            </div>
          </div>
          <div className="scroll-image lg:col-span-7 bg-[#0f0f0f] p-3 rounded-lg border border-[#1d1d1d] shadow-2xl">
            <Image src={homePageRolesAndSettingsImgs[0].src} alt="Settings" width={800} height={500} className="rounded w-full" />
          </div>
        </section>
      </main>
    </div>
  );
}
