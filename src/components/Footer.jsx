"use client";

import { ArrowUp } from "lucide-react";

export default function Footer({ profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Capabilities", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-[#242424] bg-[#050505] pt-16 pb-12 text-[#8f8f8f]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#1f1f1f]">
          {/* Navigation Sitemap */}
          <div className="md:col-span-6 space-y-3 font-mono text-xs">
            <p className="uppercase tracking-widest text-[#555] text-[10px]">
              SITEMAP
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Admin */}
          <div className="md:col-span-6 md:flex md:justify-end space-y-3 font-mono text-xs">
            <div>
              <p className="uppercase tracking-widest text-[#555] text-[10px] mb-2">
                CONNECT
              </p>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {profile?.github && (
                  <li>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      GitHub ↗
                    </a>
                  </li>
                )}
                {profile?.linkedin && (
                  <li>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      LinkedIn ↗
                    </a>
                  </li>
                )}
                {profile?.email && (
                  <li>
                    <a
                      href={`mailto:${profile.email}`}
                      className="hover:text-white transition-colors"
                    >
                      Email Direct ↗
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href="/admin"
                    className="text-[#555] hover:text-[#8f8f8f] transition-colors"
                  >
                    Admin Portal ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#555]">
          <div>
            © {new Date().getFullYear()} {profile?.name ? profile.name.toUpperCase() : "RADJU ALFARIZI"}. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
