import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface MemoryCardProps {
  icon: LucideIcon;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  color: string;
}

export function MemoryCard({ icon: Icon, label, isFlipped, isMatched, onClick, color }: MemoryCardProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isFlipped || isMatched}
      className="relative aspect-square w-full"
      whileHover={{ scale: isFlipped || isMatched ? 1 : 1.05 }}
      whileTap={{ scale: isFlipped || isMatched ? 1 : 0.95 }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
      >
        {/* Card Back */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center border-4 border-purple-400/50 shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-6xl opacity-30">?</div>
        </div>

        {/* Card Front */}
        <div
          className={`absolute inset-0 ${color} rounded-2xl flex flex-col items-center justify-center border-4 shadow-lg ${
            isMatched ? 'border-green-400' : 'border-white/30'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <Icon className="w-12 h-12 md:w-16 md:h-16 text-white mb-2" />
          <span className="text-xs md:text-sm text-white font-medium text-center px-2">{label}</span>
        </div>
      </motion.div>
    </motion.button>
  );
}
