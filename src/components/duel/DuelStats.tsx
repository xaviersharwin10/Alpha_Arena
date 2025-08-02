import React from 'react';
import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';

interface DuelStatsProps {
  duel: any;
}

export const DuelStats: React.FC<DuelStatsProps> = ({ duel }) => {
  const timeRemaining = duel.endTime ? Math.max(0, duel.endTime - Math.floor(Date.now() / 1000)) : 0;
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Mock live stats (would come from duel.liveStats in real implementation)
  const liveStats = {
    creator: {
      currentValue: 10234.56,
      pnlPercent: 12.34,
      trades: 8
    },
    opponent: {
      currentValue: 9876.43,
      pnlPercent: -3.21,
      trades: 5
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Live Battle Stats</h2>

      {/* Timer */}
      {duel.status === 'ACTIVE' && (
        <div className="bg-gray-900/50 rounded-lg p-4 mb-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-orange-400" />
            <span className="text-gray-400">Time Remaining</span>
          </div>
          <div className="text-3xl font-bold text-orange-400 font-mono">
            {formatTime(timeRemaining)}
          </div>
        </div>
      )}

      {/* Player Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Creator */}
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-blue-400">Creator</h3>
            <div className="text-xs text-gray-400">
              {duel.creator.slice(0, 6)}...{duel.creator.slice(-4)}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Portfolio Value:</span>
              <span className="text-white font-medium">
                ${liveStats.creator.currentValue.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">P&L:</span>
              <div className={`flex items-center space-x-1 ${liveStats.creator.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {liveStats.creator.pnlPercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-medium">
                  {liveStats.creator.pnlPercent >= 0 ? '+' : ''}{liveStats.creator.pnlPercent.toFixed(2)}%
                </span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Trades:</span>
              <span className="text-white font-medium">{liveStats.creator.trades}</span>
            </div>
          </div>
        </div>

        {/* Opponent */}
        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-red-400">Opponent</h3>
            <div className="text-xs text-gray-400">
              {duel.opponent ? `${duel.opponent.slice(0, 6)}...${duel.opponent.slice(-4)}` : 'Waiting...'}
            </div>
          </div>
          
          {duel.opponent ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Portfolio Value:</span>
                <span className="text-white font-medium">
                  ${liveStats.opponent.currentValue.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">P&L:</span>
                <div className={`flex items-center space-x-1 ${liveStats.opponent.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {liveStats.opponent.pnlPercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="font-medium">
                    {liveStats.opponent.pnlPercent >= 0 ? '+' : ''}{liveStats.opponent.pnlPercent.toFixed(2)}%
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Trades:</span>
                <span className="text-white font-medium">{liveStats.opponent.trades}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-400">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div>Waiting for opponent...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};