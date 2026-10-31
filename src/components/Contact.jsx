"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal mengirim pesan.");
      }

      setStatus("success");
      setFeedbackMessage(data.message || "Pesan Anda berhasil terkirim!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setFeedbackMessage(err.message || "Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] };

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-[#242424] bg-[#0a0a0a]">
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
            <span>05 / INITIATE CONTACT</span>
          </div>

          <div className="text-[11px] font-mono tracking-widest text-[#8f8f8f] uppercase">
            START A CONVERSATION
          </div>
        </motion.div>

        {/* Big Editorial Callout Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...transition, delay: 0.1 }}
          className="mb-16 max-w-4xl"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-[1.08] mb-6">
            Selalu terbuka untuk proyek baru dan peluang kolaborasi rekayasa web.
          </h2>
          <p className="text-base sm:text-lg text-[#8f8f8f] max-w-2xl leading-relaxed">
            Mari wujudkan aplikasi web yang andal dan terukur bersama. Kirimkan pesan melalui form atau hubungi langsung via email.
          </p>
        </motion.div>

        {/* 2-Column Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Links & Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...transition, delay: 0.15 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4 font-mono text-xs">
              <div className="pb-3 border-b border-[#1f1f1f]">
                <p className="text-[#737373] uppercase tracking-widest text-[10px] mb-1">
                  DIRECT INQUIRIES
                </p>
                <a
                  href={`mailto:${profile?.email || "radjualfarizi@gmail.com"}`}
                  className="text-base sm:text-lg text-white font-sans hover:text-[#a3a3a3] transition-colors flex items-center gap-2 group"
                >
                  <span>{profile?.email || "radjualfarizi@gmail.com"}</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              <div className="pb-3 border-b border-[#1f1f1f]">
                <p className="text-[#737373] uppercase tracking-widest text-[10px] mb-1">
                  BASE LOCATION
                </p>
                <p className="text-sm text-slate-200 font-sans">
                  {profile?.location || "Indonesia"} (UTC+7 / Remote Friendly)
                </p>
              </div>

              <div>
                <p className="text-[#737373] uppercase tracking-widest text-[10px] mb-2">
                  CHANNELS &amp; REPOSITORIES
                </p>
                <div className="flex items-center gap-4 text-xs font-mono">
                  {profile?.github && (
                    <motion.a
                      whileHover={{ x: 2 }}
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-slate-400 transition-colors flex items-center gap-1.5"
                    >
                      <GithubIcon size={14} />
                      <span>GITHUB</span>
                    </motion.a>
                  )}
                  {profile?.linkedin && (
                    <motion.a
                      whileHover={{ x: 2 }}
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-slate-400 transition-colors flex items-center gap-1.5"
                    >
                      <LinkedinIcon size={14} />
                      <span>LINKEDIN</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...transition, delay: 0.25 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8f8f8f] mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama Anda"
                    className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#242424] text-white placeholder-[#555] text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8f8f8f] mb-1.5">
                    Alamat Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#242424] text-white placeholder-[#555] text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8f8f8f] mb-1.5">
                  Subjek
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Tentang proyek atau tawaran kerja sama"
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#242424] text-white placeholder-[#555] text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8f8f8f] mb-1.5">
                  Pesan Anda *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Jelaskan kebutuhan, ruang lingkup, atau detail proyek Anda..."
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#242424] text-white placeholder-[#555] text-sm focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              {/* Status Alert */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 text-xs font-mono"
                >
                  <CheckCircle2 size={15} />
                  <span>{feedbackMessage}</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-400 text-xs font-mono"
                >
                  <AlertCircle size={15} />
                  <span>{feedbackMessage}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-[#0a0a0a] text-xs font-semibold tracking-wider uppercase hover:bg-slate-200 disabled:opacity-50 transition-all cursor-pointer shadow-md"
              >
                <span>{status === "loading" ? "Mengirim Pesan..." : "Kirim Pesan Sekarang"}</span>
                <ArrowUpRight size={15} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
