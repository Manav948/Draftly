"use client";
import { useIsVisible } from "@/hooks/useIsVisible";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Bullet {
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface Props {
  reverse?: boolean;
  label: string;
  title: string;
  desc: string;
  bullets: Bullet[];
  imageSrc: string;
  imageAlt: string;
  id?: string;
}

export const FeatureSection = ({
  reverse,
  label,
  title,
  desc,
  bullets,
  imageSrc,
  imageAlt,
  id,
}: Props) => {
  const { isVisible, ref } = useIsVisible();

  return (
    <section
      id={id}
      ref={ref}
      className={`mt-24 md:mt-52 lg:mt-80 flex flex-col justify-between items-center gap-6 md:gap-10 ${
        reverse ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      <div className="w-full lg:w-2/5 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
            {label}
          </span>
          <h2 className="font-semibold lg:text-4xl text-2xl sm:text-3xl">
            {title}
          </h2>
          <p className="lg:text-xl text-base mt-2 sm:text-lg text-muted-foreground">
            {desc}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          {bullets.map((bullet, index) => {
            const Icon = bullet.icon;
            return (
              <div key={index} className="flex gap-4 items-start">
                <div className="p-2 bg-secondary rounded-lg flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{bullet.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {bullet.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full lg:w-3/5 relative isolate group">
        <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-2xl bg-background/50 backdrop-blur-sm">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Background Gradients (matching Section.tsx style) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-96"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className={`relative left-[calc(50%+11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#e74b4b] to-[#a50505]  sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] group-hover:opacity-80 dark:group-hover:opacity-60 transition-opacity duration-500 ${
              isVisible
                ? "opacity-80 dark:opacity-60"
                : "opacity-40 dark:opacity-30"
            }`}
          />
        </div>
      </div>
    </section>
  );
};
