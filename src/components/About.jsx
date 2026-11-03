"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function About({ profile }) {
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
            <span>01 / ABOUT &amp; PHILOSOPHY</span>
          </div>

          <div className="text-[11px] font-mono tracking-widest text-[#8f8f8f] uppercase">
            ENGINEERING VALUES
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
              Berbasis di Indonesia, berfokus pada pengembangan aplikasi web skala penuh yang mengutamakan kecepatan, struktur kode bersih, dan keandalan sistem jangka panjang.
            </p>

            <div className="pt-4 border-t border-[#1c1c1c] space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                <span className="text-[#737373]">ESTABLISHED</span>
                <span className="text-slate-300">2024 / INDONESIA</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                <span className="text-[#737373]">CORE SPECIALTY</span>
                <span className="text-slate-300">FULLSTACK &amp; APIS</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#737373]">AVAILABILITY</span>
                <span className="text-slate-300">OPEN FOR COLLABORATION</span>
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
              {profile?.about ||
                "Merancang arsitektur backend yang tangguh dan antarmuka web modern yang menyatukan performa, estetika, dan kemudahan perawatan."}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm sm:text-base text-[#a3a3a3] leading-relaxed pt-4">
              <p>
                Pendekatan saya bertumpu pada kesederhanaan dan pragmatisme: menghindari over-engineering, memastikan setiap baris kode memiliki fungsi yang jelas, serta mengoptimalkan waktu muat halaman hingga milidetik.
              </p>
              <p>
                Dari pengelolaan basis data relasional hingga pengalaman pengguna interaktif di browser, seluruh komponen diintegrasikan secara terpadu untuk mendukung tujuan bisnis nyata.
              </p>
            </div>

            {/* Metrics Counters Grid */}
            {profile?.stats && profile.stats.length > 0 && (
              <div className="pt-8 border-t border-[#242424] grid grid-cols-3 gap-6">
                {profile.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...transition, delay: 0.3 + idx * 0.1 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="space-y-1 p-2 -m-2 rounded-xl transition-colors cursor-default"
                  >
                    <div className="text-3xl sm:text-5xl font-semibold tracking-tighter text-white font-mono">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#8f8f8f]">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Editorial Link CTA */}
            <div className="pt-4">
              <motion.a
                href="#projects"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white uppercase group hover:text-slate-300 transition-colors"
              >
                <span>EXPLORE FEATURED WORKS</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
