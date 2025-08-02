import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Sword, Trophy, Plus, Search, BarChart3 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Sword },
    { path: '/create', label: 'Create Duel', icon: Plus },
    { path: '/explorer', label: 'Explorer', icon: Search },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  ];

  return (
    <nav className="bg-gray-900/90 backdrop-blur-sm border-b border-red-600/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg group-hover:from-red-500 group-hover:to-orange-400 transition-all duration-300">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Alpha Arena
              </span>
              <span className="text-xs text-gray-400 -mt-1">Trading Duels</span>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-red-600/20 text-red-400 shadow-lg shadow-red-600/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Connect Wallet */}
          <div className="flex items-center space-x-4">
            <ConnectButton
              chainStatus="icon"
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-gray-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-red-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};