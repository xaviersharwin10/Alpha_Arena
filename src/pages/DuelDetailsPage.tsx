import React from 'react';
import { useParams } from 'react-router-dom';
import { useDuel } from '../hooks/useDuel';
import { DuelHeader } from '../components/duel/DuelHeader';
import { DuelStats } from '../components/duel/DuelStats';
import { TradingInterface } from '../components/trading/TradingInterface';
import { DuelTimeline } from '../components/duel/DuelTimeline';

export const DuelDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const duelId = parseInt(id || '0');
  const { data: duel, isLoading, error } = useDuel(duelId);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="bg-gray-800/50 rounded-xl p-8 animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !duel) {
    return (
      <div className="text-center py-16">
        <div className="text-red-400 text-xl mb-2">Duel Not Found</div>
        <div className="text-gray-400">The duel you're looking for doesn't exist</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DuelHeader duel={duel} />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DuelStats duel={duel} />
          
          {duel.status === 'ACTIVE' && (
            <TradingInterface duel={duel} />
          )}
        </div>
        
        <div className="space-y-8">
          <DuelTimeline duel={duel} />
        </div>
      </div>
    </div>
  );
};