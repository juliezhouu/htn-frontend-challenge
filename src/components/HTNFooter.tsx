import { motion } from 'motion/react';
import { Mail, MapPin, Calendar, Globe } from 'lucide-react';

export function HTNFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-[#0b0e14]/95 backdrop-blur-xl overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#06b6d4] to-[#a855f7] bg-clip-text text-transparent">
              Hack the North
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Canada's largest hackathon, bringing together 1,000+ students from around the world to collaborate, innovate, and build the future.
            </p>
            <motion.a
              href="https://hackthenorth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#a855f7]/20 to-[#ec4899]/20 border border-[#a855f7]/30 hover:border-[#a855f7]/60 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4 text-[#a855f7]" />
              <span className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Visit Website
              </span>
            </motion.a>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 text-white">Get in Touch</h3>
            <div className="space-y-4">
              <a
                href="mailto:hello@hackthenorth.com"
                className="flex items-start gap-3 text-gray-400 hover:text-[#ec4899] transition-colors cursor-pointer"
              >
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-300">Email</p>
                  <p className="text-xs">hello@hackthenorth.com</p>
                </div>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-300">Location</p>
                  <p className="text-xs">Waterloo, ON, Canada</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-300">Event Date</p>
                  <p className="text-xs">September 2026</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            2026 Hack the North. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            Made with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[#ec4899]"
            >
              ♥
            </motion.span>{' '}
            by julie
          </p>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-[#06b6d4] via-[#a855f7] to-[#ec4899]" />
    </footer>
  );
}
