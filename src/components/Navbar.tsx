import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, ArrowLeft, UserPlus } from 'lucide-react';

interface NavbarProps {
  currentView?: 'landing' | 'register';
  onNavigateHome: () => void;
  onRegisterClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView = 'landing',
  onNavigateHome,
  onRegisterClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    closeMenu();
    if (currentView === 'register') {
      onNavigateHome();
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || currentView === 'register'
          ? 'bg-[#070b14]/95 backdrop-blur-md border-b border-[#00E5FF]/20 shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-2xl sm:text-3xl font-display font-black tracking-wider text-white uppercase whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] rounded"
          >
            <Cpu className="w-6 h-6 sm:w-7 sm:h-7 text-[#00E5FF] transition-transform duration-300 group-hover:rotate-45" />
            <span>
              ROBO<span className="text-[#00E5FF]">FEST</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          {currentView === 'landing' ? (
            <nav
              aria-label="Primary navigation"
              className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-300"
            >
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className="hover:text-[#00E5FF] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#00E5FF] hover:after:w-full after:transition-all"
              >
                About
              </a>
              <a
                href="#events"
                onClick={(e) => handleNavClick(e, 'events')}
                className="hover:text-[#00E5FF] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#00E5FF] hover:after:w-full after:transition-all"
              >
                Events
              </a>
              <a
                href="#stats"
                onClick={(e) => handleNavClick(e, 'stats')}
                className="hover:text-[#00E5FF] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#00E5FF] hover:after:w-full after:transition-all"
              >
                Impact
              </a>
              <button
                type="button"
                onClick={onRegisterClick}
                className="hover:text-[#00E5FF] transition-colors whitespace-nowrap shrink-0 relative py-1"
              >
                Registration Portal
              </button>
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="text-[#00E5FF] font-mono tracking-wider">
                ROBOFEST 2026 REGISTRATION PORTAL
              </span>
            </div>
          )}

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            {currentView === 'landing' ? (
              <button
                onClick={onRegisterClick}
                className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#070b14] bg-[#FF9F1C] hover:bg-[#ffb042] rounded-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-[#FF9F1C]/25 hover:shadow-lg hover:shadow-[#FF9F1C]/40 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9F1C]"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register Team</span>
              </button>
            ) : (
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden bg-[#070b14]/98 backdrop-blur-xl border-b border-[#00E5FF]/20 px-6 pt-4 pb-8 shadow-2xl transition-all"
          id="mobile-nav"
        >
          <nav className="flex flex-col space-y-4 text-base font-medium text-slate-200">
            <button
              onClick={() => {
                closeMenu();
                onNavigateHome();
              }}
              className="text-left px-3 py-2 rounded-md hover:text-[#00E5FF] hover:bg-slate-800/50 transition-colors"
            >
              Festival Home
            </button>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="px-3 py-2 rounded-md hover:text-[#00E5FF] hover:bg-slate-800/50 transition-colors"
            >
              About Robofest
            </a>
            <a
              href="#events"
              onClick={(e) => handleNavClick(e, 'events')}
              className="px-3 py-2 rounded-md hover:text-[#00E5FF] hover:bg-slate-800/50 transition-colors"
            >
              Explore Events
            </a>
            <a
              href="#stats"
              onClick={(e) => handleNavClick(e, 'stats')}
              className="px-3 py-2 rounded-md hover:text-[#00E5FF] hover:bg-slate-800/50 transition-colors"
            >
              Festival Stats
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  closeMenu();
                  onRegisterClick();
                }}
                className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#070b14] bg-[#FF9F1C] hover:bg-[#ffb042] rounded-md transition-colors shadow-md shadow-[#FF9F1C]/25"
              >
                Register Squad (Leader + Members)
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
