"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function About({ profile }) {
  const { lang } = useLanguage();
  const t = translations[lang].about;
  const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  return (
    <section id="about" className="py-24 sm:py-32 border-t border-[#242424] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header Micro-Label with scroll trigger */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition}
          className="flex items-center justify-between border-b border-[#242424] pb-4 mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#8f8f8f] uppercase">
            <span>{t.label}</span>
          </div>

          <div className="text-[11px] font-mono tracking-widest text-[#8f8f8f] uppercase">
            {t.sublabel}
          </div>
        </motion.div>

        {/* Asymmetrical 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Context / Location */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...transition, delay: 0.1 }}
            className="lg:col-span-4 space-y-6"
          >
            <p className="text-sm sm:text-base text-[#8f8f8f] leading-relaxed">
              {t.lead}
            </p>

            <div className="pt-4 border-t border-[#1c1c1c] space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                <span className="text-[#737373]">{t.specLocation}</span>
                <span className="text-slate-300">{t.specLocationVal}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                <span className="text-[#737373]">{t.specCore}</span>
                <span className="text-slate-300">{t.specCoreVal}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#737373]">{t.specAvail}</span>
                <span className="text-slate-300">{t.specAvailVal}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Big Editorial Statement & Story */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...transition, delay: 0.2 }}
            className="lg:col-span-8 space-y-8"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15]">
              {t.story}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm sm:text-base text-[#a3a3a3] leading-relaxed pt-4">
              <p>
                {lang === "id"
                  ? "Pendekatan saya bertumpu pada kesederhanaan dan pragmatisme: menghindari over-engineering, memastikan setiap baris kode memiliki fungsi operasional yang jelas, serta menjaga reliabilitas sistem jangka panjang."
                  : "My engineering philosophy centers on pragmatism and clarity: avoiding needless over-engineering, ensuring every component serves a distinct business function, and maintaining high long-term system stability."}
              </p>
              <p>
                {t.closing}
              </p>
            </div>

            {/* Editorial Link CTA */}
            <div className="pt-4">
              <motion.a
                href="#projects"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white uppercase group hover:text-slate-300 transition-colors"
              >
                <span>{t.cta}</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
