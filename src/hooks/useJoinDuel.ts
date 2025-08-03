import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';

// NEW: Complete contract ABI for joinDuel function
const DUEL_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "duelId", "type": "uint256"}],
    "name": "joinDuel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "duelId", "type": "uint256"}],
    "name": "getDuel",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "address", "name": "creator", "type": "address"},
          {"internalType": "address", "name": "opponent", "type": "address"},
          {"internalType": "address", "name": "tokenAddress", "type": "address"},
          {"internalType": "uint256", "name": "wagerAmount", "type": "uint256"},
          {"internalType": "uint256", "name": "duration", "type": "uint256"},
          {"internalType": "uint256", "name": "startTime", "type": "uint256"},
          {"internalType": "uint256", "name": "endTime", "type": "uint256"},
          {"internalType": "bool", "name": "resolved", "type": "bool"},
          {"internalType": "address", "name": "winner", "type": "address"},
          {"internalType": "uint8", "name": "status", "type": "uint8"}
        ],
        "internalType": "struct Duel.DuelInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// NEW: ERC20 ABI for token approval
const ERC20_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

export const useJoinDuel = () => {
  const queryClient = useQueryClient();
  
  // NEW: Separate hooks for approval and join transactions
  const { writeContract: approveToken, data: approveHash } = useWriteContract();
  const { writeContract: joinDuel, data: joinHash } = useWriteContract();
  
  const { isLoading: isApproving } = useWaitForTransactionReceipt({
    hash: approveHash,
  });
  
  const { isLoading: isJoining } = useWaitForTransactionReceipt({
    hash: joinHash,
  });

  return useMutation({
    mutationFn: async ({ duelId, duel }: { duelId: number; duel: any }) => {
      const contractAddress = process.env.CONTRACT_ADDRESS;
      const tokenAddress = duel.tokenAddress as `0x${string}`;
      const wagerAmount = parseUnits(duel.wagerAmount, 18);

      console.log('Joining duel:', { duelId, tokenAddress, wagerAmount: wagerAmount.toString() });

      // NEW: Step 1 - Approve token spending
      console.log('Step 1: Approving token...');
      await approveToken({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [contractAddress, wagerAmount],
      });

      // NEW: Wait for approval to complete
      if (approveHash) {
        console.log('Waiting for approval confirmation...');
        // Wait a bit for the approval to be mined
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      // NEW: Step 2 - Join the duel
      console.log('Step 2: Joining duel...');
      await joinDuel({
        address: contractAddress,
        abi: DUEL_ABI,
        functionName: 'joinDuel',
        args: [BigInt(duelId)],
      });

      return { approveHash, joinHash };
    },
    onSuccess: (data, variables) => {
      console.log('Join duel success:', data);
      // Invalidate duels queries to refresh the lists
      queryClient.invalidateQueries({ queryKey: ['duels'] });
      queryClient.invalidateQueries({ queryKey: ['duel', variables.duelId] });
    },
    onError: (error) => {
      console.error('Failed to join duel:', error);
    },
    // NEW: Add loading state that covers both approval and join
    meta: {
      isLoading: isApproving || isJoining
    }
  });
};