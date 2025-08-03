import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Clock, DollarSign, Target } from 'lucide-react';
import { TokenSelector } from '../components/duel/TokenSelector';
import { AmountInput } from '../components/duel/AmountInput';
import { DurationSelector } from '../components/duel/DurationSelector';
import { CreateDuelButton } from '../components/duel/CreateDuelButton';

export const CreateDuelPage: React.FC = () => {
  const { isConnected } = useAccount();
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState(24 * 60 * 60); // 24 hours in seconds

  if (!isConnected) {
    return (
      <div className="text-center py-16">
        <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Connect Wallet Required</h2>
        <p className="text-gray-400">Please connect your wallet to create a duel</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        {/* <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-r from-red-600 to-orange-500 rounded-full">
            <Plus className="w-8 h-8 text-white" />
          </div>
        </div> */}
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Create Your Duel
        </h1>
        
        <p className="text-xl text-gray-400">
          Challenge the best traders with your custom parameters
        </p>
      </div>

      {/* Form */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 space-y-8">
        {/* Token Selection */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Duel Token</h3>
          </div>
          <TokenSelector
            selectedToken={selectedToken}
            onTokenSelect={setSelectedToken}
          />
        </div>

        {/* Amount Input */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Stake Amount</h3>
          </div>
          <AmountInput
            amount={amount}
            onAmountChange={setAmount}
            token={selectedToken}
          />
        </div>

        {/* Duration Selection */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Duel Duration</h3>
          </div>
          <DurationSelector
            duration={duration}
            onDurationChange={setDuration}
          />
        </div>

        {/* Summary */}
        <div className="bg-gray-900/50 rounded-lg p-6 space-y-3">
          <h4 className="text-lg font-semibold text-white">Duel Summary</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Token:</span>
              <span className="text-white">
                {selectedToken ? selectedToken.symbol : 'Not selected'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Your Stake:</span>
              <span className="text-white">
                {amount || '0'} {selectedToken?.symbol || ''}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Total Prize Pool:</span>
              <span className="text-green-400 font-semibold">
                {amount ? (parseFloat(amount) * 2).toString() : '0'} {selectedToken?.symbol || ''}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Duration:</span>
              <span className="text-white">
                {duration / 3600} hours
              </span>
            </div>
          </div>
        </div>

        {/* Create Button */}
        <CreateDuelButton
          tokenAddress={selectedToken?.address}
          amount={amount}
          duration={duration}
          disabled={!selectedToken || !amount || parseFloat(amount) <= 0}
        />
      </div>
    </div>
  );
};