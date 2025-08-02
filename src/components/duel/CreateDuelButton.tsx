import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Plus, Loader2 } from 'lucide-react';
import { useCreateDuel } from '../../hooks/useCreateDuel';

interface CreateDuelButtonProps {
  tokenAddress?: string;
  amount: string;
  duration: number;
  disabled?: boolean;
}

export const CreateDuelButton: React.FC<CreateDuelButtonProps> = ({
  tokenAddress,
  amount,
  duration,
  disabled,
}) => {
  const { address } = useAccount();
  const [isCreating, setIsCreating] = useState(false);
  const createDuel = useCreateDuel();

  const handleCreate = async () => {
    if (!tokenAddress || !amount || !address) return;

    setIsCreating(true);
    try {
      await createDuel.mutateAsync({
        tokenAddress,
        amount,
        duration,
      });
    } catch (error) {
      console.error('Failed to create duel:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <button
      onClick={handleCreate}
      disabled={disabled || isCreating}
      className={`w-full py-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${
        disabled || isCreating
          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-500 hover:to-orange-400 shadow-lg shadow-red-600/25'
      }`}
    >
      {isCreating ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Creating Duel...</span>
        </>
      ) : (
        <>
          <Plus className="w-5 h-5" />
          <span>Create Duel</span>
        </>
      )}
    </button>
  );
};