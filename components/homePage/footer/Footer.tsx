"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Manav948/Draftly",
    icon: Github,
    color: "hover:text-[#2ea44f] hover:border-[#2ea44f]/40 hover:shadow-[0_0_15px_rgba(46,164,79,0.2)]",
    bgGlow: "bg-[#2ea44f]/10",
    tooltip: "Explore our repository"
  },
  {
    label: "Twitter",
    href: "https://x.com/ManavValani",
    icon: Twitter,
    color: "hover:text-[#1d9bf0] hover:border-[#1d9bf0]/40 hover:shadow-[0_0_15px_rgba(29,155,240,0.2)]",
    bgGlow: "bg-[#1d9bf0]/10",
    tooltip: "Follow our updates"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/manavvalani/",
    icon: Linkedin,
    color: "hover:text-[#0a66c2] hover:border-[#0a66c2]/40 hover:shadow-[0_0_15px_rgba(10,102,194,0.2)]",
    bgGlow: "bg-[#0a66c2]/10",
    tooltip: "Connect on LinkedIn"
  },
];

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Roadmap", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#", badge: "New" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#", badge: "Hiring" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Community", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

export const Footer = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <footer className="relative border-t border-slate-200 dark:border-[#1a1a1a] bg-slate-100 dark:bg-[#070707] text-slate-600 dark:text-[#a1a1aa] overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-gradient-to-b from-slate-900/[0.03] dark:from-white/[0.02] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-20 pb-12 relative z-10">
        
      
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-200 dark:border-[#141414]">
          
       
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative">
                <img src="/logo3.png" className="h-9 w-9 rounded-full border border-slate-300 dark:border-white/10 group-hover:border-slate-400 dark:group-hover:border-white/20 transition-all duration-300" alt="Draftly Logo" />
                <div className="absolute inset-0 rounded-full bg-slate-900/10 dark:bg-white/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-slate-900 dark:text-white font-bold text-xl uppercase tracking-wider group-hover:text-slate-700 dark:group-hover:text-white/90 transition-colors">
                Draftly
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-[#737373] leading-relaxed max-w-sm">
              Redefining productivity for engineering teams through visual architecture planning, focused Pomodoro timers, and integrated task management.
            </p>
          </div>

        
          <div className="md:col-span-7 grid grid-cols-3 gap-6 sm:gap-12">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h4 
                  className="text-slate-900 dark:text-white text-xs uppercase tracking-widest font-semibold"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-slate-600 dark:text-[#737373] hover:text-slate-900 dark:hover:text-white transition-colors duration-150 inline-flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                        {link.badge && (
                          <span className="text-[10px] font-mono font-bold bg-slate-200 dark:bg-[#141414] text-slate-800 dark:text-white border border-slate-300 dark:border-[#222] px-1.5 py-0.5 rounded ml-1 group-hover:border-slate-400 dark:group-hover:border-[#333]">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        <div className="pt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs text-slate-500 dark:text-[#525252]">
            <p style={{ fontFamily: "JetBrains Mono, monospace" }}>
              © {new Date().getFullYear()} Draftly. Built for focus.
            </p>
            <div className="flex items-center gap-5">
              <Link href="#" className="hover:text-slate-800 dark:hover:text-[#737373] transition-colors">Privacy Policy</Link>
              <span className="w-1 h-1 bg-slate-300 dark:bg-[#222] rounded-full" />
              <Link href="#" className="hover:text-slate-800 dark:hover:text-[#737373] transition-colors">Terms of Service</Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="relative group">
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2.5 py-1.5 bg-slate-900 dark:bg-[#0f0f0f] border border-slate-800 dark:border-[#222] text-white text-[10px] font-mono rounded shadow-[0_4px_12px_rgba(0,0,0,0.5)] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-30">
                    <div className="relative">
                      {item.tooltip}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-[#0f0f0f] -mb-1.5" />
                    </div>
                  </div>

                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-[#0d0d0d] border border-slate-200 dark:border-[#1a1a1a] text-slate-600 dark:text-[#737373] transition-all duration-300 active:scale-95 outline-none cursor-pointer shadow-sm dark:shadow-none ${item.color}`}
                  >
                    <div className={`absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 ${item.bgGlow} ${hoveredIndex === idx ? "opacity-100" : ""}`} />
                    
                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-4 sm:h-5 sm:w-5" />
                    </span>
                  </a>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </footer>
  );
};