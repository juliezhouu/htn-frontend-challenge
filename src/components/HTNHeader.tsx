import { motion } from 'motion/react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import htnLogo from '../assets/images/logo-htn.png';

interface HTNHeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export function HTNHeader({ isLoggedIn, onLogin, onLogout }: HTNHeaderProps) {
  return (
    <header className="border-b border-white/5 bg-[#0b0e14]/95 sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full opacity-0"
                style={{
                  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent 70%)',
                  filter: 'blur(20px)',
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <img src={htnLogo} alt="Hack the North" className="h-10 relative z-10" />
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {['Events', 'Schedule', 'Sponsors', 'Team'].map((item, index) => {
              const gradients = [
                'from-[#06b6d4]/20 to-[#06b6d4]/10',
                'from-[#a855f7]/20 to-[#a855f7]/10',
                'from-[#ec4899]/20 to-[#ec4899]/10',
                'from-[#f59e0b]/20 to-[#f59e0b]/10'
              ];
              const borderColors = [
                'border-[#06b6d4]/30',
                'border-[#a855f7]/30',
                'border-[#ec4899]/30',
                'border-[#f59e0b]/30'
              ];
              const hoverBorders = [
                'hover:border-[#06b6d4]/60',
                'hover:border-[#a855f7]/60',
                'hover:border-[#ec4899]/60',
                'hover:border-[#f59e0b]/60'
              ];
              const textColors = [
                'group-hover:text-[#06b6d4]',
                'group-hover:text-[#a855f7]',
                'group-hover:text-[#ec4899]',
                'group-hover:text-[#f59e0b]'
              ];

              return (
                <motion.a
                  key={item}
                  href="#"
                  className={`relative px-4 py-2 rounded-lg border bg-gradient-to-br ${gradients[index]} ${borderColors[index]} ${hoverBorders[index]} transition-all group`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={`text-sm font-bold text-white ${textColors[index]} transition-colors relative z-10`}>
                    {item}
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at center, ${
                        index === 0 ? 'rgba(6, 182, 212, 0.15)' :
                        index === 1 ? 'rgba(168, 85, 247, 0.15)' :
                        index === 2 ? 'rgba(236, 72, 153, 0.15)' :
                        'rgba(245, 158, 11, 0.15)'
                      }, transparent)`,
                      filter: 'blur(10px)',
                    }}
                  />
                </motion.a>
              );
            })}
          </motion.nav>

          {/* Right Actions */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Notification Bell */}
            <motion.button
              className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#a855f7]/50 transition-all group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-gray-400 group-hover:text-[#a855f7] transition-colors" />
              <motion.span
                className="absolute -top-1 -right-1 w-3 h-3 bg-[#ec4899] rounded-full border-2 border-[#0b0e14]"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.button>

            {/* Profile/Login Button */}
            {isLoggedIn ? (
              <motion.button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#ec4899]/20 to-[#f43f5e]/20 border border-[#ec4899]/30 hover:border-[#ec4899]/60 transition-all group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4 text-[#ec4899] relative z-10" />
                <span className="text-sm font-medium relative z-10">Logout</span>
              </motion.button>
            ) : (
              <motion.button
                onClick={onLogin}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#a855f7]/20 to-[#ec4899]/20 border border-[#a855f7]/30 hover:border-[#a855f7]/60 transition-all group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/0 via-[#a855f7]/20 to-[#a855f7]/0"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <User className="w-4 h-4 text-[#a855f7] relative z-10" />
                <span className="text-sm font-medium relative z-10">Sign In</span>
              </motion.button>
            )}

            {/* Mobile Menu */}
            <motion.button
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-5 h-5 text-gray-400" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      />
    </header>
  );
}
