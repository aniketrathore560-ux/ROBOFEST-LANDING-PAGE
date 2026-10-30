import React, { useState } from 'react';
import { Cpu, X, Volume2, ArrowRight, MessageSquare, Sparkles, HelpCircle } from 'lucide-react';
import { TarsMonolith } from './TarsMonolith';

interface TarsCompanionProps {
  onOpenRegistration: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const TarsCompanion: React.FC<TarsCompanionProps> = ({
  onOpenRegistration,
  onNavigateSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAdviceIndex, setCurrentAdviceIndex] = useState(0);
  const [humor, setHumor] = useState(75);
  const [honesty, setHonesty] = useState(90);

  const adviceList = [
    {
      title: 'ARENA TACTICS',
      text: 'Cooper, the Robo Wars prize pool is ₹35,000. Double check your master kill-switch before inspection.',
      actionText: 'Explore Arenas',
      action: () => onNavigateSection('events'),
    },
    {
      title: 'FAST-TRACK REGISTRATION',
      text: 'Registration takes under 60 seconds on the new deployment portal. Free entry for all qualified bots.',
      actionText: 'Open Registration Page',
      action: onOpenRegistration,
    },
    {
      title: 'MICROMOUSE ADVICE',
      text: 'Floodfill algorithms outperform brute-force A* in the 16x16 grid by 32%. Honesty at 90%: practice on dark surfaces.',
      actionText: 'Review Maze Specs',
      action: () => onNavigateSection('events'),
    },
    {
      title: 'LINE FOLLOWER PID',
      text: 'Tuning PID on the arena vinyl? Cooper, this is no time for caution. Set differential gains carefully.',
      actionText: 'Check Q&A with TARS',
      action: () => onNavigateSection('faq'),
    },
  ];

  const currentAdvice = adviceList[currentAdviceIndex];

  return (
    <aside aria-label="TARS Robot Assistant" className="fixed bottom-5 right-5 z-40">
      {isOpen ? (
        /* Expanded TARS Tactical HUD */
        <div className="w-[340px] sm:w-[380px] bg-slate-950/95 border border-[#00E5FF]/40 rounded-2xl shadow-2xl backdrop-blur-xl p-5 text-slate-100 animate-fadeIn">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                TARS // MISSION ADVISOR
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
              aria-label="Minimize TARS companion"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mini Articulating Monolith Display */}
          <div className="flex items-center gap-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800 mb-3">
            <div className="scale-75 origin-left shrink-0">
              <TarsMonolith
                pose="articulating"
                statusText="ONLINE"
                humorLevel={humor}
                honestyLevel={honesty}
                size="sm"
                interactive={false}
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase block">
                {currentAdvice.title}
              </span>
              <p className="text-xs font-mono text-slate-300 leading-snug">
                "{currentAdvice.text}"
              </p>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => {
                currentAdvice.action();
                setIsOpen(false);
              }}
              className="w-full py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-wider text-[#030610] bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-amber-400/20"
            >
              <span>{currentAdvice.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
              <button
                type="button"
                onClick={() => setCurrentAdviceIndex((prev) => (prev + 1) % adviceList.length)}
                className="hover:text-[#00E5FF] transition-colors"
              >
                ↻ Next Tactical Advice
              </button>
              <button
                type="button"
                onClick={onOpenRegistration}
                className="text-amber-400 hover:underline"
              >
                Go to Registration →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Collapsed Floating Helper Button */
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-[#00E5FF]/50 hover:border-[#00E5FF] shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
          aria-label="Open TARS Mission Advisor"
        >
          <div className="w-7 h-7 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF]">
            <Cpu className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </div>
          <div className="text-left font-mono">
            <span className="text-xs font-bold text-white block leading-none">
              TARS GUIDE
            </span>
            <span className="text-[9px] text-[#00E5FF] block tracking-wider leading-none mt-0.5">
              STANDBY // TAP TO TALK
            </span>
          </div>
        </button>
      )}
    </aside>
  );
};
