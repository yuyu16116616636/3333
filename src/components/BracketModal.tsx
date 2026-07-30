import React from 'react';
import { motion } from 'motion/react';
import { MatchHistory } from '../types';
import { Pokemon } from '../data/pokemonData';
import { X, GitFork, Trophy } from 'lucide-react';

interface BracketModalProps {
  matchHistory: MatchHistory[];
  current16: Pokemon[];
  onClose: () => void;
  winner: Pokemon | null;
}

export const BracketModal: React.FC<BracketModalProps> = ({
  matchHistory,
  current16,
  onClose,
  winner,
}) => {
  // Extract rounds
  const round16Matches = matchHistory.filter(m => m.round === '16강');
  const round8Matches = matchHistory.filter(m => m.round === '8강');
  const round4Matches = matchHistory.filter(m => m.round === '4강');
  const finalMatch = matchHistory.find(m => m.round === '결승전');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-5xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-hidden flex flex-col relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <h3 className="text-xl font-black text-white flex items-center justify-center gap-2">
            <GitFork className="w-5 h-5 text-amber-400" />
            <span>토너먼트 전체 대진표</span>
          </h3>
          <p className="text-xs text-slate-400">16강부터 결승까지의 실시간 대진 현황을 확인하세요.</p>
        </div>

        {/* Scrollable Bracket Tree */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
          <div className="min-w-[700px] grid grid-cols-4 gap-4 text-center">
            {/* Column Headers */}
            <div className="font-extrabold text-xs text-amber-400 bg-slate-900 p-2 rounded-lg border border-slate-800">
              16강 (8경기)
            </div>
            <div className="font-extrabold text-xs text-amber-400 bg-slate-900 p-2 rounded-lg border border-slate-800">
              8강 (4경기)
            </div>
            <div className="font-extrabold text-xs text-amber-400 bg-slate-900 p-2 rounded-lg border border-slate-800">
              4강 (2경기)
            </div>
            <div className="font-extrabold text-xs text-amber-400 bg-slate-900 p-2 rounded-lg border border-slate-800">
              결승전 / 우승
            </div>

            {/* Column 16강 */}
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => {
                const p1 = current16[i * 2];
                const p2 = current16[i * 2 + 1];
                const match = round16Matches[i];

                return (
                  <div key={i} className="bg-slate-900/80 p-2 rounded-xl border border-slate-800 text-left text-xs space-y-1">
                    <div className={`flex items-center justify-between p-1 rounded ${match?.winner.id === p1?.id ? 'bg-amber-950/70 text-amber-300 font-bold border border-amber-500/40' : 'text-slate-300'}`}>
                      <span className="truncate">{p1 ? p1.name : '미정'}</span>
                      {p1 && <img src={p1.sprite} alt="" className="w-5 h-5 object-contain" />}
                    </div>
                    <div className={`flex items-center justify-between p-1 rounded ${match?.winner.id === p2?.id ? 'bg-amber-950/70 text-amber-300 font-bold border border-amber-500/40' : 'text-slate-300'}`}>
                      <span className="truncate">{p2 ? p2.name : '미정'}</span>
                      {p2 && <img src={p2.sprite} alt="" className="w-5 h-5 object-contain" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 8강 */}
            <div className="space-y-6 flex flex-col justify-around">
              {Array.from({ length: 4 }).map((_, i) => {
                const match = round8Matches[i];
                return (
                  <div key={i} className="bg-slate-900/80 p-2 rounded-xl border border-slate-800 text-left text-xs space-y-1">
                    <div className="text-[10px] text-slate-500 font-mono mb-1">8강 매치 #{i + 1}</div>
                    {match ? (
                      <div className="p-1 rounded bg-amber-950/70 text-amber-300 font-bold border border-amber-500/40 flex items-center justify-between">
                        <span className="truncate">{match.winner.name}</span>
                        <img src={match.winner.sprite} alt="" className="w-5 h-5 object-contain" />
                      </div>
                    ) : (
                      <div className="p-1 text-slate-500 italic">대기 중...</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Column 4강 */}
            <div className="space-y-12 flex flex-col justify-around">
              {Array.from({ length: 2 }).map((_, i) => {
                const match = round4Matches[i];
                return (
                  <div key={i} className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-left text-xs space-y-1">
                    <div className="text-[10px] text-slate-500 font-mono mb-1">준결승 #{i + 1}</div>
                    {match ? (
                      <div className="p-1.5 rounded bg-amber-950/70 text-amber-300 font-bold border border-amber-500/40 flex items-center justify-between">
                        <span className="truncate">{match.winner.name}</span>
                        <img src={match.winner.sprite} alt="" className="w-6 h-6 object-contain" />
                      </div>
                    ) : (
                      <div className="p-1 text-slate-500 italic">대기 중...</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Column Final & Champion */}
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="w-full bg-slate-900/90 p-3 rounded-xl border border-amber-500/50 text-left text-xs space-y-2">
                <div className="text-[10px] text-amber-400 font-bold uppercase flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>대망의 결승전</span>
                </div>
                {finalMatch ? (
                  <div className="space-y-1.5">
                    <div className="text-slate-200">
                      우승: <strong className="text-amber-300">{finalMatch.winner.name}</strong>
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      준우승: {finalMatch.loser.name}
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500 italic">결승전 대기 중...</div>
                )}
              </div>

              {winner && (
                <div className="bg-amber-500/20 border border-amber-400 p-3 rounded-2xl text-center space-y-1">
                  <span className="text-xs font-bold text-amber-300 block">👑 최종 챔피언</span>
                  <img src={winner.image} alt="" className="w-16 h-16 mx-auto object-contain filter drop-shadow" />
                  <span className="font-black text-white text-sm block">{winner.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
