import React, { useState } from 'react';
import { Search, Filter, Clock, DollarSign } from 'lucide-react';
import { DuelCard } from '../components/duel/DuelCard';
import { useDuels } from '../hooks/useDuels';

export const DuelExplorerPage: React.FC = () => {
  const { data: duels, isLoading, error } = useDuels();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDuels = duels?.filter(duel => {
    const matchesSearch = searchQuery === '' || 
      duel.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      duel.opponent?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || duel.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-400 text-lg">Failed to load duels</div>
        <div className="text-gray-500 text-sm mt-2">{error.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Duel Explorer
        </h1>
        <p className="text-xl text-gray-400">
          Discover and join active trading duels
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
          <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">
            {duels?.filter(d => d.status === 'OPEN').length || 0}
          </div>
          <div className="text-gray-400">Open Duels</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
          <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">
            {duels?.filter(d => d.status === 'ACTIVE').length || 0}
          </div>
          <div className="text-gray-400">Active Duels</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
          <Search className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">
            {filteredDuels.length}
          </div>
          <div className="text-gray-400">Filtered Results</div>
        </div>
      </div>

      {/* Duels Grid */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-10 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredDuels.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDuels.map((duel) => (
              <DuelCard key={duel.id} duel={duel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Duels Found</h3>
            <p className="text-gray-400">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Be the first to create a duel!'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};