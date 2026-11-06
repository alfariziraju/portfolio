"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="inline-flex items-center rounded-lg border border-[#262626] bg-[#121212] p-0.5 font-mono text-[11px] select-none"
    >
      <button
        type="button"
        onClick={() => setLang("id")}
        className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
          lang === "id"
            ? "bg-[#282828] text-white font-semibold"
            : "text-[#777] hover:text-white"
        }`}
        aria-pressed={lang === "id"}
      >
        ID
      </button>
      <span className="text-[#333] select-none">/</span>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
          lang === "en"
            ? "bg-[#282828] text-white font-semibold"
            : "text-[#777] hover:text-white"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
