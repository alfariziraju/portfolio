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
            <span>04 / ACADEMIC &amp; CREDENTIALS</span>
          </div>

          <div className="text-[11px] font-mono tracking-widest text-[#8f8f8f] uppercase">
            CERTIFIED FOUNDATIONS
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
            Education &amp; Credentials
          </h2>
          <p className="text-sm sm:text-base text-[#8f8f8f] leading-relaxed">
            Fondasi akademik teknik informatika dan sertifikasi rekayasa perangkat lunak berstandar industri.
          </p>
        </motion.div>

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
