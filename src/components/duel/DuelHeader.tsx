import React from 'react';
import { Crown, Clock, Users, DollarSign } from 'lucide-react';

interface DuelHeaderProps {
  duel: any;
}

export const DuelHeader: React.FC<DuelHeaderProps> = ({ duel }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'ACTIVE': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'RESOLVED': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Duel #{duel.id}</h1>
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(duel.status)}`}>
                {duel.status}
              </div>
            </div>
          </div>

          {duel.resolved && duel.winner && (
            <div className="flex items-center space-x-2 text-green-400">
              <Crown className="w-5 h-5" />
              <span className="font-semibold">
                Winner: {duel.winner.slice(0, 6)}...{duel.winner.slice(-4)}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:text-right">
          <div>
            <div className="text-gray-400 text-sm">Prize Pool</div>
            <div className="text-2xl font-bold text-green-400">
              {(parseFloat(duel.wagerAmount) * 2).toFixed(2)} Tokens
            </div>
          </div>
          
          <div>
            <div className="text-gray-400 text-sm">Duration</div>
            <div className="text-xl font-semibold text-white">
              {Math.floor(duel.duration / 3600)}h
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};