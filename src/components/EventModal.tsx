import React, { useEffect } from 'react';
import { X, Award, Users, MapPin, Clock, ShieldCheck, Phone, ArrowRight } from 'lucide-react';
import { RobotEvent } from '../types';

interface EventModalProps {
  event: RobotEvent | null;
  onClose: () => void;
  onSelectForRegistration: (eventId: string) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  onClose,
  onSelectForRegistration,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (event) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-event-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0b101f] border border-[#00E5FF]/40 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00E5FF] px-2.5 py-1 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/30">
              {event.category} Category
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: {event.id.toUpperCase()}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
            aria-label="Close event details modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Title and Prize */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <h3 id="modal-event-title" className="text-2xl sm:text-3xl font-display font-bold text-white">
                {event.title}
              </h3>
              <p className="text-sm text-slate-400 mt-1">{event.highlight}</p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="text-xs uppercase tracking-wider text-slate-400 block">Total Reward</span>
              <span className="text-xl sm:text-2xl font-display font-bold text-[#FF9F1C]">
                {event.prize}
              </span>
            </div>
          </div>

          {/* Full Description */}
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {event.fullDescription}
          </div>

          {/* Event Quick Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs sm:text-sm">
            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block">Team Composition</span>
                <span className="font-semibold text-white">{event.teamSize}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block">Schedule & Venue</span>
                <span className="font-semibold text-white">{event.schedule}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 sm:col-span-2">
              <MapPin className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block">Arena Specification</span>
                <span className="text-slate-200">{event.arenaSpecs}</span>
              </div>
            </div>
          </div>

          {/* Bot Specifications */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-[#00E5FF] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Machine Constraints & Weight Specs
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 bg-slate-900/50 p-3.5 rounded-lg border border-slate-800">
              {event.botSpecs}
            </p>
          </div>

          {/* Tournament Rounds */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Tournament Progression
            </h4>
            <div className="space-y-2">
              {event.rounds.map((round, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 p-2.5 rounded bg-slate-900/40 border border-slate-800/50"
                >
                  <span className="font-mono text-[#00E5FF] font-bold shrink-0">0{idx + 1}.</span>
                  <span>{round}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Rules */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Key Arena Regulations
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-300 marker:text-[#00E5FF]">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="leading-relaxed">
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Coordinator Contact */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>
                Event Head: <strong className="text-slate-200">{event.coordinator.name}</strong> ({event.coordinator.contact})
              </span>
            </div>
            <span className="text-[11px] text-slate-400">ROBOTiX Technical Council</span>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-950 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectForRegistration(event.id);
              onClose();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#070b14] bg-[#FF9F1C] hover:bg-[#ffb042] rounded-md transition-colors shadow-md shadow-[#FF9F1C]/25"
          >
            <span>Register For This Event</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
