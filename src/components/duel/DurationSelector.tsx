import React from 'react';

interface DurationSelectorProps {
  duration: number;
  onDurationChange: (duration: number) => void;
}

const durationOptions = [
  { label: '1 Hour', value: 3600 },
  { label: '4 Hours', value: 14400 },
  { label: '12 Hours', value: 43200 },
  { label: '24 Hours', value: 86400 },
  { label: '3 Days', value: 259200 },
  { label: '7 Days', value: 604800 },
];

export const DurationSelector: React.FC<DurationSelectorProps> = ({
  duration,
  onDurationChange,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {durationOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onDurationChange(option.value)}
          className={`p-3 border rounded-lg transition-all duration-300 ${
            duration === option.value
              ? 'bg-red-600 border-red-500 text-white'
              : 'bg-gray-900 border-gray-600 text-gray-400 hover:border-red-500 hover:text-white'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};