"use client";

import SmoothScroll from "./SmoothScroll";
import { useHomeAnimations } from "@/hooks/useHomeAnimations";
import { Nav } from "./navbar/Nav";
import { Header } from "./header/Header";
import PrecisionFeatures from "./section/PrecisionFeatures";
import MindMapsSection from "./section/MindMapsSection";
import SpeedSection from "./section/SpeedSection";
import FocusSection from "./section/FocusSection";
import CollaborationSection from "./section/CollaborationSection";
import CalendarSection from "./section/CalendarSection";
import SettingsSection from "./section/SettingsSection";
import CTASection from "./section/CTASection";
import { Footer } from "./footer/Footer";

function HomeContent() {
  useHomeAnimations();

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen selection:bg-white/20" style={{ fontFamily: "Geist, Inter, sans-serif" }}>
      <Nav />

      <main className="w-full mx-auto max-w-[1800px] px-6 md:px-12">
        <Header />
      </main>

      <PrecisionFeatures />
      <MindMapsSection />
      <SpeedSection />
      <FocusSection />
      <CollaborationSection />
      <CalendarSection />
      <SettingsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export const HomePage = () => (
  <SmoothScroll>
    <HomeContent />
  </SmoothScroll>
);
