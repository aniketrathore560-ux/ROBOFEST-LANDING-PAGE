import React, { useEffect, useRef, useState } from 'react';
import { Target, Users, Award, Calendar, Lightbulb, Zap, CheckCircle2 } from 'lucide-react';

interface StatItem {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'events',
    label: 'Events & Challenges',
    value: 20,
    suffix: '+',
    subtext: 'Combat, autonomous & design arenas',
    icon: Zap,
  },
  {
    id: 'participants',
    label: 'Participants Expected',
    value: 500,
    suffix: '+',
    subtext: 'Engineers from top institutes nationwide',
    icon: Users,
  },
  {
    id: 'prize',
    label: 'Cash Prize Pool',
    value: 100000,
    prefix: '₹',
    suffix: '',
    subtext: 'Cash rewards, grants & trophies',
    icon: Award,
  },
  {
    id: 'duration',
    label: 'Festival Duration',
    value: 3,
    suffix: ' Days',
    subtext: 'High-octane robotics & hackathons',
    icon: Calendar,
  },
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    events: 0,
    participants: 0,
    prize: 0,
    duration: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1, rootMargin: '150px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Safety timeout: trigger animation after 2.5s if not already triggered
    const timeout = setTimeout(() => {
      setHasAnimated(true);
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const durationMs = 1800;
    const frameRate = 30;
    const totalFrames = Math.round((durationMs / 1000) * frameRate);
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      const progress = Math.min(currentFrame / totalFrames, 1);
      // Ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setCounts({
        events: Math.round(easeProgress * 20),
        participants: Math.round(easeProgress * 500),
        prize: Math.round(easeProgress * 100000),
        duration: Math.round(easeProgress * 3),
      });

      if (currentFrame >= totalFrames) {
        clearInterval(timer);
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [hasAnimated]);

  const formatNumber = (num: number, isPrize = false) => {
    if (isPrize) {
      return num.toLocaleString('en-IN');
    }
    return num.toLocaleString();
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative bg-[#090d19] border-t border-b border-slate-800/80 overflow-hidden"
    >
      {/* Background blueprint dots */}
      <div className="absolute inset-0 blueprint-dots opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest text-[#00E5FF] font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-[2px] bg-[#00E5FF]" />
            <span>Mission & Legacy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight text-balance">
            Forging Tomorrow’s Robotic Engineers at NIT Raipur
          </h2>
        </div>

        {/* 2-3 Description Paragraphs in Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            <p>
              ROBOFEST is the flagship annual robotics and automation symposium organized by the{' '}
              <strong className="text-white font-semibold">ROBOTiX Club, NIT Raipur</strong>. Born from a
              passion for hands-on fabrication, embedded intelligence, and mechanical warfare, the festival
              unites aspiring engineers, makers, and innovators from across the country under one arena.
            </p>
            <p>
              Our mission is to bridge textbook theory and battle-tested execution. Through competitive
              combat brackets, autonomous sensor navigation, algorithmic maze sprints, and mechanical design
              defense, students sharpen their skills in precision kinematics, real-time PID tuning, power
              electronics, and team problem-solving.
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              Whether building an armored combat bot engineered to withstand 50G impacts or optimizing an
              autonomous micro-vehicle for millisecond lap timing, ROBOFEST offers a collaborative yet
              fiercely competitive stage to turn bold hardware blueprints into triumphant reality.
            </p>
          </div>

          {/* Pillars List */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-6 relative">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-800 mb-4">
              Core Engineering Pillars
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Full-Stack Mechanical & Electronics</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    From custom CNC chassis and 3D printing to motor controllers and telemetry RF links.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Autonomous Algorithmic Mastery</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sensor fusion, ToF LiDAR mapping, and rapid heuristic pathfinding under time pressure.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Multidisciplinary Teamwork</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Collaborative pit crews where mechanical, electrical, and computer science minds unite.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Animated Stat Cards */}
        <div id="stats" className="scroll-mt-28">
          <div className="text-xs uppercase tracking-widest text-[#00E5FF] font-semibold mb-6 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span>Festival By The Numbers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS_DATA.map((stat) => {
              const Icon = stat.icon;
              const isPrize = stat.id === 'prize';
              const currentVal = counts[stat.id] || 0;

              return (
                <div
                  key={stat.id}
                  className="bg-slate-950/70 border border-slate-800 hover:border-[#00E5FF]/40 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#00E5FF]/10 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      {stat.label}
                    </span>
                    <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-[#00E5FF] group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="text-3xl sm:text-4xl font-display font-black text-white font-mono-numbers tracking-tight">
                    {stat.prefix}
                    {formatNumber(currentVal, isPrize)}
                    {stat.suffix}
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-1">{stat.subtext}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
