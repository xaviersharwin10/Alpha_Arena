import React from 'react';
import { Clock, Flag, Trophy, Users } from 'lucide-react';

interface DuelTimelineProps {
  duel: any;
}

export const DuelTimeline: React.FC<DuelTimelineProps> = ({ duel }) => {
  const events = [
    {
      id: 1,
      type: 'created',
      title: 'Duel Created',
      description: `Created by ${duel.creator.slice(0, 6)}...${duel.creator.slice(-4)}`,
      timestamp: new Date(duel.startTime * 1000).toISOString(),
      icon: Flag,
      color: 'text-blue-400'
    },
    ...(duel.opponent ? [{
      id: 2,
      type: 'joined',
      title: 'Opponent Joined',
      description: `${duel.opponent.slice(0, 6)}...${duel.opponent.slice(-4)} joined the duel`,
      timestamp: new Date().toISOString(),
      icon: Users,
      color: 'text-green-400'
    }] : []),
    ...(duel.resolved ? [{
      id: 3,
      type: 'resolved',
      title: 'Duel Resolved',
      description: `Winner: ${duel.winner.slice(0, 6)}...${duel.winner.slice(-4)}`,
      timestamp: new Date(duel.endTime * 1000).toISOString(),
      icon: Trophy,
      color: 'text-yellow-400'
    }] : [])
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Duel Timeline</h3>
      
      <div className="space-y-4">
        {events.map((event, index) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-gray-900 ${event.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium">{event.title}</div>
                <div className="text-gray-400 text-sm">{event.description}</div>
                <div className="text-gray-500 text-xs mt-1">
                  {new Date(event.timestamp).toLocaleString()}
                </div>
              </div>
              
              {index < events.length - 1 && (
                <div className="absolute left-6 mt-8 w-0.5 h-6 bg-gray-700"></div>
              )}
            </div>
          );
        })}
        
        {!duel.resolved && duel.status === 'ACTIVE' && (
          <div className="flex items-start space-x-3 opacity-50">
            <div className="p-2 rounded-full bg-gray-900">
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-400 font-medium">Awaiting Resolution</div>
              <div className="text-gray-500 text-sm">Duel will be resolved automatically</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};