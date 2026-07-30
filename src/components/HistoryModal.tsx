import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChampionRecord } from '../types';
import { X, History, Trophy, Trash2 } from 'lucide-react';

interface HistoryModalProps {
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ onClose }) => {
  const [history, setHistory] = useState<ChampionRecord[]>([]);

  useEffect(() => {
    try {
      const data = localStorage.getItem('pokemon_worldcup_champions');
      if (data) {
        setHistory(JSON.parse(data));
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleClear = () => {
    if (confirm('역대 챔피언 기록을 모두 삭제하시겠습니까?')) {
      localStorage.removeItem('pokemon_worldcup_champions');
      setHistory([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-6 max-h-[85vh] overflow-hidden flex flex-col relative"
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
            <History className="w-5 h-5 text-cyan-400" />
            <span>역대 챔피언 전당 (기록)</span>
          </h3>
          <p className="text-xs text-slate-400">내가 선택한 우승 포켓몬들의 무패 행진 기록입니다.</p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 p-1">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              <Trophy className="w-12 h-12 text-slate-700 mx-auto mb-2 opacity-50" />
              <span>아직 우승 기록이 없습니다. 월드컵을 진행하여 첫 챔피언을 탄생시켜보세요!</span>
            </div>
          ) : (
            history.map(rec => (
              <div
                key={rec.id}
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img src={rec.winner.sprite} alt={rec.winner.name} className="w-12 h-12 object-contain" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-amber-300 text-base">{rec.winner.name}</span>
                      <span className="text-xs text-slate-400">({rec.winner.category})</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {rec.date} | 라인업: {rec.rosterType || '기본'}
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <div className="font-mono text-amber-400 font-bold">능력치 {rec.winner.stats.total}</div>
                  {rec.runnerUp && <div className="text-slate-500">결승 상대: {rec.runnerUp.name}</div>}
                </div>
              </div>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div className="pt-2 flex justify-between items-center border-t border-slate-800">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>기록 전체 초기화</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
            >
              닫기
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
