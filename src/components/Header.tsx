import React from 'react';
import { Volume2, VolumeX, GitFork, RotateCcw, Trophy, History } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  roundName?: string;
  matchIndex?: number;
  totalMatches?: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenBracket?: () => void;
  onOpenHistory?: () => void;
  onReset: () => void;
  isGameActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  roundName,
  matchIndex = 0,
  totalMatches = 0,
  soundEnabled,
  onToggleSound,
  onOpenBracket,
  onOpenHistory,
  onReset,
  isGameActive,
}) => {
  return (
    <header className="w-full bg-slate-900/95 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md px-4 sm:px-6 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-amber-400 p-0.5 shadow-md shadow-red-500/30 flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1/2 bg-red-600" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-slate-950 z-10" />
              <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-slate-950 z-20 shadow-sm" />
            </div>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-1.5">
              <span>포켓몬 <span className="text-amber-400">16강</span> 월드컵</span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">나만의 최애 포켓몬 챔피언 가리기</p>
          </div>
        </div>

        {/* Center Progress Indicator if Game is Active */}
        {isGameActive && roundName && (
          <div className="hidden md:flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-4 py-1.5 rounded-full shadow-inner">
            <Trophy className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-extrabold text-amber-300 text-sm sm:text-base">{roundName}</span>
            <span className="text-slate-500 text-xs">|</span>
            <span className="text-slate-300 text-xs font-mono">
              경기 <strong className="text-amber-400">{matchIndex + 1}</strong> / {totalMatches}
            </span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenBracket && (
            <button
              type="button"
              onClick={onOpenBracket}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="대진표 보기"
            >
              <GitFork className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">대진표</span>
            </button>
          )}

          {onOpenHistory && (
            <button
              type="button"
              onClick={onOpenHistory}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="역대 챔피언 기록"
            >
              <History className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">기록</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) sound.playSelect();
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title={soundEnabled ? '효과음 끄기' : '효과음 켜기'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/60 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="처음으로 돌아가기"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">다시 시작</span>
          </button>
        </div>
      </div>
    </header>
  );
};
