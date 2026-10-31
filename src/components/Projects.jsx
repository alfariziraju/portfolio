"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export default function Projects({ initialProjects = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Fullstack", "Frontend", "Backend"];

  const filteredProjects =
    selectedCategory === "Semua"
      ? initialProjects
      : initialProjects.filter(
          (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] };

  return (
    <section id="projects" className="py-24 sm:py-32 border-t border-[#242424] bg-[#0a0a0a]">
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
            <span>02 / SELECTED WORKS</span>
          </div>

          <div className="text-[11px] font-mono tracking-widest text-[#8f8f8f] uppercase">
            PRODUCTION SYSTEMS
          </div>
        </motion.div>

        {/* Section Title & Filter Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between mb-16 pb-8 border-b border-[#1f1f1f]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...transition, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white uppercase leading-[0.95] mb-4">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-[#8f8f8f] max-w-2xl leading-relaxed">
              Koleksi sistem web, aplikasi enterprise, dan arsitektur backend yang telah saya kembangkan dari fase perancangan hingga implementasi siap produksi.
            </p>
          </motion.div>

          {/* Filter Bar with Animated Indicators */}
          <div className="lg:col-span-4 flex flex-wrap lg:justify-end items-center gap-1 text-xs font-mono tracking-wider uppercase">
            {categories.map((cat, idx) => {
              const isSelected = selectedCategory === cat;
              return (
                <div key={cat} className="flex items-center relative">
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      isSelected
                        ? "text-white font-semibold"
                        : "text-[#8f8f8f] hover:text-white"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeFilterBg"
                        className="absolute inset-0 bg-[#242424] rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span>{cat}</span>
                  </button>
                  {idx < categories.length - 1 && (
                    <span className="text-[#333333] select-none mx-0.5">/</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Grid with Fluid AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className={`group flex flex-col justify-between rounded-2xl border border-[#242424] bg-gradient-to-b from-[#121212] to-[#0a0a0a] p-7 sm:p-9 hover:border-[#3d3d3d] hover:shadow-xl hover:shadow-black/50 transition-colors duration-300 ${
                  project.isFeatured && index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div>
                  {/* Card Top: Index Number & Links */}
                  <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-4 mb-6 text-xs font-mono text-[#8f8f8f]">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">#{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-[#333333]">|</span>
                      <span className="uppercase text-slate-300">{project.category}</span>
                      {project.isFeatured && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-mono">
                          <Sparkles size={11} /> FEATURED
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors p-1"
                          title="Repository GitHub"
                        >
                          <GithubIcon size={16} />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors p-1 group/link"
                          title="Live Demo"
                        >
                          <ArrowUpRight size={17} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight group-hover:text-slate-200 transition-colors mb-3">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#a3a3a3] leading-relaxed mb-6 max-w-2xl">
                    {project.description}
                  </p>
                </div>

                {/* Card Bottom: Stats & Tags */}
                <div className="pt-6 border-t border-[#1f1f1f] space-y-4">
                  {project.stats && (
                    <div className="text-xs font-mono text-[#cfcfcf] flex items-center gap-2">
                      <span>{project.stats}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded bg-[#171717] border border-[#262626] text-[#8f8f8f] group-hover:text-slate-300 group-hover:border-[#333] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
