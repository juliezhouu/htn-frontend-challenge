import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { Event } from './types';

interface RelatedEventCardProps {
  event: Event;
  onClick: () => void;
}

export function RelatedEventCard({ event, onClick }: RelatedEventCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-[#a855f7] hover:bg-white/10 transition-all duration-300 cursor-pointer backdrop-blur-xl group/related relative overflow-hidden"
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover/related:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))',
        }}
      />

      <div className="relative z-10 flex gap-4 w-full">
        <div className="relative flex-shrink-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-lg blur opacity-0 group-hover/related:opacity-30 transition-opacity duration-300"
          />
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-20 h-20 object-cover rounded-lg relative z-10 ring-1 ring-white/10"
          />
        </div>
        <div className="flex-1 min-w-0">
          <motion.h4
            className="font-medium mb-1 truncate group-hover/related:text-transparent group-hover/related:bg-gradient-to-r group-hover/related:from-[#a855f7] group-hover/related:to-[#ec4899] group-hover/related:bg-clip-text transition-all duration-300"
          >
            {event.title}
          </motion.h4>
          <div className="text-sm text-gray-400 flex items-center gap-2 mb-1">
            <Calendar className="w-3 h-3 text-[#06b6d4]" />
            {event.date}
          </div>
          <div className="text-xs text-gray-500">
            {event.location}
          </div>
        </div>

        <motion.div
          className="flex items-center opacity-0 group-hover/related:opacity-100 transition-opacity duration-300"
          animate={{
            x: [0, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            className="w-5 h-5 text-[#a855f7]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
