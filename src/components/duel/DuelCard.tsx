import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, DollarSign, Target } from 'lucide-react';

interface DuelCardProps {
  duel: any;
}

export const DuelCard: React.FC<DuelCardProps> = ({ duel }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'text-yellow-400 bg-yellow-400/10';
      case 'ACTIVE': return 'text-green-400 bg-green-400/10';
      case 'RESOLVED': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const timeRemaining = duel.endTime ? Math.max(0, duel.endTime - Math.floor(Date.now() / 1000)) : 0;
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-red-500/30 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-red-400" />
          <span className="text-lg font-bold text-white">Duel #{duel.id}</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(duel.status)}`}>
          {duel.status}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Prize Pool:</span>
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-white font-semibold">
              {(parseFloat(duel.wagerAmount) * 2).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">Players:</span>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-white">
                {!duel.opponent || duel.opponent.startsWith('0x000') ? '1/2' : '2/2'}
            </span>
          </div>
        </div>

        {duel.status === 'ACTIVE' && (
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Time Left:</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-orange-400" />
              <span className="text-white">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <Link
        to={`/duel/${duel.id}`}
        className="w-full py-3 bg-gradient-to-r from-red-600/20 to-orange-500/20 border border-red-600/30 text-red-400 rounded-lg hover:from-red-600/30 hover:to-orange-500/30 hover:border-red-500/50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:text-red-300"
      >
        <span>View Details</span>
      </Link>
    </div>
  );
};