import { motion } from 'motion/react';
import { Mail, MapPin, Calendar, Github, Linkedin, Twitter, Instagram, Globe } from 'lucide-react';

export function HTNFooter() {
  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: '#', color: '#06b6d4' },
    { icon: Instagram, label: 'Instagram', href: '#', color: '#ec4899' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: '#a855f7' },
    { icon: Github, label: 'GitHub', href: '#', color: '#f59e0b' },
  ];

  const quickLinks = [
    { title: 'Events', href: '#' },
    { title: 'Schedule', href: '#' },
    { title: 'Sponsors', href: '#' },
    { title: 'Team', href: '#' },
  ];

  const resources = [
    { title: 'FAQ', href: '#' },
    { title: 'Code of Conduct', href: '#' },
    { title: 'Privacy Policy', href: '#' },
    { title: 'Terms of Service', href: '#' },
  ];

  return (
    <footer className="relative mt-24 border-t border-white/5 bg-[#0b0e14]/95 backdrop-blur-xl overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-[-50%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-[-40%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#a855f7]/20 to-[#ec4899]/20 border border-[#a855f7]/30 hover:border-[#a855f7]/60 transition-all group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4 text-[#a855f7]" />
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                Visit Website
              </span>
            </motion.a>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#a855f7] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <motion.span
                      className="w-1 h-1 rounded-full bg-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <motion.li
                  key={link.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#06b6d4] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <motion.span
                      className="w-1 h-1 rounded-full bg-[#06b6d4] opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4 text-white">Get in Touch</h3>
            <div className="space-y-4">
              <motion.a
                href="mailto:hello@hackthenorth.com"
                className="flex items-start gap-3 text-gray-400 hover:text-[#ec4899] transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Email</p>
                  <p className="text-xs">hello@hackthenorth.com</p>
                </div>
              </motion.a>
              <motion.div
                className="flex items-start gap-3 text-gray-400 group"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-300">Location</p>
                  <p className="text-xs">Waterloo, ON, Canada</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start gap-3 text-gray-400 group"
                whileHover={{ x: 5 }}
              >
                <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-300">Event Date</p>
                  <p className="text-xs">September 2026</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group relative overflow-hidden"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at center, ${social.color}20, transparent)`,
                  }}
                />
                <social.icon className="w-5 h-5 relative z-10" style={{ color: social.color }} />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            2026 Hack the North. All rights reserved.
          </motion.p>

          {/* Made with love */}
          <motion.p
            className="text-sm text-gray-500 flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            Made with{' '}
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-[#ec4899]"
            >
              ♥
            </motion.span>{' '}
            by julie
          </motion.p>
        </div>
      </div>

      {/* Bottom gradient line */}
      <motion.div
        className="h-1 bg-gradient-to-r from-[#06b6d4] via-[#a855f7] to-[#ec4899]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
    </footer>
  );
}
