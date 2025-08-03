import React from 'react';
import { DollarSign } from 'lucide-react';
import { useBalance, useAccount } from 'wagmi';

interface AmountInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  token?: {
    address?: `0x${string}`; // ERC-20 token address (optional)
    symbol?: string;
  };
}

export const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  onAmountChange,
  token,
}) => {
  const presetAmounts = ['10', '50', '100', '500'];
  const { address } = useAccount();

  const { data: balanceData, isLoading } = useBalance({
    address,
    token: token?.address, // undefined for native token (ETH)
    watch: true,           // live updates
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-4 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none pr-20"
          min="0"
          step="any"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          {token?.symbol || balanceData?.symbol || 'TOKEN'}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {presetAmounts.map((preset) => (
          <button
            key={preset}
            onClick={() => onAmountChange(preset)}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white hover:border-red-500 transition-colors text-sm"
          >
            {preset} {token?.symbol || balanceData?.symbol || ''}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Your Balance:</span>
        <div className="flex items-center space-x-1">
          <DollarSign className="w-4 h-4 text-green-400" />
          <span className="text-white">
            {isLoading ? 'Loading...' : `${balanceData?.formatted || '0.00'} ${balanceData?.symbol || ''}`}
          </span>
        </div>
      </div>
    </div>
  );
};
