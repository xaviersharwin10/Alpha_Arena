import React, { useState } from 'react';
import { ArrowLeftRight, TrendingUp, Zap } from 'lucide-react';
import { SwapModal } from './SwapModal';

interface TradingInterfaceProps {
  duel: any;
  onOpenSwapModal: () => void;
}

export const TradingInterface: React.FC<TradingInterfaceProps> = ({ duel, onOpenSwapModal }) => {
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Trading Interface</h2>
        <div className="flex items-center space-x-2 text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live Trading</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={onOpenSwapModal}
          className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 rounded-lg hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 group"
        >
          <div className="flex items-center space-x-3">
            <ArrowLeftRight className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-white font-semibold">Quick Swap</div>
              <div className="text-gray-400 text-sm">Trade tokens instantly</div>
            </div>
          </div>
        </button>

        <button className="p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-600/30 rounded-lg hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-300 group">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-white font-semibold">Market Analysis</div>
              <div className="text-gray-400 text-sm">View market trends</div>
            </div>
          </div>
        </button>

        <button className="p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-600/30 rounded-lg hover:from-orange-600/30 hover:to-red-600/30 transition-all duration-300 group">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-white font-semibold">Flash Trade</div>
              <div className="text-gray-400 text-sm">Execute quick trades</div>
            </div>
          </div>
        </button>
      </div>

      {/* Trading Stats */}
      <div className="bg-gray-900/50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Your Trading Session</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">8</div>
            <div className="text-gray-400 text-sm">Trades Made</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">$12,340</div>
            <div className="text-gray-400 text-sm">Volume</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">+12.3%</div>
            <div className="text-gray-400 text-sm">Current P&L</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">$0.45</div>
            <div className="text-gray-400 text-sm">Avg Gas</div>
          </div>
        </div>
      </div>

      {/* Swap Modal */}
      <SwapModal
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
      />
    </div>
  );
};