import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useTokens } from '../../hooks/useTokens';

interface TokenSelectorProps {
  selectedToken: any;
  onTokenSelect: (token: any) => void;
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onTokenSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: tokens, isLoading } = useTokens();

  const filteredTokens = tokens?.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-gray-900 border border-gray-600 rounded-lg text-left flex items-center justify-between hover:border-red-500 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {selectedToken ? (
            <>
              <img
                src={selectedToken.logoURI || '/token-placeholder.png'}
                alt={selectedToken.name}
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/token-placeholder.png';
                }}
              />
              <div>
                <div className="text-white font-medium">{selectedToken.symbol}</div>
                <div className="text-gray-400 text-sm">{selectedToken.name}</div>
              </div>
            </>
          ) : (
            <div className="text-gray-400">Select a token</div>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-600 rounded-lg z-50 max-h-80 overflow-hidden">
          <div className="p-3 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-400">Loading tokens...</div>
            ) : filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <button
                  key={token.address}
                  onClick={() => {
                    onTokenSelect(token);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  className="w-full p-3 flex items-center space-x-3 hover:bg-gray-800 transition-colors"
                >
                  <img
                    src={token.logoURI || '/token-placeholder.png'}
                    alt={token.name}
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/token-placeholder.png';
                    }}
                  />
                  <div className="text-left">
                    <div className="text-white font-medium">{token.symbol}</div>
                    <div className="text-gray-400 text-sm">{token.name}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-gray-400">No tokens found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};