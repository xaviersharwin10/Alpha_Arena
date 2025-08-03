// NEW: Complete swap hook following 1inch documentation pattern
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useSendTransaction } from 'wagmi';
import { parseUnits } from 'viem';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface SwapParams {
  fromToken: any;
  toToken: any;
  fromAmount: string;
  slippage?: number;
}

export const useSwap = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  
//   const { writeContract, data: txHash } = useWriteContract();
    const { sendTransaction, data: txHash } = useSendTransaction();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  return useMutation({
    mutationFn: async ({ fromToken, toToken, fromAmount, slippage = 1 }: SwapParams) => {
      if (!address || !fromToken || !toToken || !fromAmount) {
        throw new Error('Missing required parameters');
      }

      const amount = parseUnits(fromAmount, fromToken.decimals).toString();
      
      console.log('🔄 Starting swap process...');
      console.log('From:', fromToken.symbol, 'To:', toToken.symbol, 'Amount:', fromAmount);

      // Step 1: Check current allowance
      console.log('📋 Step 1: Checking allowance...');
      const allowanceResponse = await axios.get(`${API_BASE_URL}/swap/allowance`, {
        params: {
          tokenAddress: fromToken.address,
          walletAddress: address
        }
      });

      const currentAllowance = BigInt(allowanceResponse.data.data.allowance);
      const requiredAmount = BigInt(amount);

      console.log('Current allowance:', currentAllowance.toString());
      console.log('Required amount:', requiredAmount.toString());

      // Step 2: Approve if needed
      if (currentAllowance < requiredAmount) {
        console.log('✅ Step 2: Approval needed, getting approval transaction...');
        
        const approvalResponse = await axios.get(`${API_BASE_URL}/swap/approve`, {
          params: {
            tokenAddress: fromToken.address,
            amount: requiredAmount.toString()
          }
        });

        const approvalTx = approvalResponse.data.data;
        console.log('Approval transaction:', approvalTx);

        // Execute approval transaction via MetaMask
        console.log('🔐 Executing approval transaction...');
        await sendTransaction({
          to: approvalTx.to as `0x${string}`,
          data: approvalTx.data as `0x${string}`,
          value: BigInt(approvalTx.value || '0'),
        });

        // Wait for approval transaction to be mined
        console.log('⏳ Waiting for approval to be mined...');
        if (txHash) {
          // Wait for the transaction receipt
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          // Verify allowance was updated
          let retries = 0;
          while (retries < 5) {
            const newAllowanceResponse = await axios.get(`${API_BASE_URL}/swap/allowance`, {
              params: {
                tokenAddress: fromToken.address,
                walletAddress: address
              }
            });
            
            const newAllowance = BigInt(newAllowanceResponse.data.data.allowance);
            console.log('New allowance after approval:', newAllowance.toString());
            
            if (newAllowance >= requiredAmount) {
              console.log('✅ Approval confirmed!');
              break;
            }
            
            retries++;
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      } else {
        console.log('✅ Step 2: Sufficient allowance, skipping approval');
      }

      // Step 3: Get swap transaction
      console.log('🔄 Step 3: Getting swap transaction...');
      const swapResponse = await axios.get(`${API_BASE_URL}/swap/transaction`, {
        params: {
          fromTokenAddress: fromToken.address,
          toTokenAddress: toToken.address,
          amount,
          fromAddress: address,
          slippage: slippage.toString(),
        }
      });
    console.log("SWAP Transaction data recived", swapResponse);
      const swapTx = swapResponse.data.data;
      console.log('Swap transaction:', swapTx.tx);

      // Step 4: Execute swap transaction
      console.log('🚀 Step 4: Executing swap...');
      await sendTransaction({
        to: swapTx.tx.to as `0x${string}`,
        data: swapTx.tx.data as `0x${string}`,
        value: BigInt(swapTx.tx.value || '0'),
      });

      return { 
        fromToken: fromToken.symbol,
        toToken: toToken.symbol,
        amount: fromAmount
      };
    },
    onSuccess: (data) => {
      console.log('🎉 Swap completed successfully!', data);
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['tokens'] });
    },
    onError: (error) => {
      console.error('❌ Swap failed:', error);
    },
  });
};