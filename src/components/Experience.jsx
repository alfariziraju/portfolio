"use client";

import { motion } from "motion/react";

export default function Experience({
  experiences = [],
  education = [],
  certifications = [],
}) {
  const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] };

  return (
    <section id="experience" className="py-24 sm:py-32 border-t border-[#242424] bg-[#0a0a0a]">
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
            <span>04 / CAREER &amp; EDUCATION</span>
          </div>

          <div className="text-[11px] font-mono tracking-widest text-[#8f8f8f] uppercase">
            CHRONOLOGICAL RECORD
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
            Experience History
          </h2>
          <p className="text-sm sm:text-base text-[#8f8f8f] leading-relaxed">
            Perjalanan profesional dalam merancang arsitektur sistem nyata di institusi pendidikan dan perusahaan.
          </p>
        </motion.div>

        {/* Work Experiences Timeline Rows */}
        <div className="divide-y divide-[#242424] border-y border-[#242424] mb-20">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...transition, delay: idx * 0.1 }}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group hover:bg-[#121212]/40 px-3 sm:px-5 -mx-3 sm:-mx-5 rounded-xl transition-colors duration-300"
            >
              {/* Period */}
              <div className="md:col-span-3 font-mono text-xs text-[#8f8f8f] uppercase tracking-wider group-hover:text-slate-300 transition-colors">
                {exp.period}
              </div>

              {/* Role & Company */}
              <div className="md:col-span-4 space-y-1">
                <h3 className="text-xl font-medium text-white tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                  {exp.role}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-[#cfcfcf]">
                  {exp.company}
                </p>
              </div>

              {/* Description */}
              <div className="md:col-span-5 text-sm text-[#8f8f8f] leading-relaxed group-hover:text-slate-300 transition-colors">
                {exp.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education & Certifications Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-[#242424]">
          {/* Education */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#8f8f8f]">
              ACADEMIC BACKGROUND
            </h3>
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-[#242424] bg-[#121212]/50 space-y-2 hover:border-[#383838] transition-colors"
              >
                <div className="flex justify-between items-center text-xs font-mono text-[#8f8f8f]">
                  <span className="text-white font-medium">{edu.institution}</span>
                  <span>{edu.period}</span>
                </div>
                <h4 className="text-lg font-medium text-white">
                  {edu.degree}
                </h4>
                <p className="text-xs text-[#8f8f8f] leading-relaxed">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#8f8f8f]">
              CREDENTIALS &amp; CERTIFICATIONS
            </h3>
            <div className="space-y-3 font-mono text-xs">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[#242424] bg-[#121212]/50 flex items-center justify-between hover:border-[#383838] transition-colors"
                >
                  <span className="text-slate-200">{cert.name}</span>
                  <span className="text-[#8f8f8f] text-[11px] px-2 py-0.5 rounded bg-[#1c1c1c] border border-[#2e2e2e]">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
