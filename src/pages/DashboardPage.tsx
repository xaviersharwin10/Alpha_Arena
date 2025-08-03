import React from 'react';
import { useAccount } from 'wagmi';
import { Trophy, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { useDuels } from '../hooks/useDuels';

export const DashboardPage: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: allDuels } = useDuels();

  if (!isConnected) {
    return (
      <div className="text-center py-16">
        <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Connect Wallet Required</h2>
        <p className="text-gray-400">Please connect your wallet to view your dashboard</p>
      </div>
    );
  }

  const myDuels = allDuels?.filter(duel => 
    duel.creator.toLowerCase() === address?.toLowerCase() ||
    duel.opponent?.toLowerCase() === address?.toLowerCase()
  ) || [];

  const stats = {
    total: myDuels.length,
    won: myDuels.filter(d => d.winner?.toLowerCase() === address?.toLowerCase()).length,
    active: myDuels.filter(d => d.status === 'ACTIVE').length,
    winRate: myDuels.length > 0 ? (myDuels.filter(d => d.winner?.toLowerCase() === address?.toLowerCase()).length / myDuels.filter(d => d.resolved).length * 100) || 0 : 0
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Trading Dashboard
        </h1>
        <p className="text-xl text-gray-400">
          Track your dueling performance and statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <div className="text-gray-400">Total Duels</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{stats.won}</span>
          </div>
          <div className="text-gray-400">Duels Won</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.active}</span>
          </div>
          <div className="text-gray-400">Active Duels</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">{stats.winRate.toFixed(1)}%</span>
          </div>
          <div className="text-gray-400">Win Rate</div>
        </div>
      </div>

      {/* Recent Duels */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Duels</h2>
        
        {myDuels.length > 0 ? (
          <div className="space-y-4">
            {myDuels.slice(0, 5).map((duel) => (
              <div key={duel.id} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    duel.status === 'ACTIVE' ? 'bg-green-400' :
                    duel.status === 'OPEN' ? 'bg-yellow-400' :
                    duel.status === 'RESOLVED' ? 'bg-blue-400' : 'bg-gray-400'
                  }`}></div>
                  
                  <div>
                    <div className="text-white font-medium">
                      Duel #{duel.id}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {duel.wagerAmount} tokens • {duel.status}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  {duel.resolved && duel.winner && (
                    <div className={`text-sm font-medium ${
                      duel.winner.toLowerCase() === address?.toLowerCase() 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {duel.winner.toLowerCase() === address?.toLowerCase() ? 'Won' : 'Lost'}
                    </div>
                  )}
                  <div className="text-gray-400 text-xs">
                    {new Date(duel.startTime * 1000).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No duels yet. Create your first duel to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};