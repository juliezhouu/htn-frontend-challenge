import { motion } from 'motion/react';
import { Search, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

import planetImg from '../assets/images/planet.png';
import princeImg from '../assets/images/petitprince-removebg-preview.png';
import moonImg from '../assets/images/moon.jpg';
import starImg from '../assets/images/star.jpg';
import shineImg from '../assets/images/shine.jpg';

// get rid of white background from imgs 
function useTransparentImage(src: string, threshold = 230) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i] > threshold && d[i + 1] > threshold && d[i + 2] > threshold) {
          d[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setDataUrl(canvas.toDataURL());
    };
    img.src = src;
  }, [src, threshold]);
  return dataUrl;
}

interface SpaceHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

export function SpaceHero({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}: SpaceHeroProps) {
  const moonTransparent = useTransparentImage(moonImg);
  const starTransparent = useTransparentImage(starImg);
  const shineTransparent = useTransparentImage(shineImg);

  // generate a small starfield
  const stars = Array.from({ length: 64 }).map((_, i) => {
    const size = Math.random() < 0.8
      ? +(Math.random() * 2 + 1).toFixed(2)
      : +(Math.random() * 3 + 4).toFixed(2);
    const left = +(Math.random() * 100).toFixed(2);
    const top = +(Math.random() * 55).toFixed(2);
    const delay = +(Math.random() * 12).toFixed(2);
    // big stars: slower, steadier glow
    const duration = size > 3 ? +(12 + Math.random() * 6).toFixed(2) : +(4 + Math.random() * 8).toFixed(2);
    const minOpacity = size > 3 ? 0.7 : 0.5;
    const maxOpacity = size > 3 ? 0.9 : 1;
    const opacity = +(minOpacity + Math.random() * (maxOpacity - minOpacity)).toFixed(2);
    return { id: `s-${i}`, size, left, top, delay, duration, opacity, minOpacity, maxOpacity };
  });



  return (
    <div className="relative h-[450px] overflow-hidden bg-gradient-to-b from-[#0b0e14] via-[#1a1525] to-[#0b0e14]">
      {/* gradient orbs */}
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[30%] w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="#a855f7"
              strokeWidth="0.5"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Starfield (sparkling stars) */}
      <div className="starfield z-20">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animationDelay: `${s.delay}s, ${s.delay / 2}s`,
              animationDuration: `${s.duration}s, ${s.duration * 1.6}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* rotating planet + prince appear together */}
      <motion.div
        className="absolute right-[3%] bottom-[5%] z-20 w-[240px] h-[240px] md:w-[300px] md:h-[300px]"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div
          className="w-full h-full"
          style={{ animation: 'spin-slow 40s linear infinite' }}
        >
          <img
            src={planetImg}
            alt=""
            className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]"
          />
        </div>
        {/* prince */}
        <img
          src={princeImg}
          alt="The Little Prince"
          className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[45%] object-contain drop-shadow-[0_0_15px_rgba(255,200,80,0.5)] -scale-x-100"
        />
      </motion.div>

      {/* dangling elements hanging from top */}
      {[
        { img: moonTransparent, left: '8%', width: 80, stringH: 160, delay: 0, anim: 'dangle', dur: '5s' },
        { img: starTransparent, left: '22%', width: 40, stringH: 130, delay: 0.8, anim: 'dangle-alt', dur: '4.5s' },
        { img: shineTransparent, left: '68%', width: 38, stringH: 60, delay: 1.5, anim: 'dangle', dur: '6s' },
        { img: starTransparent, left: '94%', width: 50, stringH: 170, delay: 0.4, anim: 'dangle-alt', dur: '5.5s' },
        { img: shineTransparent, left: '40%', width: 28, stringH: 50, delay: 1.2, anim: 'dangle', dur: '4s' },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute top-0 z-20"
          style={{
            left: item.left,
            transformOrigin: 'top center',
            animation: `${item.anim} ${item.dur} ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: item.delay }}
        >
          {/* glowy string */}
          <div
            className="mx-auto w-[1px]"
            style={{
              height: item.stringH,
              background: 'linear-gradient(to bottom, rgba(168,85,247,0.6), rgba(255,200,80,0.3))',
              boxShadow: '0 0 6px rgba(168,85,247,0.4)',
            }}
          />
          {/* hanging image */}
          {item.img && (
            <img
              src={item.img}
              alt=""
              className="object-contain"
              style={{
                width: item.width,
                filter: 'drop-shadow(0 0 12px rgba(255,200,80,0.5))',
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Content section */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-6xl font-black mb-4 relative inline-block"
            style={{
              textShadow: `
                0 1px 0 #7c3aed,
                0 2px 0 #7c3aed,
                0 3px 0 #6d28d9,
                0 4px 0 #5b21b6,
                0 5px 0 #4c1d95,
                0 6px 0 #3b0764,
                0 7px 0 #2e0555,
                0 8px 0 #1e0340,
                0 12px 20px rgba(0,0,0,.5),
                0 0 30px rgba(168, 85, 247, 0.4)
              `,
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 40%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              transform: 'perspective(400px) rotateX(5deg)',
            }}
            animate={{
              transform: [
                'perspective(400px) rotateX(5deg)',
                'perspective(400px) rotateX(3deg)',
                'perspective(400px) rotateX(5deg)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
Hack the North 2026
          </motion.h1>
          <motion.p
            className="text-lg text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore events, connect with innovators, and shape the future
          </motion.p>
        </motion.div>

        {/* Search and filter section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4 w-full max-w-3xl"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <motion.input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#a855f7]/50 focus:bg-white/10 transition-all backdrop-blur-xl text-white placeholder-gray-500"
              whileFocus={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)',
              }}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none z-10" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-12 pr-8 py-3.5 bg-white/5 border border-white/10 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-[#a855f7]/50 focus:bg-white/10 transition-all backdrop-blur-xl min-w-[200px] text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-[#1a1a1a]">
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Smooth fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#0b0e14] pointer-events-none"></div>
    </div>
  );
}
