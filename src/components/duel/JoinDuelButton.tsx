import React from 'react';
import { useAccount } from 'wagmi';
import { Sword, Loader2, CheckCircle } from 'lucide-react';
import { useJoinDuel } from '../../hooks/useJoinDuel';
import { useDuel } from '../../hooks/useDuel';

interface JoinDuelButtonProps {
  duelId: number;
}

export const JoinDuelButton: React.FC<JoinDuelButtonProps> = ({ duelId }) => {
  const { address } = useAccount();
  const { data: duel } = useDuel(duelId);
  const joinDuel = useJoinDuel();

  const handleJoinDuel = async () => {
    if (!address || !duel || duel.creator.toLowerCase() === address.toLowerCase()) return;
    
    try {
      console.log('Attempting to join duel:', { duelId, duel });
      await joinDuel.mutateAsync({ duelId, duel });
    } catch (error) {
      console.error('Join duel error:', error);
    }
  };

  // NEW: Don't render if duel data not loaded
  if (!duel) {
    return (
      <div className="w-full py-3 bg-gray-700 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-600 rounded mx-auto w-24"></div>
      </div>
    );
  }

  // Don't show join button if user is the creator
  if (!address || duel.creator.toLowerCase() === address.toLowerCase()) {
    return null;
  }

  // Don't show if duel is not open
  if (duel.status !== 'OPEN') {
    return null;
  }

  return (
    <button
      onClick={handleJoinDuel}
      disabled={joinDuel.isPending}
      className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
        joinDuel.isSuccess
          ? 'bg-green-600/20 border border-green-600/30 text-green-400'
          : 'bg-gradient-to-r from-red-600/20 to-orange-500/20 border border-red-600/30 text-red-400 hover:from-red-600/30 hover:to-orange-500/30 hover:border-red-500/50'
      }`}
    >
      {joinDuel.isPending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Approving & Joining...</span>
        </>
      ) : joinDuel.isSuccess ? (
        <>
          <CheckCircle className="w-4 h-4" />
          <span>Joined Successfully!</span>
        </>
      ) : (
        <>
          <Sword className="w-4 h-4" />
          <span>Join Duel</span>
        </>
      )}
    </button>
  );
};