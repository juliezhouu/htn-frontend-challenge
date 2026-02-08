import { Calendar, MapPin, Clock, Users, ArrowRight, GripVertical } from 'lucide-react';
import { motion } from 'motion/react';
import { Event } from './types';

interface EventCardProps {
  event: Event;
  onViewDetails: () => void;
  isLast: boolean;
  dragHandleProps?: Record<string, unknown>;
  isDragging?: boolean;
}

export function EventCard({ event, onViewDetails, isLast, dragHandleProps, isDragging }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group relative overflow-hidden ${isLast ? '' : 'border-b border-white/5'}`}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.06), transparent 40%)',
        }}
      />

      <div className={`relative flex items-center gap-4 p-6 ${isDragging ? 'bg-[#1a1a2e]' : ''}`}>
        {dragHandleProps && (
          <div
            {...dragHandleProps}
            className="flex-shrink-0 p-2 cursor-grab active:cursor-grabbing text-gray-500 hover:text-[#a855f7] transition-colors touch-none"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="w-5 h-5" />
          </div>
        )}

        <div className="flex items-center gap-6 flex-1 cursor-pointer" onClick={onViewDetails}>
          <motion.div
            className="relative flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-24 h-24 object-cover rounded-lg relative z-10 ring-1 ring-white/10 group-hover:ring-[#a855f7]/50 transition-all duration-300"
            />
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-xl font-medium group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#06b6d4] group-hover:via-[#a855f7] group-hover:to-[#ec4899] group-hover:bg-clip-text transition-all duration-300">
                {event.title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                {event.permission === 'private' && (
                  <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs text-red-300">
                    Private
                  </span>
                )}
                <span className="px-3 py-1 bg-gradient-to-r from-[#a855f7]/20 to-[#ec4899]/20 border border-[#a855f7]/30 rounded-full text-sm">
                  {event.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#06b6d4]" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#a855f7]" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ec4899]" />
                <span>{event.location}</span>
              </div>
              {event.speakers && event.speakers.length > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#f59e0b]" />
                  <span>{event.speakers.length} speaker{event.speakers.length > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>

          <motion.div
            className="flex-shrink-0 text-gray-500 group-hover:text-[#a855f7] transition-colors duration-300"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
