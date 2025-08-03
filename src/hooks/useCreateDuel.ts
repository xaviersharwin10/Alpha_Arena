import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';

const DUEL_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "tokenAddress", "type": "address"},
      {"internalType": "uint256", "name": "wagerAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "duration", "type": "uint256"}
    ],
    "name": "createDuel",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

interface CreateDuelParams {
  tokenAddress: string;
  amount: string;
  duration: number;
}

export const useCreateDuel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  // NEW: Frontend transaction signing
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  return useMutation({
    mutationFn: async (params: CreateDuelParams) => {
      // NEW: User signs transaction via MetaMask
      const contractAddress = process.env.CONTRACT_ADDRESS ;
      
      await writeContract({
        address: contractAddress,
        abi: DUEL_ABI,
        functionName: 'createDuel',
        args: [
          params.tokenAddress as `0x${string}`,
          parseUnits(params.amount, 18),
          BigInt(params.duration)
        ],
      });
      
      // NEW: Return transaction hash for tracking
      return { hash };
    },
    onSuccess: () => {
      // Invalidate duels query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['duels'] });
      
      // NEW: Navigate to explorer to see the new duel
      navigate('/explorer');
    },
    onError: (error) => {
      console.error('Failed to create duel:', error);
    },
  });
};