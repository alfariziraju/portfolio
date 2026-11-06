"use client";

import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Terminal, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function Hero({ profile }) {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  // Smooth cubic-bezier transition like Framer/Aether Studio
  const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  return (
    <section id="hero" className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
      {/* Subtle ambient light in the background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-white/[0.04] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Top Micro-Label with fade-in */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between border-b border-[#242424] pb-4 mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#8f8f8f] uppercase">
            <span>{t.badge}</span>
          </div>

          <div className="text-[11px] font-mono tracking-widest text-[#8f8f8f] uppercase hidden sm:block">
            {t.subtitle}
          </div>
        </motion.div>

        {/* Massive Typographic Headline with smooth staggered reveal */}
        <div className="mb-8 sm:mb-12 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white uppercase leading-[0.9] select-none"
          >
            Radju
            <br />
            <motion.span
              className="text-[#8f8f8f] hover:text-white transition-colors duration-500 inline-block"
              whileHover={{ x: 6, transition: { duration: 0.3 } }}
            >
              Alfarizi
            </motion.span>
          </motion.h1>
        </div>

        {/* Sub-bar Editorial Grid with stagger */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-[#242424] mb-12 sm:mb-16"
        >
          <div className="md:col-span-7 space-y-2">
            <p className="text-xs font-mono tracking-widest text-[#8f8f8f] uppercase">
              ROLE &amp; FOCUS
            </p>
            <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
              {profile?.role || "Software Developer"} —{" "}
              <span className="text-[#a3a3a3]">
                {t.tagline}
              </span>
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <p className="text-xs font-mono tracking-widest text-[#8f8f8f] uppercase mb-1">
                LOCATION &amp; COLLABORATION
              </p>
              <p className="text-sm text-[#cfcfcf]">
                {profile?.location || "Semarang, Indonesia"} — Remote &amp; Global Ready
              </p>
            </div>

            {/* Quick Action Links with hover lift */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.a
                href="#projects"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0a0a0a] text-xs font-semibold tracking-wider uppercase hover:bg-slate-200 transition-all duration-200 group shadow-sm"
              >
                <span>{t.ctaProjects}</span>
                <ArrowDownRight size={15} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#242424] text-white text-xs font-medium tracking-wider uppercase border border-[#303030] transition-all duration-200 group"
              >
                <span>{t.ctaContact}</span>
                <ArrowUpRight size={15} className="text-[#8f8f8f] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Hero Visual Showcase Frame with viewport scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.4 }}
          className="relative rounded-2xl sm:rounded-3xl border border-[#242424] bg-gradient-to-b from-[#141414] to-[#0d0d0d] p-6 sm:p-10 overflow-hidden group hover:border-[#383838] transition-colors duration-500"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#24242408_1px,transparent_1px),linear-gradient(to_bottom,#24242408_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* Top Frame Controls */}
          <div className="flex items-center justify-between border-b border-[#242424] pb-4 mb-8 text-xs font-mono text-[#8f8f8f]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-semibold tracking-wider">ENGINEERING WORKSPACE</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-300 text-[11px]">
                ACTIVE ENV: PRODUCTION
              </span>
            </div>
          </div>

          {/* Core Content Grid inside Hero Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.1] text-white text-xs font-mono tracking-wider">
                <Terminal size={13} className="text-slate-300" />
                <span>CORE STACK ARCHITECTURE</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-white leading-snug">
                {lang === "id"
                  ? "Merancang sistem perangkat lunak yang andal, dari skema basis data hingga antarmuka pengguna responsif."
                  : "Architecting reliable enterprise software systems, from database schemas to responsive client interfaces."}
              </h2>

              <p className="text-sm text-[#a3a3a3] leading-relaxed max-w-xl">
                {lang === "id"
                  ? "Mengintegrasikan backend Laravel yang kokoh, integrasi perbankan Host-to-Host (H2H), dan frontend modern (React, Vue, Inertia, PWA) untuk menghadirkan solusi operasional kelas industri."
                  : "Integrating robust Laravel backends, Host-to-Host (H2H) banking APIs, and modern frontends (React, Vue, Inertia, PWA) to deliver high-impact enterprise operational solutions."}
              </p>
            </div>

            {/* Tech Matrix / Quick Badges on Right */}
            <div className="lg:col-span-4 bg-[#0a0a0a]/70 border border-[#242424] rounded-2xl p-5 space-y-3 font-mono text-xs hover:border-[#333] transition-colors">
              <div className="text-[#8f8f8f] uppercase text-[10px] tracking-widest pb-2 border-b border-[#242424] flex items-center justify-between">
                <span>SYSTEM PARAMETERS</span>
                <Sparkles size={12} className="text-amber-400" />
              </div>

              <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                <span className="text-[#8f8f8f]">Backend</span>
                <span className="text-slate-200">PHP 8 / Laravel / H2H API</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                <span className="text-[#8f8f8f]">Frontend</span>
                <span className="text-slate-200">React / Vue / Inertia / PWA</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                <span className="text-[#8f8f8f]">Database</span>
                <span className="text-slate-200">MySQL / Relational Schema</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8f8f8f]">Deployment</span>
                <span className="text-slate-200">Linux VPS / Vercel Edge</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Bar inside Hero Card */}
          <div className="mt-8 pt-6 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8f8f8f]">
            <div className="flex items-center gap-4">
              <span>SOCIAL PROFILES:</span>
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <GithubIcon size={14} />
                  <span>GITHUB</span>
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <LinkedinIcon size={14} />
                  <span>LINKEDIN</span>
                </a>
              )}
            </div>

            <div className="tracking-widest uppercase text-[11px]">
              SCROLL DOWN TO EXPLORE ↓
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
