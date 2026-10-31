"use client";

import { motion } from "motion/react";

export default function Skills({ skills = [] }) {
  const capabilities = [
    {
      num: "01",
      title: "Full Stack Web Engineering",
      desc: "Pengembangan sistem digital skala penuh dari antarmuka pengguna responsif hingga logika bisnis backend menggunakan Next.js dan Node.js.",
      stack: ["React.js", "Next.js App Router", "JavaScript ES6+", "Tailwind CSS"],
    },
    {
      num: "02",
      title: "Backend & RESTful API Architecture",
      desc: "Merancang endpoint REST yang aman, terdokumentasi, dengan manajemen error terstandar, middleware autentikasi, dan validasi data ketat.",
      stack: ["Node.js", "Express.js", "JWT Auth", "REST Best Practices"],
    },
    {
      num: "03",
      title: "Database Modeling & ORM",
      desc: "Struktur skema relasional yang teratur, migrasi database otomatis, serta query yang dioptimasi untuk performa baca/tulis cepat.",
      stack: ["Prisma ORM", "SQLite", "PostgreSQL", "Data Integrity"],
    },
    {
      num: "04",
      title: "Performance & Responsive Styling",
      desc: "Membangun tampilan web modern yang cepat dan adaptif di layar smartphone maupun monitor ultra-wide tanpa lag.",
      stack: ["Tailwind CSS", "Semantic HTML5", "Asset Optimization"],
    },
    {
      num: "05",
      title: "DevOps & Cloud Deployment",
      desc: "Penerapan alur kerja Git modern, otomatisasi build, serta deployment tanpa hambatan di infrastruktur cloud serverless.",
      stack: ["Vercel Edge", "Git / GitHub", "Postman", "Linux Bash"],
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
            <span>03 / CAPABILITIES &amp; SERVICES</span>
          </div>

          <div className="text-[11px] font-mono tracking-widest text-[#8f8f8f] uppercase">
            CORE DISCIPLINES
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
            Technical Disciplines
          </h2>
          <p className="text-sm sm:text-base text-[#8f8f8f] leading-relaxed">
            Bidang keahlian rekayasa perangkat lunak yang saya terapkan dalam setiap proyek untuk menjamin stabilitas dan nilai jangka panjang.
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
