"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function Skills({ skills = [] }) {
  const { lang } = useLanguage();
  const t = translations[lang].skills;

  const capabilities = [
    {
      num: "01",
      title: lang === "id" ? "Full Stack Enterprise Architecture" : "Full Stack Enterprise Architecture",
      desc:
        lang === "id"
          ? "Rancang bangun aplikasi web bisnis end-to-end, menggabungkan arsitektur modular backend Laravel dengan kemudahan Single Page Application (SPA) berbasis React dan Vue (Inertia.js)."
          : "End-to-end business web engineering, pairing robust modular Laravel backends with snappy Single Page Application (SPA) workflows via React and Vue (Inertia.js).",
      stack: ["Laravel 11", "React 18", "Vue.js", "Inertia.js", "Tailwind CSS"],
    },
    {
      num: "02",
      title: lang === "id" ? "Host-to-Host (H2H) Banking & Webhooks" : "Host-to-Host (H2H) Banking & Webhooks",
      desc:
        lang === "id"
          ? "Integrasi langsung gateway perbankan (Virtual Account BTNS/Syariah) dengan keamanan bank-grade (IP whitelisting, signature HMAC, dan perlindungan anti-replay attack) serta Server-Sent Events (SSE)."
          : "Direct institutional banking integrations (BTNS Virtual Account) featuring bank-grade security (IP whitelisting, HMAC signatures, anti-replay guards) and Server-Sent Events (SSE).",
      stack: ["H2H Banking API", "Virtual Account", "Webhook Security", "SSE Live Stream"],
    },
    {
      num: "03",
      title: lang === "id" ? "Relational Database Modeling & Akuntansi" : "Relational Database Modeling & Accounting",
      desc:
        lang === "id"
          ? "Perancangan skema basis data relasional kompleks, transaksi database atomik (ACID), auto-journaling pembukuan Buku Kas Umum (BKU), dan rekonsiliasi kas."
          : "Complex relational schema design, atomic ACID transactions, automated double-entry General Cash Book (BKU) journaling, and bank reconciliation.",
      stack: ["MySQL", "Schema Indexing", "Double-Entry Bookkeeping", "Query Optimization"],
    },
    {
      num: "04",
      title: lang === "id" ? "PWA Offline-First & Realtime WebSockets" : "PWA Offline-First & Realtime WebSockets",
      desc:
        lang === "id"
          ? "Pengembangan portal mobile PWA dengan sinkronisasi antrean offline, absensi GPS geofencing & selfie biometrik, serta pelacakan antrean produksi real-time via WebSocket."
          : "Offline-first mobile PWA development with background queue sync, GPS geofencing & selfie biometrics, and live shop-floor tracking via WebSockets.",
      stack: ["PWA", "Service Workers", "Laravel Reverb", "GPS Geofencing"],
    },
    {
      num: "05",
      title: lang === "id" ? "Automated QA, CI/CD & Disaster Recovery" : "Automated QA, CI/CD & Disaster Recovery",
      desc:
        lang === "id"
          ? "Jaminan mutu perangkat lunak dengan automated E2E testing (Playwright), pipeline deployment otomatis GitHub Actions, dan skrip dual-backup terenkripsi ke bot Telegram."
          : "Comprehensive software reliability via automated E2E testing (Playwright), automated GitHub Actions CI/CD pipelines, and encrypted dual-backup scripts with Telegram alerts.",
      stack: ["Playwright E2E", "GitHub Actions", "Telegram Bot API", "Linux VPS"],
    },
  ];

  const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] };

  return (
    <section id="skills" className="py-24 sm:py-32 border-t border-[#242424] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header Micro-Label */}
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

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...transition, delay: 0.1 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white uppercase leading-[0.95] mb-4">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#8f8f8f] leading-relaxed">
            {t.desc}
          </p>
        </motion.div>

        {/* Numbered Editorial List with Stagger & Smooth Hover */}
        <div className="divide-y divide-[#242424] border-y border-[#242424]">
          {capabilities.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...transition, delay: idx * 0.08 }}
              className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start group hover:bg-[#121212]/60 transition-colors duration-300 px-3 sm:px-5 -mx-3 sm:-mx-5 rounded-xl cursor-default"
            >
              {/* Number Index */}
              <div className="lg:col-span-2 font-mono text-xl sm:text-2xl text-[#555555] group-hover:text-white transition-colors duration-300">
                {item.num}.
              </div>

              {/* Title & Description */}
              <div className="lg:col-span-6 space-y-2">
                <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-[#8f8f8f] leading-relaxed max-w-xl group-hover:text-slate-300 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>

              {/* Associated Tech Stack */}
              <div className="lg:col-span-4 flex flex-wrap gap-1.5 pt-2 lg:pt-0 lg:justify-end font-mono text-xs">
                {item.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded bg-[#171717] border border-[#262626] text-[#8f8f8f] group-hover:text-slate-200 group-hover:border-[#383838] transition-all duration-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
