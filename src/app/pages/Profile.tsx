import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { Trophy, TrendingUp, BarChart3, Calendar, ArrowLeft, Award } from 'lucide-react';

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const averageScore =
    user.scores.length > 0
      ? Math.round(user.scores.reduce((sum, score) => sum + score, 0) / user.scores.length)
      : 0;

  const recentScores = [...user.scores].reverse().slice(0, 10);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/game')}
            className="flex items-center gap-2 text-purple-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Game
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Player Profile</h1>
          <p className="text-purple-200 text-lg">Track your progress and achievements</p>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-8 mb-8 border border-purple-400/50"
        >
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold text-white border-4 border-white/30">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{user.username}</h2>
              <p className="text-purple-100">Educational Gamer</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-purple-200 text-sm">High Score</div>
                <div className="text-3xl font-bold text-white">{user.highScore}</div>
              </div>
            </div>
            <div className="text-purple-300 text-sm">Your best performance</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-purple-200 text-sm">Average Score</div>
                <div className="text-3xl font-bold text-white">{averageScore}</div>
              </div>
            </div>
            <div className="text-purple-300 text-sm">Across all games</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-purple-200 text-sm">Games Played</div>
                <div className="text-3xl font-bold text-white">{user.scores.length}</div>
              </div>
            </div>
            <div className="text-purple-300 text-sm">Total matches</div>
          </div>
        </motion.div>

        {/* Recent Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">Recent Scores</h2>
          </div>

          {recentScores.length > 0 ? (
            <div className="space-y-2">
              {recentScores.map((score, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center justify-between bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-purple-300 font-bold">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Game {user.scores.length - index}</div>
                      <div className="text-purple-300 text-sm">Recent match</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {score === user.highScore && (
                      <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg text-sm font-medium">
                        <Award className="w-4 h-4" />
                        Best
                      </div>
                    )}
                    <div className="text-2xl font-bold text-white">{score}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-300" />
              </div>
              <p className="text-purple-200 mb-2">No games played yet</p>
              <p className="text-purple-300 text-sm">Start playing to see your scores here!</p>
              <button
                onClick={() => navigate('/game')}
                className="mt-6 bg-purple-500 hover:bg-purple-600 active:scale-95 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
              >
                Play Your First Game
              </button>
            </div>
          )}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">Achievements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl border-2 ${
                user.scores.length >= 1
                  ? 'bg-green-500/10 border-green-500/50'
                  : 'bg-white/5 border-white/10 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    user.scores.length >= 1 ? 'bg-green-500/20' : 'bg-white/10'
                  }`}
                >
                  <Trophy className={`w-5 h-5 ${user.scores.length >= 1 ? 'text-green-400' : 'text-gray-400'}`} />
                </div>
                <div>
                  <div className="text-white font-semibold">First Match</div>
                  <div className="text-sm text-purple-300">Complete your first game</div>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border-2 ${
                user.scores.length >= 10
                  ? 'bg-green-500/10 border-green-500/50'
                  : 'bg-white/5 border-white/10 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    user.scores.length >= 10 ? 'bg-green-500/20' : 'bg-white/10'
                  }`}
                >
                  <BarChart3
                    className={`w-5 h-5 ${user.scores.length >= 10 ? 'text-green-400' : 'text-gray-400'}`}
                  />
                </div>
                <div>
                  <div className="text-white font-semibold">Dedicated Learner</div>
                  <div className="text-sm text-purple-300">Play 10 games</div>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border-2 ${
                user.highScore >= 800
                  ? 'bg-green-500/10 border-green-500/50'
                  : 'bg-white/5 border-white/10 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    user.highScore >= 800 ? 'bg-green-500/20' : 'bg-white/10'
                  }`}
                >
                  <Award className={`w-5 h-5 ${user.highScore >= 800 ? 'text-green-400' : 'text-gray-400'}`} />
                </div>
                <div>
                  <div className="text-white font-semibold">High Achiever</div>
                  <div className="text-sm text-purple-300">Score 800+ points</div>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border-2 ${
                user.highScore >= 950
                  ? 'bg-green-500/10 border-green-500/50'
                  : 'bg-white/5 border-white/10 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    user.highScore >= 950 ? 'bg-green-500/20' : 'bg-white/10'
                  }`}
                >
                  <TrendingUp
                    className={`w-5 h-5 ${user.highScore >= 950 ? 'text-green-400' : 'text-gray-400'}`}
                  />
                </div>
                <div>
                  <div className="text-white font-semibold">CS Master</div>
                  <div className="text-sm text-purple-300">Score 950+ points</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
