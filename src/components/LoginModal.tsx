import { useState } from 'react';
import { motion } from 'motion/react';
import { X, User, Lock, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (username: string, password: string) => boolean;
}

export function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
      >
        <div className="bg-[#0f1117]/95 border border-white/10 rounded-2xl p-8 backdrop-blur-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#a855f7] rounded-full blur-[120px] opacity-10 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ec4899] rounded-full blur-[120px] opacity-10 pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-all border border-white/10 hover:border-[#a855f7]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8 relative z-10">
            <motion.div
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.4)',
                  '0 0 40px rgba(168, 85, 247, 0.6)',
                  '0 0 20px rgba(168, 85, 247, 0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <User className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Sign in to access private events
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#a855f7]/50 focus:bg-white/10 transition-all text-white placeholder-gray-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#a855f7]/50 focus:bg-white/10 transition-all text-white placeholder-gray-500"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-xl font-medium hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 relative group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              <span className="relative z-10">Sign In</span>
            </motion.button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-6 relative z-10">
            Hint: username is "hacker", password is "htn2026"
          </p>
        </div>
      </motion.div>
    </>
  );
}
