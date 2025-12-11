// src/admin/components/StatsCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = 'primary',
  loading = false 
}) {
  const colorClasses = {
    primary: 'from-primary-500/20 to-primary-600/20 border-primary-500/30',
    secondary: 'from-secondary-500/20 to-secondary-600/20 border-secondary-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
  };

  const iconColorClasses = {
    primary: 'text-primary-400',
    secondary: 'text-secondary-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    yellow: 'text-yellow-400',
  };

  if (loading) {
    return (
      <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-5 animate-pulse`}>
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 bg-neutral-700 rounded w-24"></div>
          <div className="w-10 h-10 bg-neutral-700 rounded-lg"></div>
        </div>
        <div className="h-8 bg-neutral-700 rounded w-16 mb-2"></div>
        <div className="h-3 bg-neutral-700 rounded w-20"></div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-5 transition-transform hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-neutral-400">{title}</span>
        {Icon && (
          <div className={`w-10 h-10 rounded-lg bg-neutral-800/50 flex items-center justify-center ${iconColorClasses[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      
      <div className="text-3xl font-bold text-white mb-2">
        {typeof value === 'number' ? value.toLocaleString('he-IL') : value}
      </div>
      
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-sm ${
          trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-neutral-400'
        }`}>
          {trend === 'up' && <TrendingUp className="w-4 h-4" />}
          {trend === 'down' && <TrendingDown className="w-4 h-4" />}
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}
