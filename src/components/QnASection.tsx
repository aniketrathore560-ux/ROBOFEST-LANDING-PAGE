import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Terminal, Cpu, Sliders, Volume2, Shield } from 'lucide-react';
import { TarsMonolith } from './TarsMonolith';
import { getTarsResponseForQuestion, TarsResponse } from '../utils/tars';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'What are the bot weight classes and active weapon restrictions?',
    answer:
      'Robo Wars accommodates two official classes: Featherweight (up to 15 kg) and Middleweight (up to 30 kg). Active weapons—including high-speed spinners, pneumatic flippers, and vertical drums—are mandatory for combat division. Internal combustion engines, liquids, chemical fires, and radio jammers are strictly barred.',
    category: 'Combat Arena',
  },
  {
    id: 2,
    question: 'Can students from different colleges or academic years form a team?',
    answer:
      'Yes! Cross-departmental, inter-year, and inter-institutional teams are completely allowed and encouraged across all ROBOFEST tracks. Your team must have between 1 to 5 members depending on the event, with one designated Team Leader.',
    category: 'Team Composition',
  },
  {
    id: 3,
    question: 'What safety systems and kill-switches must our robot incorporate?',
    answer:
      'All combat and high-velocity machines must include an externally accessible mechanical master kill-switch or removable link covered in high-visibility safety colors. Telemetry fail-safes must cut drive and weapon motors immediately if radio link is interrupted.',
    category: 'Safety Protocols',
  },
  {
    id: 4,
    question: 'What are the surface specifications for Line Follower and Maze Solver?',
    answer:
      'The Line Follower track is constructed of matte white non-reflective vinyl with 30mm high-contrast black paths, containing 90-degree hairpins, crossover intersections, and dynamic chicanes. The Maze Solver grid is a standard IEEE 16x16 modular labyrinth with 18cm matte black non-reflective walls.',
    category: 'Autonomous Specs',
  },
  {
    id: 5,
    question: 'Will accommodation and travel guidance be provided at NIT Raipur?',
    answer:
      'Yes. Outstation participants whose teams have secured verified registration will be allotted accommodation inside the NIT Raipur campus hostels or guest facilities on a subsidized first-come, first-served basis. Dedicated student coordinators assist upon arrival at Raipur Junction.',
    category: 'Logistics',
  },
];

export const QnASection: React.FC = () => {
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [humorLevel, setHumorLevel] = useState<number>(75);
  const [honestyLevel, setHonestyLevel] = useState<number>(90);

  const tarsResponse: TarsResponse = getTarsResponseForQuestion(
    activeQuestionId,
    humorLevel,
    honestyLevel
  );

  const handleQuestionToggle = (id: number) => {
    // If clicking same question, cycle pose or keep open
    setActiveQuestionId(id);
  };

  const cyclePoseManually = () => {
    setActiveQuestionId((prev) => (prev % FAQS.length) + 1);
  };

  return (
    <section id="faq" className="py-24 relative bg-[#040711] border-t border-slate-800/80 overflow-hidden">
      {/* Cosmic background glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>TARS TACTICAL DEBRIEF // MISSION FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight text-balance">
            Questions & Arena Parameters
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Tap any inquiry below to review the official regulations. Watch TARS reorient and deliver
            tactical assessments based on your configured parameters.
          </p>
        </div>

        {/* 2-Column Grid: Questions (Left) + TARS Monolith (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Questions Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq) => {
              const isOpen = activeQuestionId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-slate-900/90 border-[#00E5FF]/50 shadow-lg shadow-[#00E5FF]/10'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleQuestionToggle(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-amber-400/90 font-bold shrink-0 mt-0.5">
                        0{faq.id}.
                      </span>
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-1">
                          {faq.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 mt-1 ${
                        isOpen ? 'rotate-180 text-[#00E5FF]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4 animate-fadeIn">
                      <p>{faq.answer}</p>

                      {/* Small telemetry badge */}
                      <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                        <Shield className="w-3.5 h-3.5 text-[#00E5FF]" />
                        <span>Verified by ROBOTiX Technical Board</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive TARS Monolith Unit */}
          <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 sm:p-7 relative backdrop-blur-md">
            {/* Header with TARS serial & controls */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00E5FF]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  TARS AI Monolith Unit
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded">
                CONNECTED
              </span>
            </div>

            {/* TARS Articulating Robot */}
            <div className="py-2 flex justify-center">
              <TarsMonolith
                pose={tarsResponse.actionPose}
                statusText={`[${tarsResponse.headline}]: ${tarsResponse.commentary}`}
                humorLevel={humorLevel}
                honestyLevel={honestyLevel}
                onTap={cyclePoseManually}
                size="md"
              />
            </div>

            {/* Real-time TARS Speech Bubble / Commentary Box */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Volume2 className="w-3.5 h-3.5" /> TARS VOCAL AUDIO LOG
                </span>
                <span className="text-slate-400">QUERY {activeQuestionId}</span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed italic">
                "{tarsResponse.commentary}"
              </p>
            </div>

            {/* Interactive Humor / Honesty Parameter Sliders */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" /> TARS Parameters
                </span>
                <span className="text-[10px] text-slate-400">Adjust personality matrix</span>
              </div>

              {/* Humor Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Humor Setting:</span>
                  <span className="text-amber-400 font-bold">{humorLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={humorLevel}
                  onChange={(e) => setHumorLevel(Number(e.target.value))}
                  aria-label="TARS Humor Level Slider"
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded cursor-pointer"
                />
              </div>

              {/* Honesty Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Honesty Setting:</span>
                  <span className="text-[#00E5FF] font-bold">{honestyLevel}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={honestyLevel}
                  onChange={(e) => setHonestyLevel(Number(e.target.value))}
                  aria-label="TARS Honesty Level Slider"
                  className="w-full accent-[#00E5FF] h-1.5 bg-slate-800 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
