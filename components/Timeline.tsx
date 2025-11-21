import React, { useMemo } from 'react';
import { LaunchEvent } from '../types';
import { Rocket } from 'lucide-react';

interface TimelineProps {
  events: LaunchEvent[];
  onEventClick?: (event: LaunchEvent) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onEventClick }) => {
  
  // Filter and Sort Logic
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return events
      .filter(e => {
        // Ensure event is in the future (simple day comparison)
        const eventDate = new Date(e.date);
        return eventDate >= now;
      })
      .sort((a, b) => {
        // Sort Ascending (Soonest first)
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [events]);

  // Helper to format date beautifully
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();
    return { day, month, year };
  };

  return (
    <div className="py-8 sm:py-12 px-2 sm:px-4 max-w-5xl mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-mono font-bold text-center text-white mb-12 sm:mb-16 relative inline-block left-1/2 -translate-x-1/2 group cursor-default">
        <span className="relative z-10 flex items-center gap-3">
          <Rocket className="text-cyan-500 animate-pulse" size={24} />
          UPCOMING LAUNCHES
        </span>
        <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent group-hover:h-[2px] transition-all"></span>
      </h2>

      {upcomingEvents.length === 0 ? (
         <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
            <p className="text-gray-500 font-mono">NO UPCOMING LAUNCHES DETECTED IN TIMELINE.</p>
         </div>
      ) : (
      <div className="relative">
        {/* Central Line - DESKTOP ONLY */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/50 to-transparent -ml-px"></div>

        {/* Left Line - MOBILE ONLY */}
        <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/50 to-transparent"></div>

        <div className="space-y-12 md:space-y-24 pb-12">
          {upcomingEvents.map((event, index) => {
            const isLeft = index % 2 === 0;
            const { day, month, year } = formatDate(event.date);

            return (
              <div 
                key={event.id} 
                onClick={() => onEventClick && onEventClick(event)}
                className={`relative flex flex-col md:flex-row items-start md:items-center cursor-pointer ${isLeft ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Mobile Date Badge (Visible on Small Screens) */}
                <div className="md:hidden pl-12 mb-2 flex items-center gap-3">
                    <span className="text-cyan-400 font-black text-xl">{day}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{month} {year}</span>
                    {/* Dot on line */}
                    <div className="absolute left-3 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
                </div>

                {/* Content Card */}
                <div className={`w-full pl-12 md:pl-0 md:w-[calc(50%-4rem)] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <div className="group relative bg-dark-800 border border-white/10 p-6 rounded-2xl hover:border-cyan-500/40 transition-all duration-500 hover:bg-white/5 overflow-hidden hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transform hover:-translate-y-1">
                    {/* Animated Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-500 uppercase">
                          {event.company}
                        </span>
                        <span className="px-2 py-1 bg-black/50 border border-white/10 text-[9px] uppercase font-bold text-gray-400 rounded">
                            {event.type}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors">
                        {event.productName}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed font-light">
                        {event.description}
                      </p>
                      
                      <div className="mt-4 text-[10px] text-gray-500 font-mono group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                        TAP FOR DETAILS <Rocket size={10} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Date Badge (Center - Visible on MD+) */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-20">
                   <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-black border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:border-cyan-500/50 transition-all relative overflow-hidden hover:scale-110 duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                      <span className="text-[10px] font-bold text-cyan-500 tracking-widest uppercase mb-1">{month}</span>
                      <span className="text-3xl font-black text-white leading-none">{day}</span>
                      <span className="text-[9px] text-gray-500 mt-1">{year}</span>
                   </div>
                </div>

                {/* Empty Space for Desktop Balance */}
                <div className="hidden md:block w-[calc(50%-4rem)]"></div>
              </div>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
};

export default Timeline;