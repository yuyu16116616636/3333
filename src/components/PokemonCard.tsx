import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pokemon, TYPE_MAP, PokemonType } from '../data/pokemonData';
import { PokemonStatBar } from './PokemonStatBar';
import { ChevronDown, ChevronUp, BarChart2, Info, Sparkles } from 'lucide-react';

interface PokemonCardProps {
  pokemon: Pokemon;
  onSelect?: () => void;
  opponent?: Pokemon;
  side: 'left' | 'right';
  showSelectButton?: boolean;
  keyHint?: string;
  isMatchView?: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onSelect,
  opponent,
  side,
  showSelectButton = true,
  keyHint,
  isMatchView = true,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // Get primary type gradient
  const primaryType = pokemon.types[0] as PokemonType;
  const primaryDetail = TYPE_MAP[primaryType] || TYPE_MAP.normal;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`relative w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl backdrop-blur-md flex flex-col transition-all duration-300 group hover:border-amber-400/60 hover:shadow-amber-500/10 ${
        side === 'left' ? 'hover:-translate-y-1' : 'hover:-translate-y-1'
      }`}
    >
      {/* Top Header Badge */}
      <div className="px-4 py-3 bg-slate-800/90 border-b border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
            #{String(pokemon.id).padStart(3, '0')}
          </span>
          <span className="text-xs font-medium text-slate-300 bg-slate-700/40 px-2 py-0.5 rounded-full">
            {pokemon.category}
          </span>
          {pokemon.isLegendary && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/40">
              <Sparkles className="w-3 h-3 text-amber-400" /> 전설
            </span>
          )}
        </div>
        {keyHint && (
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-amber-950/70 border border-amber-500/40 px-2.5 py-1 rounded-md shadow-inner">
            [단축키 {keyHint}]
          </span>
        )}
      </div>

      {/* Hero Image Section */}
      <div
        className="relative w-full h-56 sm:h-64 flex items-center justify-center p-6 cursor-pointer select-none overflow-hidden bg-gradient-to-b from-slate-800/50 via-slate-900/80 to-slate-950"
        onClick={onSelect}
      >
        {/* Background glow circle */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-48 h-48 rounded-full bg-slate-700/50 blur-2xl group-hover:scale-125 transition-transform duration-500" />
        </div>

        {/* Pokemon Official Artwork Image */}
        <motion.img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-44 h-44 sm:w-52 sm:h-52 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300 z-10"
          loading="eager"
          whileHover={{ rotate: side === 'left' ? -3 : 3 }}
        />

        {/* Type Badges floating bottom left */}
        <div className="absolute bottom-3 left-4 flex gap-1.5 z-20">
          {pokemon.types.map(t => {
            const typeInfo = TYPE_MAP[t as PokemonType] || TYPE_MAP.normal;
            return (
              <span
                key={t}
                className={`px-2.5 py-0.5 text-xs font-bold rounded-md shadow-sm border ${typeInfo.bg} ${typeInfo.text} ${typeInfo.border}`}
              >
                {typeInfo.ko}
              </span>
            );
          })}
        </div>

        {/* Stat total Pill floating bottom right */}
        <div className="absolute bottom-3 right-4 z-20 bg-slate-950/80 backdrop-blur-sm border border-slate-700/80 px-2.5 py-1 rounded-lg text-xs font-mono text-amber-300 flex items-center gap-1 shadow-md">
          <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
          <span>총합 {pokemon.stats.total}</span>
        </div>
      </div>

      {/* Main Info Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-amber-300 transition-colors">
              {pokemon.name}
            </h3>
            <span className="text-xs font-mono text-slate-400 font-medium">{pokemon.nameEn}</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 my-2 min-h-[32px]">
            {pokemon.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-slate-300 mb-3">
            <div>
              <span className="text-slate-500">신장: </span>
              <span className="font-semibold">{pokemon.height} m</span>
            </div>
            <div>
              <span className="text-slate-500">체중: </span>
              <span className="font-semibold">{pokemon.weight} kg</span>
            </div>
          </div>
        </div>

        {/* Toggle Detailed Stats Button */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(!showDetails);
            }}
            className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>{showDetails ? '상세 능력치 닫기' : '상세 능력치 보기 (HP/공격/스피드)'}</span>
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Expandable Stat Bar */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 shadow-inner"
              >
                <div className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
                  <span>능력치 세부 분석</span>
                  {opponent && (
                    <span className="text-[11px] text-amber-400 font-normal">
                      (*황색 강조 = 상대보다 우위)
                    </span>
                  )}
                </div>
                <PokemonStatBar
                  stats={pokemon.stats}
                  compareStats={opponent?.stats}
                  showComparison={!!opponent}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Primary Action Choice Button */}
          {showSelectButton && onSelect && (
            <button
              type="button"
              onClick={onSelect}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 border border-amber-300"
            >
              <span>{pokemon.name} 선택하기</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
