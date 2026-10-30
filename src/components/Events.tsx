import React, { useState } from 'react';
import { ChevronRight, Zap } from 'lucide-react';
import { RobotEvent, EventCategory } from '../types';
import { ROBOT_EVENTS } from '../data/events';
import { EventModal } from './EventModal';

interface EventsProps {
  onSelectEventForRegistration: (eventId: string) => void;
}

const CATEGORIES: EventCategory[] = ['All', 'Autonomous', 'Combat', 'Design'];

export const Events: React.FC<EventsProps> = ({ onSelectEventForRegistration }) => {
  const [activeCategory, setActiveCategory] = useState<EventCategory>('All');
  const [selectedEvent, setSelectedEvent] = useState<RobotEvent | null>(null);

  const filteredEvents = ROBOT_EVENTS.filter((evt) => {
    if (activeCategory === 'All') return true;
    return evt.category === activeCategory;
  });

  return (
    <section id="events" className="py-24 relative bg-[#070b14] overflow-hidden">
      {/* Subtle blueprint grid overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Flex Row for Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#00E5FF] font-semibold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00E5FF]" />
              <span>Competition Roster</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Featured Arenas & Challenges
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Choose your competitive track. From high-impact combat skirmishes to precision
              microsecond autonomous sprints.
            </p>
          </div>

          {/* Interactive Filter Bar */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
                    isActive
                      ? 'bg-[#00E5FF] text-[#070b14] shadow-md shadow-[#00E5FF]/20 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  aria-pressed={isActive}
                >
                  {category}
                  {category === 'All' && ` (${ROBOT_EVENTS.length})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <article
              key={event.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-[#00E5FF]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#00E5FF]/10 flex flex-col group relative"
            >
              {/* Event Card Visual Slot */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 border-b border-slate-800">
                <img
                  src={event.image}
                  alt={`${event.title} arena battle at Robofest NIT Raipur`}
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Category Tag Overlay */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#00E5FF] px-2.5 py-1 rounded bg-slate-950/90 border border-[#00E5FF]/30 backdrop-blur-md">
                    {event.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="text-xs font-mono font-bold text-[#FF9F1C] bg-slate-950/90 px-3 py-1 rounded border border-[#FF9F1C]/40 backdrop-blur-md">
                    {event.prize}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                    {event.shortDescription}
                  </p>
                </div>

                {/* Highlight spec line */}
                <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 font-mono">
                  {event.highlight}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00E5FF] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5FF] py-1.5"
                  >
                    <span>View Arena Details</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectEventForRegistration(event.id)}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-200 bg-slate-800/80 hover:bg-[#FF9F1C] hover:text-[#070b14] border border-slate-700 hover:border-[#FF9F1C] rounded-md transition-all duration-200"
                  >
                    Select Event
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSelectForRegistration={(id) => {
            onSelectEventForRegistration(id);
            setSelectedEvent(null);
          }}
        />
      )}
    </section>
  );
};
