import { motion } from 'motion/react';

interface StaggeredFadeTextProps {
  text: string;
  className?: string;
}

export function StaggeredFadeText({ text, className = '' }: StaggeredFadeTextProps) {
  const words = text.split(' ');

  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.02,
            ease: 'easeOut',
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
