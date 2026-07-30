import React from 'react';
import { PokemonStats } from '../data/pokemonData';

interface PokemonStatBarProps {
  stats: PokemonStats;
  compareStats?: PokemonStats;
  showComparison?: boolean;
}

const STAT_CONFIG = [
  { key: 'hp', label: 'HP', max: 200, color: 'bg-emerald-500' },
  { key: 'attack', label: '공격', max: 180, color: 'bg-red-500' },
  { key: 'defense', label: '방어', max: 180, color: 'bg-amber-500' },
  { key: 'spAtk', label: '특수공격', max: 180, color: 'bg-purple-500' },
  { key: 'spDef', label: '특수방어', max: 180, color: 'bg-blue-500' },
  { key: 'speed', label: '스피드', max: 180, color: 'bg-cyan-500' },
] as const;

export const PokemonStatBar: React.FC<PokemonStatBarProps> = ({ stats, compareStats, showComparison = false }) => {
  return (
    <div className="space-y-2.5 text-xs sm:text-sm">
      {STAT_CONFIG.map(({ key, label, max, color }) => {
        const val = stats[key];
        const compVal = compareStats ? compareStats[key] : undefined;
        const percent = Math.min(100, Math.round((val / max) * 100));
        const isHigher = compVal !== undefined && val > compVal;

        return (
          <div key={key} className="flex items-center gap-2">
            <span className="w-16 font-semibold text-slate-300 text-left shrink-0">{label}</span>
            <span className={`w-8 font-mono font-bold text-right shrink-0 ${isHigher ? 'text-amber-400 font-extrabold' : 'text-slate-200'}`}>
              {val}
            </span>
            <div className="flex-1 bg-slate-800/80 rounded-full h-2.5 overflow-hidden border border-slate-700/50 p-0.5 relative">
              <div
                className={`h-full rounded-full transition-all duration-500 ${color} ${isHigher ? 'ring-1 ring-amber-300 shadow-sm shadow-amber-500/50' : ''}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
      <div className="pt-2 border-t border-slate-700/60 flex justify-between items-center text-xs">
        <span className="text-slate-400 font-medium">총 종족값 (Base Stat Total)</span>
        <span className="text-amber-400 font-bold font-mono text-base">{stats.total}</span>
      </div>
    </div>
  );
};
