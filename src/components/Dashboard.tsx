import React, { useState, useEffect } from 'react';

import { Clock, DollarSign, TrendingUp, TrendingDown, Users, Zap, Shield, Timer, Crosshair, Swords, Flame, Target } from 'lucide-react';

 

interface DashboardProps {

  onJoinDuel: (duel: any) => void;

}

 

const Dashboard: React.FC<DashboardProps> = ({ onJoinDuel }) => {

  const [battleAnimation, setBattleAnimation] = useState(false);

 

  useEffect(() => {

    const interval = setInterval(() => {

      setBattleAnimation(true);

      setTimeout(() => setBattleAnimation(false), 1000);

    }, 5000);

    return () => clearInterval(interval);

  }, []);

 

  const activeDuels = [

    {

      id: 1,

      challenger: "CRYPTO_SAMURAI",

      opponent: "DEFI_NINJA",

      stake: 50,

      timeRemaining: "23h 45m",

      challengerPnL: "+12.5%",

      opponentPnL: "+8.2%",

      status: "INTENSE_BATTLE",

      battleRating: "LEGENDARY"

    },

    {

      id: 2,

      challenger: "MOON_HUNTER",

      opponent: "BEAR_SLAYER",

      stake: 100,

      timeRemaining: "11h 22m",

      challengerPnL: "-3.1%",

      opponentPnL: "+15.7%",

      status: "COMEBACK_MODE",

      battleRating: "EPIC"

    }

  ];

 

  const openChallenges = [

    {

      id: 3,

      challenger: "ALPHA_PREDATOR",

      stake: 75,

      duration: "24h",

      reputation: 85,

      winRate: "67%",

      rank: "DIAMOND",

      battleCry: "BRING THE HEAT! 🔥"

    },

    {

      id: 4,

      challenger: "PROFIT_REAPER",

      stake: 200,

      duration: "24h",

      reputation: 92,

      winRate: "73%",

      rank: "MASTER",

      battleCry: "NO MERCY! ⚡"

    },

    {

      id: 5,

      challenger: "DEGEN_WARRIOR",

      stake: 25,

      duration: "24h",

      reputation: 76,

      winRate: "58%",

      rank: "GOLD",

      battleCry: "LET'S GOOO! 🚀"

    }

  ];

 

  const getRankColor = (rank: string) => {

    switch (rank) {

      case 'MASTER': return 'from-purple-500 to-pink-500';

      case 'DIAMOND': return 'from-cyan-400 to-blue-500';

      case 'GOLD': return 'from-yellow-400 to-orange-500';

      default: return 'from-gray-400 to-gray-600';

    }

  };

 

  return (

    <div className="space-y-8">

      {/* Gaming Hero Stats */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="relative group">

          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>

          <div className="relative bg-black/80 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm hover:border-red-400/50 transition-all duration-300">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-red-400 text-sm font-mono tracking-wider">ACTIVE BATTLES</p>

                <p className="text-3xl font-black text-white">24</p>

                <p className="text-xs text-red-300 font-mono">🔥 HEATING UP</p>

              </div>

              <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">

                <Swords className="w-8 h-8 text-white animate-pulse" />

              </div>

            </div>

          </div>

        </div>

 

        <div className="relative group">

          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>

          <div className="relative bg-black/80 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-green-400 text-sm font-mono tracking-wider">PRIZE POOL</p>

                <p className="text-3xl font-black text-white">$1.2M</p>

                <p className="text-xs text-green-300 font-mono">💰 GROWING</p>

              </div>

              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">

                <DollarSign className="w-8 h-8 text-white animate-bounce" />

              </div>

            </div>

          </div>

        </div>

 

        <div className="relative group">

          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>

          <div className="relative bg-black/80 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-cyan-400 text-sm font-mono tracking-wider">TOP ALPHA</p>

                <p className="text-3xl font-black text-white">+45.2%</p>

                <p className="text-xs text-cyan-300 font-mono">🎯 LEGENDARY</p>

              </div>

              <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">

                <Target className="w-8 h-8 text-white animate-spin" />

              </div>

            </div>

          </div>

        </div>

 

        <div className="relative group">

          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>

          <div className="relative bg-black/80 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-purple-400 text-sm font-mono tracking-wider">WARRIORS</p>

                <p className="text-3xl font-black text-white">156</p>

                <p className="text-xs text-purple-300 font-mono">⚔️ ONLINE</p>

              </div>

              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">

                <Users className="w-8 h-8 text-white animate-pulse" />

              </div>

            </div>

          </div>

        </div>

      </div>

 

      {/* Live Battle Arena */}

      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center space-x-4">

            <h2 className="text-3xl font-black text-white">

              <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">

                LIVE BATTLES

              </span>

            </h2>

            <div className="flex items-center space-x-2 bg-red-500/20 border border-red-400/50 rounded-full px-4 py-2">

              <div className="w-3 h-3 bg-red-400 rounded-full animate-ping"></div>

              <span className="text-sm text-red-400 font-mono font-bold">LIVE</span>

            </div>

          </div>

          <div className="text-sm text-gray-400 font-mono">

            <Flame className="w-4 h-4 inline mr-1 text-orange-400" />

            BATTLE INTENSITY: HIGH

          </div>

        </div>

 

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {activeDuels.map((duel) => (

            <div key={duel.id} className="relative group">

              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-cyan-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>

              <div className={`relative bg-black/90 border-2 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 ${

                battleAnimation ? 'border-red-400/80 shadow-lg shadow-red-500/25' : 'border-gray-700/50 hover:border-cyan-500/50'

              }`}>

                

                {/* Battle Header */}

                <div className="flex items-center justify-between mb-4">

                  <div className="flex items-center space-x-3">

                    <div className="relative">

                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">

                        <Crosshair className="w-6 h-6 text-white" />

                      </div>

                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>

                    </div>

                    <div>

                      <div className="flex items-center space-x-2">

                        <span className="font-bold text-white font-mono">{duel.challenger}</span>

                        <span className="text-red-400 font-mono">VS</span>

                        <span className="font-bold text-white font-mono">{duel.opponent}</span>

                      </div>

                      <div className="flex items-center space-x-2 mt-1">

                        <span className={`text-xs px-2 py-1 rounded-full font-mono font-bold ${

                          duel.battleRating === 'LEGENDARY' ? 'bg-yellow-500/20 text-yellow-400' :

                          duel.battleRating === 'EPIC' ? 'bg-purple-500/20 text-purple-400' :

                          'bg-blue-500/20 text-blue-400'

                        }`}>

                          {duel.battleRating}

                        </span>

                        <span className="text-xs text-gray-400 font-mono">{duel.status}</span>

                      </div>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-black text-white">${duel.stake}</p>

                    <p className="text-sm text-gray-400 font-mono">USDC STAKE</p>

                    <div className="flex items-center space-x-1 text-orange-400 mt-1">

                      <Timer className="w-4 h-4" />

                      <span className="text-sm font-mono font-bold">{duel.timeRemaining}</span>

                    </div>

                  </div>

                </div>

 

                {/* Battle Stats */}

                <div className="space-y-3 mb-4">

                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-900/20 to-transparent rounded-lg border border-red-500/20">

                    <div className="flex items-center space-x-2">

                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>

                      <span className="text-gray-300 font-mono">{duel.challenger}</span>

                    </div>

                    <span className={`font-bold font-mono ${duel.challengerPnL.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>

                      {duel.challengerPnL}

                    </span>

                  </div>

                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-900/20 to-transparent rounded-lg border border-blue-500/20">

                    <div className="flex items-center space-x-2">

                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>

                      <span className="text-gray-300 font-mono">{duel.opponent}</span>

                    </div>

                    <span className={`font-bold font-mono ${duel.opponentPnL.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>

                      {duel.opponentPnL}

                    </span>

                  </div>

                </div>

 

                <button

                  onClick={() => onJoinDuel(duel)}

                  className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white font-bold font-mono py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"

                >

                  🎯 SPECTATE BATTLE

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

 

      {/* Challenge Arena */}

      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <h2 className="text-3xl font-black text-white">

            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">

              CHALLENGE ARENA

            </span>

          </h2>

          <div className="text-sm text-gray-400 font-mono">

            <Zap className="w-4 h-4 inline mr-1 text-yellow-400" />

            {openChallenges.length} WARRIORS WAITING

          </div>

        </div>

        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {openChallenges.map((challenge) => (

            <div key={challenge.id} className="relative group">

              <div className={`absolute inset-0 bg-gradient-to-r ${getRankColor(challenge.rank)}/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300`}></div>

              <div className="relative bg-black/90 border border-gray-700/50 hover:border-yellow-400/50 rounded-xl p-6 backdrop-blur-sm transition-all duration-300">

                

                {/* Challenger Header */}

                <div className="flex items-center justify-between mb-4">

                  <div className="flex items-center space-x-3">

                    <div className={`w-12 h-12 bg-gradient-to-r ${getRankColor(challenge.rank)} rounded-lg flex items-center justify-center`}>

                      <Shield className="w-6 h-6 text-white" />

                    </div>

                    <div>

                      <p className="font-bold text-white font-mono">{challenge.challenger}</p>

                      <div className="flex items-center space-x-2">

                        <span className={`text-xs px-2 py-1 rounded-full font-mono font-bold bg-gradient-to-r ${getRankColor(challenge.rank)} text-white`}>

                          {challenge.rank}

                        </span>

                        <span className="text-xs text-gray-400 font-mono">REP: {challenge.reputation}</span>

                      </div>

                    </div>

                  </div>

                </div>

 

                {/* Battle Cry */}

                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">

                  <p className="text-yellow-400 text-sm font-mono font-bold text-center">

                    "{challenge.battleCry}"

                  </p>

                </div>

 

                {/* Challenge Stats */}

                <div className="space-y-3 mb-4">

                  <div className="flex items-center justify-between">

                    <span className="text-gray-400 font-mono">STAKE</span>

                    <span className="font-bold text-white font-mono">${challenge.stake} USDC</span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-gray-400 font-mono">DURATION</span>

                    <span className="font-bold text-white font-mono">{challenge.duration}</span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-gray-400 font-mono">WIN RATE</span>

                    <span className="font-bold text-green-400 font-mono">{challenge.winRate}</span>

                  </div>

                </div>

 

                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold font-mono py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25">

                  ⚔️ ACCEPT CHALLENGE

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

 

export default Dashboard;