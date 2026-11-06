"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function ProjectImageSlider({ images = [], title = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { lang } = useLanguage();
  const t = translations[lang].projects;

  if (!images || images.length === 0) return null;

  const current = images[currentIndex];
  const total = images.length;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="my-5 space-y-2">
      <div className="overflow-hidden rounded-xl border border-[#242424] bg-[#141414] group/slider">
        {/* Mockup Browser Window Header */}
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-[#242424] bg-[#171717]">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <div className="w-2.5 h-2.5 rounded-full bg-[#333333] shrink-0" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#333333] shrink-0" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#333333] shrink-0" />
            <span className="text-[10px] font-mono text-[#888] ml-2 truncate">
              {current.caption || "system-preview.app"}
            </span>
            <span className="hidden sm:inline-block text-[9px] font-mono tracking-wider text-[#666] border border-[#2e2e2e] rounded px-1.5 py-0.2 select-none uppercase">
              {t.syntheticDataBadge}
            </span>
          </div>

          {total > 1 && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-[#888]">
                {currentIndex + 1} / {total}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous screenshot"
                  className="p-1 rounded text-[#888] hover:text-white hover:bg-[#262626] transition-colors cursor-pointer"
                >
                  <ChevronLeft size={13} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next screenshot"
                  className="p-1 rounded text-[#888] hover:text-white hover:bg-[#262626] transition-colors cursor-pointer"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Screenshot Frame with Navigation Overlays - Compact & Cinematic Height */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[340px] overflow-hidden bg-black/60 select-none">
          <img
            key={current.url}
            src={current.url}
            alt={current.caption || title}
            className="w-full h-full object-cover object-top opacity-90 transition-all duration-500 ease-out group-hover/slider:opacity-100 group-hover/slider:scale-[1.01]"
            loading="lazy"
          />

          {total > 1 && (
            <>
              {/* Left / Right Click Controls */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Slide left"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/85 opacity-0 group-hover/slider:opacity-100 transition-all duration-200 cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Slide right"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/85 opacity-0 group-hover/slider:opacity-100 transition-all duration-200 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>

              {/* Pagination Line / Dots */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? "w-5 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Subtle Privacy & Compliance Footnote */}
      <p className="text-[11px] font-mono text-[#666666] tracking-tight leading-relaxed">
        {t.privacyDisclaimer}
      </p>
    </div>
  );
}
