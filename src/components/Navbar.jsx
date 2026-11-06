"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ profile }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects & Exp", href: "#projects" },
    { label: "Capabilities", href: "#skills" },
    { label: "Education", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#242424] py-3.5"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Left: Brand / Studio Name */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-white tracking-wider text-xs sm:text-sm font-semibold uppercase group"
        >
          <span>{profile?.name ? profile.name.toUpperCase() : "RADJU ALFARIZI"}</span>
        </a>

        {/* Center: Metadata / Status */}
        <div className="hidden lg:flex items-center gap-3 text-xs tracking-widest uppercase text-[#8f8f8f] font-mono">
          <span className="text-slate-300">AVAILABLE FOR WORK</span>
        </div>

        {/* Right: Editorial Links with Slash Separators */}
        <nav className="hidden md:flex items-center text-xs tracking-wider uppercase font-medium">
          {navLinks.map((item, index) => (
            <div key={item.href} className="flex items-center">
              <a
                href={item.href}
                className="text-[#a3a3a3] hover:text-white transition-colors duration-200 px-2 py-1"
              >
                {item.label}
              </a>
              {index < navLinks.length - 1 && (
                <span className="text-[#383838] select-none mx-1">/</span>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-[#a3a3a3] transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[61px] bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-[#242424] px-6 py-8 space-y-5 animate-in fade-in duration-200">
          <div className="space-y-4">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-white hover:text-slate-400 tracking-tight transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[#242424] flex items-center justify-between text-xs tracking-wider uppercase text-[#8f8f8f] font-mono">
            <span>INDONESIA</span>
            <span className="text-slate-300">OPEN FOR WORK</span>
          </div>
        </div>
      )}
    </header>
  );
}
