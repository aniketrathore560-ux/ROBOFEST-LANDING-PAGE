import React from 'react';
import { Cpu, Github, Instagram, Linkedin, MapPin, Mail, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050811] border-t border-slate-800/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-2xl font-display font-black tracking-wider text-white uppercase">
              <Cpu className="w-6 h-6 text-[#00E5FF]" />
              <span>
                ROBO<span className="text-[#00E5FF]">FEST</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Hosted by the <strong className="text-slate-200">ROBOTiX Club, NIT Raipur</strong>.
              Empowering student engineers, innovators, and roboticists to design, build, and deploy
              high-performance automated hardware.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <MapPin className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <span>National Institute of Technology, G.E. Road, Raipur, CG - 492010</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#about" className="hover:text-[#00E5FF] transition-colors">
                  About Robofest
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-[#00E5FF] transition-colors">
                  Competitive Arenas
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-[#00E5FF] transition-colors">
                  Impact & Key Metrics
                </a>
              </li>
              <li>
                <a href="#register" className="hover:text-[#00E5FF] transition-colors">
                  Team Registration
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links & Club Info */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200">
              Connect With Us
            </h4>
            <p className="text-xs text-slate-400">
              Follow official announcements, rule updates, and live tournament streams.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-[#00E5FF] flex items-center justify-center text-slate-300 hover:text-[#00E5FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
                aria-label="ROBOTiX Club Instagram page"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-[#00E5FF] flex items-center justify-center text-slate-300 hover:text-[#00E5FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
                aria-label="ROBOTiX Club LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-[#00E5FF] flex items-center justify-center text-slate-300 hover:text-[#00E5FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
                aria-label="ROBOTiX Club GitHub repositories"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
            <div className="text-xs text-slate-400">
              Contact: <span className="text-slate-300">robotix@nitrr.ac.in</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} ROBOTiX Club, NIT Raipur. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Robotics · Automation · Innovation</span>
            <span>·</span>
            <span>Central India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
