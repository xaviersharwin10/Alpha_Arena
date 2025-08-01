import React, { useState } from 'react';
import { User, TrendingUp, Trophy, DollarSign, Target, Calendar, Award, BarChart3, Flame, Swords, Crown, Zap } from 'lucide-react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    username: "CRYPTO_SAMURAI",
    address: "0x1234...5678",
    reputation: 87,
    rank: 12,
    totalDuels: 45,
    duelsWon: 31,
    winRate: 68.9,
    totalPnL: 234.7,
    totalVolume: 67890,
    avgDuelSize: 85,
    longestWinStreak: 8,
    currentStreak: 3,
    title: "DIAMOND WARRIOR",
    battleCry: "HONOR THROUGH COMBAT! ⚔️",
    level: 24,
    xp: 2340,
    nextLevelXp: 2500
  };

  const recentDuels = [
    {
      id: 1,
      opponent: "DEGEN_OVERLORD",
      opponentAddress: "0xABC...DEF",
      stake: 100,
      result: "VICTORY",
      pnl: "+15.2%",
      opponentPnL: "+8.7%",
      date: "2024-01-15",
      duration: "24h",
      battleRating: "EPIC"
    },
    {
      id: 2,
      opponent: "BEAR_SLAYER",
      opponentAddress: "0x123...789",
      stake: 50,
      result: "DEFEAT",
      pnl: "+3.1%",
      opponentPnL: "+12.8%",
      date: "2024-01-14",
      duration: "24h",
      battleRating: "LEGENDARY"
    },
    {
      id: 3,
      opponent: "MOON_HUNTER",
      opponentAddress: "0xGHI...JKL",
      stake: 75,
      result: "VICTORY",
      pnl: "+22.4%",
      opponentPnL: "-5.3%",
      date: "2024-01-13",
      duration: "24h",
      battleRating: "RARE"
    }
  ];

  const achievements = [
    { name: "FIRST BLOOD", description: "Win your first duel", earned: true, rarity: "COMMON", icon: "🩸" },
    { name: "KILLING SPREE", description: "Win 5 duels in a row", earned: true, rarity: "RARE", icon: "🔥" },
    { name: "HIGH ROLLER", description: "Win a duel with 500+ USDC stake", earned: false, rarity: "EPIC", icon: "💎" },
    { name: "CONSISTENCY KING", description: "Maintain 70%+ win rate over 20 duels", earned: false, rarity: "LEGENDARY", icon: "👑" },
    { name: "PROFIT MACHINE", description: "Achieve +100% total P&L", earned: true, rarity: "EPIC", icon: "🤖" },
    { name: "VOLUME WARRIOR", description: "Trade over $50K volume", earned: true, rarity: "RARE", icon: "⚡" },
  ];

  const getReputationColor = (rep: number) => {
    if (rep >= 90) return 'text-yellow-400';
    if (rep >= 80) return 'text-purple-400';
    if (rep >= 70) return 'text-blue-400';
    return 'text-gray-400';
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'LEGENDARY': return 'from-yellow-400 to-orange-400';
      case 'EPIC': return 'from-purple-400 to-pink-400';
      case 'RARE': return 'from-blue-400 to-cyan-400';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Epic Profile Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 rounded-xl blur-lg"></div>
        <div className="relative bg-black/90 border border-purple-500/30 rounded-xl p-8 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8">
            {/* Avatar & Level */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-full flex items-center justify-center p-1">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <Swords className="w-16 h-16 text-purple-400" />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-1 rounded-full font-mono font-black text-sm">
                LVL {userStats.level}
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Crown className="w-4 h-4 text-black" />
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-4">
                <h1 className="text-4xl font-black text-white mb-2 font-mono">{userStats.username}</h1>
                <div className="text-gray-400 font-mono mb-2">{userStats.address}</div>
                <div className={`text-lg font-mono font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent`}>
                  {userStats.title}
                </div>
              </div>

              {/* Battle Cry */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <div className="text-yellow-400 text-sm font-mono font-bold mb-1">BATTLE CRY</div>
                <div className="text-yellow-300 font-mono font-bold text-lg">{userStats.battleCry}</div>
              </div>

              {/* XP Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm font-mono mb-2">
                  <span className="text-gray-400">EXPERIENCE</span>
                  <span className="text-cyan-400">{userStats.xp} / {userStats.nextLevelXp} XP</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(userStats.xp / userStats.nextLevelXp) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-mono">RANK #{userStats.rank}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className={`w-5 h-5 ${getReputationColor(userStats.reputation)}`} />
                  <span className="text-white font-mono">REP: {userStats.reputation}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-400" />
                  <span className="text-white font-mono">{userStats.winRate}% WIN RATE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="text-white font-mono">{userStats.currentStreak} WIN STREAK</span>
                </div>
              </div>
              
              {/* Main Stats Grid  */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-black text-white font-mono">{userStats.totalDuels}</p>
                  <p className="text-sm text-gray-400 font-mono">TOTAL BATTLES</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-green-400 font-mono">{userStats.duelsWon}</p>
                  <p className="text-sm text-gray-400 font-mono">VICTORIES</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-green-400 font-mono">+{userStats.totalPnL}%</p>
                  <p className="text-sm text-gray-400 font-mono">TOTAL P&L</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-white font-mono">${userStats.totalVolume.toLocaleString()}</p>
                  <p className="text-sm text-gray-400 font-mono">VOLUME</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gaming Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-black/80 border border-gray-700/50 rounded-lg p-2 flex space-x-2">
          {[
            { id: 'overview', label: 'COMBAT STATS', icon: BarChart3 },
            { id: 'history', label: 'BATTLE LOG', icon: Calendar },
            { id: 'achievements', label: 'TROPHIES', icon: Award }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-mono font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Combat Metrics */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-lg"></div>
            <div className="relative bg-black/90 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-black text-white mb-6 font-mono">
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  ⚔️ COMBAT METRICS
                </span>
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-900/30 to-transparent rounded-lg border border-red-500/20">
                  <span className="text-gray-400 font-mono">AVG BATTLE SIZE</span>
                  <span className="text-white font-mono font-bold">${userStats.avgDuelSize} USDC</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-900/30 to-transparent rounded-lg border border-green-500/20">
                  <span className="text-gray-400 font-mono">LONGEST KILL STREAK</span>
                  <span className="text-green-400 font-mono font-bold">{userStats.longestWinStreak} VICTORIES</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-900/30 to-transparent rounded-lg border border-orange-500/20">
                  <span className="text-gray-400 font-mono">CURRENT STREAK</span>
                  <span className="text-orange-400 font-mono font-bold">{userStats.currentStreak} WINS</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-900/30 to-transparent rounded-lg border border-blue-500/20">
                  <span className="text-gray-400 font-mono">PERFORMANCE TREND</span>
                  <div className="flex items-center space-x-2 text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-mono font-bold">+2.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Power Stats */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl blur-lg"></div>
            <div className="relative bg-black/90 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-black text-white mb-6 font-mono">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  ⚡ POWER STATS
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg">
                  <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-black text-white font-mono">$2,340</p>
                  <p className="text-sm text-gray-400 font-mono">TOTAL WINNINGS</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg">
                  <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-black text-white font-mono">31</p>
                  <p className="text-sm text-gray-400 font-mono">VICTORIES</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg">
                  <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-black text-white font-mono">87</p>
                  <p className="text-sm text-gray-400 font-mono">REPUTATION</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <p className="text-2xl font-black text-white font-mono">68.9%</p>
                  <p className="text-sm text-gray-400 font-mono">WIN RATE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-black/20 rounded-xl blur-lg"></div>
          <div className="relative bg-black/90 border border-gray-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="p-8 border-b border-gray-700/50">
              <h2 className="text-2xl font-black text-white font-mono">
                <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                  ⚔️ RECENT BATTLES
                </span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="text-left p-6 text-gray-400 font-mono font-bold">DATE</th>
                    <th className="text-left p-6 text-gray-400 font-mono font-bold">OPPONENT</th>
                    <th className="text-center p-6 text-gray-400 font-mono font-bold">STAKE</th>
                    <th className="text-center p-6 text-gray-400 font-mono font-bold">YOUR P&L</th>
                    <th className="text-center p-6 text-gray-400 font-mono font-bold">ENEMY P&L</th>
                    <th className="text-center p-6 text-gray-400 font-mono font-bold">RESULT</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDuels.map((duel) => (
                    <tr key={duel.id} className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-all duration-300">
                      <td className="p-6 text-gray-300 font-mono">{duel.date}</td>
                      <td className="p-6">
                        <div>
                          <div className="text-white font-mono font-bold">{duel.opponent}</div>
                          <div className="text-gray-400 font-mono text-sm">{duel.opponentAddress}</div>
                          <div className={`text-xs font-mono font-bold ${
                            duel.battleRating === 'LEGENDARY' ? 'text-yellow-400' :
                            duel.battleRating === 'EPIC' ? 'text-purple-400' :
                            'text-blue-400'
                          }`}>
                            {duel.battleRating} BATTLE
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-center text-white font-mono font-bold">${duel.stake} USDC</td>
                      <td className="p-6 text-center">
                        <span className={`font-mono font-bold ${duel.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {duel.pnl}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <span className={`font-mono font-bold ${duel.opponentPnL.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {duel.opponentPnL}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <span className={`px-4 py-2 rounded-full font-mono font-black text-sm ${
                          duel.result === 'VICTORY' 
                            ? 'bg-green-600/30 text-green-400 border border-green-500/50' 
                            : 'bg-red-600/30 text-red-400 border border-red-500/50'
                        }`}>
                          {duel.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`relative backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:scale-105 ${
                achievement.earned 
                  ? `border-yellow-400/50 bg-gradient-to-r ${getRarityColor(achievement.rarity)}/10 shadow-lg` 
                  : 'border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50'
              }`}
            >
              {achievement.earned && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-xs">✓</span>
                </div>
              )}
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                  achievement.earned 
                    ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}/20 border border-yellow-400/50` 
                    : 'bg-gray-600/20 text-gray-500 border border-gray-600/50'
                } border-2`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`font-black font-mono ${achievement.earned ? 'text-white' : 'text-gray-400'}`}>
                      {achievement.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded font-mono font-bold bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-mono">{achievement.description}</p>
                  {achievement.earned && (
                    <div className="flex items-center space-x-1 mt-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-yellow-400 font-mono font-bold">UNLOCKED</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
