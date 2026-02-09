import { motion } from 'motion/react';
import { User, LogOut } from 'lucide-react';
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
          {/* Logo */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <img src={htnLogo} alt="Hack the North" className="h-7 md:h-10 relative z-10" />
            </motion.div>
          </motion.div>

          {/* Sign In / Logout */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {isLoggedIn ? (
              <motion.button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#ec4899]/20 to-[#f43f5e]/20 border border-[#ec4899]/30 hover:border-[#ec4899]/60 transition-all cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4 text-[#ec4899]" />
                <span className="text-sm font-medium">Logout</span>
              </motion.button>
            ) : (
              <motion.button
                onClick={onLogin}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#a855f7]/20 to-[#ec4899]/20 border border-[#a855f7]/30 hover:border-[#a855f7]/60 transition-all cursor-pointer relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/0 via-[#a855f7]/20 to-[#a855f7]/0"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <User className="w-4 h-4 text-[#a855f7] relative z-10" />
                <span className="text-sm font-medium relative z-10">Sign In</span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      />
    </header>
  );
}
