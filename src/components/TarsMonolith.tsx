import React from 'react';

export interface TarsMonolithProps {
  pose?: 'idle' | 'scanning' | 'articulating' | 'alert' | 'calculating';
  statusText?: string;
  humorLevel?: number;
  honestyLevel?: number;
  interactive?: boolean;
  onTap?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const TarsMonolith: React.FC<TarsMonolithProps> = ({
  pose = 'idle',
  statusText = 'SYSTEM READY // TARS ONLINE',
  humorLevel = 75,
  honestyLevel = 90,
  interactive = true,
  onTap,
  size = 'md',
}) => {
  // Dimension calculations for the 4-segment monolith
  const sizeClasses = {
    sm: 'w-48 h-64',
    md: 'w-64 h-84',
    lg: 'w-80 h-96',
  }[size];

  // Segment animation offsets based on pose
  const getSegmentTransform = (index: number) => {
    switch (pose) {
      case 'articulating':
        // Iconic walking/scissor articulation: segments 1 and 3 step up/tilt, 2 and 4 step down
        if (index === 0) return 'translate-y-[-14px] rotate-[-2deg]';
        if (index === 1) return 'translate-y-[8px] rotate-[1deg]';
        if (index === 2) return 'translate-y-[-12px] rotate-[-1deg]';
        if (index === 3) return 'translate-y-[10px] rotate-[2deg]';
        return '';
      case 'scanning':
        if (index === 0) return 'translate-y-[-4px] scale-[1.02]';
        if (index === 1) return 'translate-y-[-8px]';
        if (index === 2) return 'translate-y-[-8px]';
        if (index === 3) return 'translate-y-[-4px] scale-[1.02]';
        return '';
      case 'calculating':
        if (index === 0) return 'translate-x-[-6px] translate-y-[-4px]';
        if (index === 1) return 'translate-y-[-2px]';
        if (index === 2) return 'translate-y-[4px]';
        if (index === 3) return 'translate-x-[6px] translate-y-[-4px]';
        return '';
      case 'alert':
        if (index === 0) return 'translate-y-[-6px] rotate-[-3deg]';
        if (index === 3) return 'translate-y-[-6px] rotate-[3deg]';
        return '';
      case 'idle':
      default:
        // Subtle natural offset
        if (index === 1 || index === 2) return 'translate-y-[-2px]';
        return 'translate-y-[0px]';
    }
  };

  const getPoseColor = () => {
    switch (pose) {
      case 'alert':
        return 'text-amber-400 border-amber-500/60 bg-amber-950/40';
      case 'scanning':
        return 'text-[#38BDF8] border-[#38BDF8]/60 bg-sky-950/40';
      case 'articulating':
      case 'calculating':
        return 'text-[#00E5FF] border-[#00E5FF]/60 bg-cyan-950/40';
      default:
        return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';
    }
  };

  return (
    <div
      onClick={onTap}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`TARS Robot Monolith in ${pose} posture. Click to interact.`}
      className={`relative flex flex-col items-center justify-center p-4 transition-all duration-500 select-none ${
        interactive ? 'cursor-pointer group' : ''
      }`}
    >
      {/* Ambient Gravitational / Thruster Glow */}
      <div
        className={`absolute inset-0 rounded-2xl blur-2xl opacity-30 transition-all duration-700 pointer-events-none ${
          pose === 'alert'
            ? 'bg-amber-500/20'
            : pose === 'scanning'
            ? 'bg-sky-500/25'
            : 'bg-[#00E5FF]/20'
        }`}
      />

      {/* TARS Head-Up Status Readout */}
      <div
        className={`w-full max-w-xs mb-3 px-3 py-1.5 rounded border backdrop-blur-md text-[11px] font-mono transition-all duration-300 ${getPoseColor()}`}
      >
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest opacity-80 pb-0.5 border-b border-current/20">
          <span>TARS // USMC-0024</span>
          <span>HUMOR: {humorLevel}% · HONESTY: {honestyLevel}%</span>
        </div>
        <div className="pt-1 font-semibold flex items-center gap-1.5 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
          <span className="truncate">{statusText}</span>
        </div>
      </div>

      {/* The 4 Articulating Monolith Blocks */}
      <div
        className={`relative ${sizeClasses} grid grid-cols-4 gap-1.5 p-2 bg-[#0a0f1d]/90 border border-slate-700/80 rounded-xl shadow-2xl backdrop-blur-lg`}
      >
        {[0, 1, 2, 3].map((idx) => {
          const isCenter = idx === 1 || idx === 2;
          return (
            <div
              key={idx}
              className={`relative flex flex-col justify-between p-2 rounded bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border border-slate-600/70 shadow-inner transition-transform duration-500 ease-out ${getSegmentTransform(
                idx
              )}`}
            >
              {/* Brushed Titanium Surface Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] rounded pointer-events-none" />

              {/* Top Sensor Notch & Stencil Marking */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-full h-1 rounded-full mb-1 transition-colors duration-300 ${
                    pose === 'alert'
                      ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                      : pose === 'scanning'
                      ? 'bg-[#38BDF8] shadow-[0_0_8px_#38bdf8]'
                      : 'bg-[#00E5FF] shadow-[0_0_8px_#00e5ff]'
                  }`}
                />
                <span className="text-[9px] font-mono text-slate-400 tracking-tighter">
                  {idx === 0 ? 'TARS' : idx === 3 ? 'USMC' : `0${idx + 1}`}
                </span>
              </div>

              {/* Middle Section: Display or Mechanical Joint */}
              <div className="my-auto py-2 flex flex-col items-center justify-center">
                {isCenter ? (
                  <div className="w-full bg-black/80 border border-slate-700/80 rounded px-1 py-1.5 text-center">
                    <div className="font-mono text-[8px] text-[#00E5FF] opacity-90 tracking-widest">
                      {idx === 1 ? 'GRV: 1.0G' : 'ORBIT'}
                    </div>
                    <div className="w-full h-[1px] bg-slate-800 my-1" />
                    <div className="text-[7px] text-slate-400 font-mono">
                      {idx === 1 ? 'AI: ACTIVE' : 'SYNC: OK'}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 w-full items-center">
                    <div className="w-3 h-0.5 bg-slate-600 rounded" />
                    <div className="w-4 h-0.5 bg-slate-500 rounded" />
                    <div className="w-3 h-0.5 bg-slate-600 rounded" />
                  </div>
                )}
              </div>

              {/* Base Joint & Foot Pad */}
              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[8px] font-mono text-slate-400">
                <span>PAD</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tactile Hint */}
      {interactive && (
        <span className="mt-2 text-[10px] font-mono text-slate-400 group-hover:text-[#00E5FF] transition-colors">
          [TAP TARS TO TRIGGER MOTION REORIENTATION]
        </span>
      )}
    </div>
  );
};
