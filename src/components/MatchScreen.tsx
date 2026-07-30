import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pokemon } from '../data/pokemonData';
import { PokemonCard } from './PokemonCard';
import { RoundName } from '../types';
import { Swords, Zap, BarChart2, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface MatchScreenProps {
  roundName: RoundName;
  matchIndex: number;
  totalMatches: number;
  leftPokemon: Pokemon;
  rightPokemon: Pokemon;
  onSelectWinner: (winner: Pokemon, loser: Pokemon) => void;
}

export const MatchScreen: React.FC<MatchScreenProps> = ({
  roundName,
  matchIndex,
  totalMatches,
  leftPokemon,
  rightPokemon,
  onSelectWinner,
}) => {
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    sound.playBattleStart();
    setSelectedSide(null);
  }, [leftPokemon.id, rightPokemon.id]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showCompareModal) {
        if (e.key === 'Escape') setShowCompareModal(false);
        return;
      }
      if (e.key === '1' || e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        handleChoice(leftPokemon, rightPokemon, 'left');
      } else if (e.key === '2' || e.key === 'l' || e.key === 'L' || e.key === 'ArrowRight') {
        handleChoice(rightPokemon, leftPokemon, 'right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [leftPokemon, rightPokemon, showCompareModal]);

  const handleChoice = (winner: Pokemon, loser: Pokemon, side: 'left' | 'right') => {
    if (selectedSide) return; // Prevent double pick
    setSelectedSide(side);
    sound.playSelect();
    setTimeout(() => {
      onSelectWinner(winner, loser);
    }, 250);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center gap-6 min-h-[calc(100vh-80px)] justify-between">
      {/* Round Header Bar */}
      <div className="w-full text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-5 py-2 rounded-2xl shadow-lg">
          <Swords className="w-5 h-5 text-amber-400 animate-pulse" />
          <span className="text-xl sm:text-2xl font-black text-white">{roundName}</span>
          <span className="text-slate-500 font-semibold">|</span>
          <span className="text-sm font-extrabold text-amber-400 font-mono">
            제 {matchIndex + 1} / {totalMatches} 매치
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-400 pt-1">
          <span className="hidden sm:inline">💡 키보드 단축키: <kbd className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-amber-300">1</kbd> (왼쪽) 또는 <kbd className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-amber-300">2</kbd> (오른쪽)</span>
          <button
            type="button"
            onClick={() => setShowCompareModal(true)}
            className="text-amber-400 hover:text-amber-300 underline underline-offset-4 flex items-center gap-1 cursor-pointer font-bold"
          >
            <BarChart2 className="w-4 h-4" />
            <span>두 포켓몬 능력치 한눈에 비교하기</span>
          </button>
        </div>
      </div>

      {/* Battle Cards Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-stretch relative">
        {/* VS Central Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-red-500 to-purple-600 p-1 shadow-2xl shadow-amber-500/50 flex items-center justify-center animate-bounce">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center border border-amber-400">
              <span className="text-2xl font-black italic bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                VS
              </span>
            </div>
          </div>
        </div>

        {/* Left Pokemon Card */}
        <motion.div
          animate={selectedSide === 'left' ? { scale: 1.03, zIndex: 20 } : selectedSide === 'right' ? { opacity: 0.3, scale: 0.95 } : {}}
          className="w-full"
        >
          <PokemonCard
            pokemon={leftPokemon}
            opponent={rightPokemon}
            side="left"
            keyHint="1"
            onSelect={() => handleChoice(leftPokemon, rightPokemon, 'left')}
          />
        </motion.div>

        {/* Right Pokemon Card */}
        <motion.div
          animate={selectedSide === 'right' ? { scale: 1.03, zIndex: 20 } : selectedSide === 'left' ? { opacity: 0.3, scale: 0.95 } : {}}
          className="w-full"
        >
          <PokemonCard
            pokemon={rightPokemon}
            opponent={leftPokemon}
            side="right"
            keyHint="2"
            onSelect={() => handleChoice(rightPokemon, leftPokemon, 'right')}
          />
        </motion.div>
      </div>

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-3xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative"
            >
              <button
                type="button"
                onClick={() => setShowCompareModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-1">
                <h3 className="text-xl font-black text-white flex items-center justify-center gap-2">
                  <BarChart2 className="w-5 h-5 text-amber-400" />
                  <span>상세 능력치 맞대결 비교</span>
                </h3>
                <p className="text-xs text-slate-400">누가 더 우세한 능력치를 가지고 있는지 확인해보세요!</p>
              </div>

              {/* Header Matchup */}
              <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="space-y-1">
                  <img src={leftPokemon.sprite} alt={leftPokemon.name} className="w-16 h-16 mx-auto object-contain" />
                  <span className="font-extrabold text-amber-400 text-base block">{leftPokemon.name}</span>
                  <span className="text-xs text-slate-400 font-mono">총합 {leftPokemon.stats.total}</span>
                </div>
                <div className="space-y-1">
                  <img src={rightPokemon.sprite} alt={rightPokemon.name} className="w-16 h-16 mx-auto object-contain" />
                  <span className="font-extrabold text-cyan-400 text-base block">{rightPokemon.name}</span>
                  <span className="text-xs text-slate-400 font-mono">총합 {rightPokemon.stats.total}</span>
                </div>
              </div>

              {/* Stat Comparison Table */}
              <div className="space-y-3 text-sm">
                {[
                  { label: 'HP (체력)', l: leftPokemon.stats.hp, r: rightPokemon.stats.hp, max: 200 },
                  { label: '공격 (Attack)', l: leftPokemon.stats.attack, r: rightPokemon.stats.attack, max: 180 },
                  { label: '방어 (Defense)', l: leftPokemon.stats.defense, r: rightPokemon.stats.defense, max: 180 },
                  { label: '특수공격 (Sp.Atk)', l: leftPokemon.stats.spAtk, r: rightPokemon.stats.spAtk, max: 180 },
                  { label: '특수방어 (Sp.Def)', l: leftPokemon.stats.spDef, r: rightPokemon.stats.spDef, max: 180 },
                  { label: '스피드 (Speed)', l: leftPokemon.stats.speed, r: rightPokemon.stats.speed, max: 180 },
                ].map(stat => {
                  const lWin = stat.l > stat.r;
                  const rWin = stat.r > stat.l;
                  return (
                    <div key={stat.label} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
                      <div className="flex justify-between items-center font-semibold text-xs text-slate-400">
                        <span className={lWin ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                          {stat.l} {lWin && '🏆'}
                        </span>
                        <span>{stat.label}</span>
                        <span className={rWin ? 'text-cyan-400 font-bold' : 'text-slate-300'}>
                          {rWin && '🏆'} {stat.r}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Left Bar */}
                        <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden flex justify-end">
                          <div
                            className={`h-full ${lWin ? 'bg-amber-400' : 'bg-slate-600'}`}
                            style={{ width: `${Math.min(100, (stat.l / stat.max) * 100)}%` }}
                          />
                        </div>
                        {/* Right Bar */}
                        <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden flex justify-start">
                          <div
                            className={`h-full ${rWin ? 'bg-cyan-400' : 'bg-slate-600'}`}
                            style={{ width: `${Math.min(100, (stat.r / stat.max) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowCompareModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm cursor-pointer"
                >
                  창 닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
