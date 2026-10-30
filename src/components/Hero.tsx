import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, Cpu, Clock } from 'lucide-react';
import { calculateTimeRemaining, getDefaultEventDate } from '../utils/countdown';

interface HeroProps {
  onRegisterClick: () => void;
  onExploreEventsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onExploreEventsClick }) => {
  // Event date placeholder set 30 days from today
  const [eventDate] = useState<Date>(() => getDefaultEventDate());
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeRemaining(eventDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(eventDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden blueprint-grid">
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5FF]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-[#FF9F1C]/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Mission Control Headline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Friendly Institute Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-[#00E5FF]/30 text-xs text-[#00E5FF] tracking-wider uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span>ROBOTiX Club · NIT Raipur Presents</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300">Annual Robotics Festival</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-black tracking-tight text-white leading-[1.08] text-balance">
              <span className="text-[#00E5FF] drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                BUILD.
              </span>{' '}
              <span className="text-white">BATTLE.</span>{' '}
              <span className="text-[#FF9F1C] drop-shadow-[0_0_20px_rgba(255,159,28,0.4)]">
                INNOVATE.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Central India's premier robotics and innovation festival at the National Institute of
              Technology Raipur. Compete across Robo Wars, Line Follower sprints, Maze Solvers,
              and Bot Design showcases with engineers nationwide.
            </p>

            {/* Countdown HUD Box */}
            <div className="w-full max-w-xl bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 relative backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-xs uppercase tracking-widest text-[#00E5FF] flex items-center gap-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5" /> Festival Opening Ceremony Countdown
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Arena Opens In 30 Days</span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2 sm:p-3">
                  <div className="text-2xl sm:text-4xl font-display font-bold text-white font-mono-numbers">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-0.5">
                    Days
                  </div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2 sm:p-3">
                  <div className="text-2xl sm:text-4xl font-display font-bold text-white font-mono-numbers">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-0.5">
                    Hours
                  </div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2 sm:p-3">
                  <div className="text-2xl sm:text-4xl font-display font-bold text-white font-mono-numbers">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-0.5">
                    Mins
                  </div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2 sm:p-3">
                  <div className="text-2xl sm:text-4xl font-display font-bold text-[#00E5FF] font-mono-numbers">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-0.5">
                    Secs
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
              {/* Primary CTA (Amber) */}
              <button
                type="button"
                onClick={onRegisterClick}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#070b14] bg-[#FF9F1C] hover:bg-[#ffb042] rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-[#FF9F1C]/30 hover:shadow-[#FF9F1C]/50 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9F1C]"
              >
                <span>Register Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA (Cyan Border) */}
              <button
                type="button"
                onClick={onExploreEventsClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[#00E5FF] bg-slate-950/60 hover:bg-[#00E5FF]/10 border border-[#00E5FF]/50 hover:border-[#00E5FF] rounded-lg transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Events</span>
              </button>
            </div>
          </div>

          {/* Right Column: Pure Machine Combat Robot Photo (Zero Humans) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden bg-slate-900 border border-[#00E5FF]/40 shadow-2xl shadow-[#00E5FF]/15 group">
              <div className="absolute top-3 left-3 z-20 text-[11px] font-semibold uppercase tracking-wider text-[#00E5FF] bg-slate-950/90 px-3 py-1 rounded-md border border-[#00E5FF]/30 backdrop-blur-md">
                Combat Robot Machine
              </div>
              <div className="absolute top-3 right-3 z-20 text-[11px] font-semibold uppercase tracking-wider text-[#FF9F1C] bg-slate-950/90 px-3 py-1 rounded-md border border-[#FF9F1C]/40 backdrop-blur-md">
                Arena Machine
              </div>

              {/* Pure Robot Photo - No Humans */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="/src/assets/images/real/combat_robot_machine.jpg"
                  alt="Championship combat robot machine with spinning weapon disc and heavy aluminum armor"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-80" />
              </div>

              {/* Specs Strip Below Image */}
              <div className="p-4 bg-slate-950 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#00E5FF]" />
                    <span className="font-semibold text-white">Full-Scale Polycarbonate Arena</span>
                  </div>
                  <span className="text-[#FF9F1C] font-semibold">₹1,00,000+ Prize Pool</span>
                </div>
                <div className="mt-1.5 text-xs text-slate-400">
                  Double elimination brackets · Live streaming · Cash prizes and awards
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
