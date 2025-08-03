import React from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Zap, Target, DollarSign, Trophy, ArrowRight, Flame } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { isConnected } = useAccount();

  const features = [
    {
      icon: Target,
      title: 'Challenge Traders',
      description: 'Create duels with any ERC-20 token and set your stakes',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Zap,
      title: 'Live Trading',
      description: 'Trade in real-time using integrated 1inch swap interface',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: DollarSign,
      title: 'Auto Resolution',
      description: 'Winners determined by P&L performance automatically',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Trophy,
      title: 'Winner Takes All',
      description: 'Total stake automatically transferred to the victor',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-16">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-r from-red-600 to-orange-500 rounded-full animate-pulse">
              <Flame className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Alpha Arena
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            The ultimate DeFi trading duel platform. Challenge peers, trade live, and let your performance decide the winner.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {isConnected ? (
            <>
              <Link
                to="/create"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg hover:from-red-500 hover:to-orange-400 transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-red-600/25"
              >
                <Flame className="w-5 h-5" />
                <span>Create Duel</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/explorer"
                className="px-8 py-4 bg-gray-800 border border-gray-700 text-white font-bold rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center space-x-2"
              >
                <Target className="w-5 h-5" />
                <span>Explore Duels</span>
              </Link>
            </>
          ) : (
            <div className="text-gray-400 text-lg">
              Connect your wallet to start dueling
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How Alpha Arena Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the thrill of competitive DeFi trading with automated resolution and fair gameplay
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-red-500/30 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl border border-gray-700">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Battle Statistics
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              1,247
            </div>
            <div className="text-gray-400">Total Duels</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              $2.4M
            </div>
            <div className="text-gray-400">Total Volume</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              892
            </div>
            <div className="text-gray-400">Active Traders</div>
          </div>
        </div>
      </section>
    </div>
  );
};