import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { X, ArrowDown, Settings, Zap } from 'lucide-react';
import { TokenSelector } from '../duel/TokenSelector';
import { useSwap } from '../../hooks/useSwap';
import axios from 'axios';
import { createPortal } from 'react-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SwapModal: React.FC<SwapModalProps> = ({ isOpen, onClose }) => {
  const { address } = useAccount();
  const [fromToken, setFromToken] = useState<any>(null);
  const [toToken, setToToken] = useState<any>(null);
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState(1);
  const [quote, setQuote] = useState<any>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);

  // NEW: Use the complete swap hook
  const swap = useSwap();

  // Get swap quote when inputs change
  React.useEffect(() => {
    const getQuote = async () => {
      if (!fromToken || !toToken || !fromAmount || !address || parseFloat(fromAmount) <= 0) {
        setQuote(null);
        return;
      }

      setIsLoadingQuote(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/swap/quote`, {
          params: {
            fromTokenAddress: fromToken.address,
            toTokenAddress: toToken.address,
            amount: parseUnits(fromAmount, fromToken.decimals).toString(),
          },
        });
        setQuote(response.data.data);
      } catch (error) {
        console.error('Quote error:', error);
        setQuote(null);
      } finally {
        setIsLoadingQuote(false);
      }
    };

    const debounce = setTimeout(getQuote, 500);
    return () => clearTimeout(debounce);
  }, [fromToken, toToken, fromAmount, address]);

  // NEW: Execute complete swap flow
  const handleSwap = async () => {
    if (!fromToken || !toToken || !fromAmount || !quote) return;

    try {
      await swap.mutateAsync({
        fromToken,
        toToken,
        fromAmount,
        slippage
      });

      // Reset form after successful swap
      setTimeout(() => {
        setFromAmount('');
        setQuote(null);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Swap error:', error);
    }
  };

  if (!isOpen) return null;

  const outputAmount = quote ? formatUnits(BigInt(quote.dstAmount), toToken?.decimals || 18) : '0';

  return createPortal (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Quick Swap</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* From Token */}
        <div className="space-y-2 mb-4">
          <label className="text-sm text-gray-400">From</label>
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent text-2xl font-semibold text-white placeholder-gray-500 outline-none w-full"
              />
              <div className="text-right text-sm text-gray-400">
                Balance: 1,234.56
              </div>
            </div>
            <TokenSelector
              selectedToken={fromToken}
              onTokenSelect={setFromToken}
            />
          </div>
        </div>

        {/* Swap Arrow */}
        <div className="flex justify-center mb-4">
          <button className="p-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
            <ArrowDown className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* To Token */}
        <div className="space-y-2 mb-6">
          <label className="text-sm text-gray-400">To</label>
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-semibold text-white">
                {isLoadingQuote ? 'Loading...' : outputAmount}
              </div>
              <div className="text-right text-sm text-gray-400">
                Balance: 0.00
              </div>
            </div>
            <TokenSelector
              selectedToken={toToken}
              onTokenSelect={setToToken}
            />
          </div>
        </div>

        {/* Swap Details */}
        {quote && (
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Rate:</span>
              <span className="text-white">
                1 {fromToken?.symbol} = {(parseFloat(outputAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken?.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Slippage:</span>
              <span className="text-white">{slippage}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Network Fee:</span>
              <span className="text-white">{quote.estimatedGas ? `~$${(parseInt(quote.estimatedGas) * 0.000000001 * 2000).toFixed(2)}` : '~$2.50'}</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={!fromToken || !toToken || !fromAmount || !quote || swap.isPending}
          className={`w-full py-4 rounded-lg font-bold transition-all duration-300 ${
            fromToken && toToken && fromAmount && quote && !swap.isPending
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 flex items-center justify-center space-x-2'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {swap.isPending ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Step 1: Approving... Then Swapping...</span>
            </>
          ) : swap.isSuccess ? (
            <>
              <span>🎉 Swap Successful!</span>
            </>
          ) : !fromToken || !toToken ? (
            'Select tokens'
          ) : !fromAmount ? (
            'Enter amount'
          ) : !quote ? (
            'Getting quote...'
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Swap Tokens</span>
            </>
          )}
        </button>
      </div>
    </div>,
    document.body
  );
};