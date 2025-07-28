import  { useState, useEffect } from 'react';
import { Trophy, Users, Zap, Shield, Target, BarChart3, Crosshair } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CreateDuel from './components/CreateDuel';
import ActiveDuel from './components/ActiveDuel';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';

type Tab = 'daard' | 'create' | 'active' | 'leaderboard' | 'profile';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [glitchEffect, setGlitchEffect] = useState(false);

  // Gaming effects
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 8000);
    return () => clearInterval(interval);
  }, []);


  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'create':
        return <CreateDuel />;
      case 'active':
        return <ActiveDuel />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl animate-ping"></div>
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Gaming Header */}
      <header className="relative border-b border-cyan-500/30 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-pulse">
                    <Crosshair className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                </div>
                <div>
                  <span className={`text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ${glitchEffect ? 'animate-pulse' : ''}`}>
                    ALPHA ARENA
                  </span>
                  {/* <div className="text-xs text-cyan-400 font-mono tracking-wider">TRADING BATTLEGROUND</div> */}
                </div>
              </div>
              
              {/* Status Indicators */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-500/20 border border-green-400/50 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-mono">ONLINE</span>
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  <span className="text-cyan-400">156</span> FIGHTERS ACTIVE
                </div>
              </div>
            </div>

            {/* Gaming Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {[
                { id: 'dashboard', label: 'ARENA', icon: Target, color: 'from-red-500 to-orange-500' },
                { id: 'create', label: 'BATTLE', icon: Zap, color: 'from-yellow-500 to-red-500' },
                { id: 'leaderboard', label: 'RANKS', icon: Trophy, color: 'from-yellow-400 to-yellow-600' },
                { id: 'profile', label: 'PROFILE', icon: Users, color: 'from-purple-500 to-pink-500' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`relative group flex items-center space-x-2 px-4 py-3 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-cyan-500/25`
                      : 'text-gray-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-cyan-500/30'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-mono tracking-wider">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Wallet Connection */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-cyan-500/30 rounded-lg px-4 py-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <div className="text-right">
                  <div className="text-xs text-gray-400 font-mono">WALLET</div>
                  <div className="text-sm text-white font-mono">CONNECTED</div>
                </div>
              </div>
              <button className="relative group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 px-6 py-3 rounded-lg font-bold font-mono text-sm transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25">
                <span>0x1234...5678</span>
                <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Gaming Navigation */}
      <div className="md:hidden bg-black/90 backdrop-blur-xl border-b border-cyan-500/30">
        <div className="flex justify-around py-3">
          {[
            { id: 'dashboard', icon: Target, color: 'text-red-400' },
            { id: 'create', icon: Zap, color: 'text-yellow-400' },
            { id: 'active', icon: BarChart3, color: 'text-green-400' },
            { id: 'leaderboard', icon: Trophy, color: 'text-yellow-400' },
            { id: 'profile', icon: Users, color: 'text-purple-400' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`relative p-3 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? `${tab.color} bg-white/10 scale-110`
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <tab.icon className="w-6 h-6" />
              {activeTab === tab.id && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Gaming Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {renderContent()}
        </div>
      </main>

      {/* Gaming Effects Overlay */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {/* Scan lines */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)'
        }}></div>
        
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50"></div>
      </div>
    </div>
  );
}

export default App;