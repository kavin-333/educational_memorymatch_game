import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { MemoryCard } from '../components/MemoryCard';
import {
  Code2,
  Cpu,
  Database,
  GitBranch,
  Terminal,
  Binary,
  Network,
  Lock,
  Zap,
  Bug,
  Puzzle,
  Layers,
  Trophy,
  RotateCcw,
  LogOut,
  User,
  Timer,
} from 'lucide-react';

interface Card {
  id: number;
  icon: typeof Code2;
  label: string;
  color: string;
  pairId: number;
}

const cardTemplates = [
  { icon: Code2, label: 'Code', color: 'bg-gradient-to-br from-blue-500 to-blue-700' },
  { icon: Cpu, label: 'CPU', color: 'bg-gradient-to-br from-purple-500 to-purple-700' },
  { icon: Database, label: 'Database', color: 'bg-gradient-to-br from-green-500 to-green-700' },
  { icon: GitBranch, label: 'Git', color: 'bg-gradient-to-br from-orange-500 to-orange-700' },
  { icon: Terminal, label: 'Terminal', color: 'bg-gradient-to-br from-pink-500 to-pink-700' },
  { icon: Binary, label: 'Binary', color: 'bg-gradient-to-br from-cyan-500 to-cyan-700' },
  { icon: Network, label: 'Network', color: 'bg-gradient-to-br from-indigo-500 to-indigo-700' },
  { icon: Lock, label: 'Security', color: 'bg-gradient-to-br from-red-500 to-red-700' },
  { icon: Zap, label: 'Algorithm', color: 'bg-gradient-to-br from-yellow-500 to-yellow-700' },
  { icon: Bug, label: 'Debug', color: 'bg-gradient-to-br from-emerald-500 to-emerald-700' },
  { icon: Puzzle, label: 'Logic', color: 'bg-gradient-to-br from-violet-500 to-violet-700' },
  { icon: Layers, label: 'Stack', color: 'bg-gradient-to-br from-teal-500 to-teal-700' },
];

export function Game() {
  const { user, logout, updateScore } = useAuth();
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      initializeGame();
    }
  }, [user, navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !gameWon) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameWon]);

  const initializeGame = () => {
    const selectedCards = cardTemplates.slice(0, 8);
    const pairs = selectedCards.flatMap((card, index) => [
      { ...card, id: index * 2, pairId: index },
      { ...card, id: index * 2 + 1, pairId: index },
    ]);
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(false);
    setGameWon(false);
  };

  const handleCardClick = (id: number) => {
    if (!isPlaying) setIsPlaying(true);

    if (flippedCards.length === 2) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        const newMatchedPairs = [...matchedPairs, firstCard.pairId];
        setMatchedPairs(newMatchedPairs);
        setFlippedCards([]);

        if (newMatchedPairs.length === 8) {
          setGameWon(true);
          setIsPlaying(false);
          const score = calculateScore();
          updateScore(score);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const calculateScore = () => {
    const baseScore = 1000;
    const timePenalty = time * 2;
    const movePenalty = moves * 10;
    return Math.max(baseScore - timePenalty - movePenalty, 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">CS Memory Match</h1>
            <p className="text-purple-200">Welcome, {user?.username}!</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-xl transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Profile</span>
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-purple-300 mb-1">
              <Timer className="w-4 h-4" />
              <span className="text-sm">Time</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatTime(time)}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-purple-300 mb-1">
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">Moves</span>
            </div>
            <div className="text-2xl font-bold text-white">{moves}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-purple-300 mb-1">
              <Puzzle className="w-4 h-4" />
              <span className="text-sm">Matched</span>
            </div>
            <div className="text-2xl font-bold text-white">{matchedPairs.length}/8</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-purple-300 mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-sm">High Score</span>
            </div>
            <div className="text-2xl font-bold text-white">{user?.highScore || 0}</div>
          </div>
        </motion.div>

        {/* Game Board */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-4 gap-3 md:gap-4 mb-8"
        >
          {cards.map((card) => (
            <MemoryCard
              key={card.id}
              icon={card.icon}
              label={card.label}
              color={card.color}
              isFlipped={flippedCards.includes(card.id)}
              isMatched={matchedPairs.includes(card.pairId)}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </motion.div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <button
            onClick={initializeGame}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 active:scale-95 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            New Game
          </button>
        </div>

        {/* Win Modal */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setGameWon(false)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                transition={{ type: 'spring', damping: 20 }}
                className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-8 max-w-md w-full border-4 border-purple-400"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-6"
                  >
                    <Trophy className="w-10 h-10 text-yellow-900" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-4">Congratulations!</h2>
                  <p className="text-purple-100 mb-6">You completed the game!</p>
                  <div className="space-y-3 mb-8">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-purple-200 text-sm mb-1">Score</div>
                      <div className="text-3xl font-bold text-white">{calculateScore()}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-purple-200 text-sm mb-1">Time</div>
                        <div className="text-xl font-bold text-white">{formatTime(time)}</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-purple-200 text-sm mb-1">Moves</div>
                        <div className="text-xl font-bold text-white">{moves}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setGameWon(false);
                        initializeGame();
                      }}
                      className="flex-1 bg-white hover:bg-gray-100 active:scale-95 text-purple-900 font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                    >
                      Play Again
                    </button>
                    <button
                      onClick={() => navigate('/profile')}
                      className="flex-1 bg-purple-500 hover:bg-purple-600 active:scale-95 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                    >
                      View Scores
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
