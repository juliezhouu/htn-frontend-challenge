import { X, Calendar, MapPin, Clock, Users, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Event } from './types';
import { StaggeredFadeText } from './StaggeredFadeText';
import { RelatedEventCard } from './RelatedEventCard';

interface EventDetailViewProps {
  event: Event;
  allEvents: Event[];
  onClose: () => void;
  onEventChange: (eventId: number) => void;
}

export function EventDetailView({ event, allEvents, onClose, onEventChange }: EventDetailViewProps) {
  // Get related events by matching related_events IDs
  const relatedEvents = allEvents.filter(e =>
    event.related_events.includes(e.id) && e.id !== event.id
  ).slice(0, 3);

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-full max-w-2xl bg-[#0b0e14]/95 border-l border-white/10 z-50 overflow-y-auto backdrop-blur-2xl"
      >
        {/* Inner glow effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#a855f7] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

        {/* Sticky close bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-[#0b0e14]/90 backdrop-blur-xl border-b border-white/5">
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all border border-white/10 hover:border-[#a855f7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 relative z-10">

          {/* Event Image */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-lg blur-xl opacity-30"></div>
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-64 object-cover rounded-lg relative z-10 ring-1 ring-white/20"
            />
            {event.permission === 'private' && (
              <span className="absolute top-4 right-4 z-20 px-3 py-1 bg-red-500/80 rounded-full text-sm font-medium">
                Private Event
              </span>
            )}
          </div>

          {/* Event Title */}
          <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{event.title}</h2>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-3 py-1 bg-gradient-to-r from-[#a855f7]/20 to-[#ec4899]/20 border border-[#a855f7]/30 rounded-full text-sm">
              {event.category}
            </span>
          </div>

          {/* Event Meta */}
          <div className="space-y-3 mb-6 text-gray-300">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#06b6d4]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#06b6d4]" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#06b6d4]" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-xl">
            <h3 className="text-xl font-medium mb-3">About this Event</h3>
            <StaggeredFadeText
              text={event.description}
              className="text-gray-300 leading-relaxed"
            />
          </div>

          {/* Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ec4899]" />
                Speakers
              </h3>
              <div className="space-y-4">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center font-semibold shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                      {speaker.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{speaker.name}</div>
                      <div className="text-sm text-gray-400">{speaker.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <div>
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <svg className="w-5 h-5 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                Related Events
              </h3>
              <div className="space-y-3">
                {relatedEvents.map((relatedEvent) => (
                  <RelatedEventCard
                    key={relatedEvent.id}
                    event={relatedEvent}
                    onClick={() => onEventChange(relatedEvent.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-lg font-medium hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 relative group/register">
            <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-lg blur-lg opacity-0 group-hover/register:opacity-50 transition-opacity duration-300"></div>
            <span className="relative z-10">Register for this Event</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}
