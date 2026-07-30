import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Pokemon, TYPE_MAP, PokemonType } from '../data/pokemonData';
import { MatchHistory } from '../types';
import { PokemonStatBar } from './PokemonStatBar';
import { sound } from '../utils/audio';
import { Trophy, Sparkles, Share2, RotateCcw, PartyPopper, Bot, Check, Flame } from 'lucide-react';

interface VictoryScreenProps {
  winner: Pokemon;
  runnerUp: Pokemon | null;
  matchHistory: MatchHistory[];
  onRestart: () => void;
  rosterType: string;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  winner,
  runnerUp,
  matchHistory,
  onRestart,
  rosterType,
}) => {
  const [commentary, setCommentary] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Trigger celebration effects
  const fireConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 300);
  };

  useEffect(() => {
    sound.playVictory();
    fireConfetti();

    // Fetch AI victory commentary from Express server route
    const fetchCommentary = async () => {
      try {
        setLoadingAi(true);
        const res = await fetch('/api/victory-commentary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            winner,
            runnerUp,
            matchesWon: 4,
          }),
        });
        const data = await res.json();
        setTitle(data.title || `챔피언 ${winner.name}!`);
        setCommentary(data.commentary || `${winner.name}이(가) 치열한 16강 경쟁을 뚫고 대망의 포켓몬 월드컵 우승을 차지했습니다!`);
      } catch (err) {
        console.error('Failed to load AI commentary:', err);
        setTitle(`영광의 챔피언, ${winner.name}!`);
        setCommentary(
          `🎉 축하합니다! ${winner.name}이(가) 전 세계 포켓몬 팬들의 사랑을 받으며 제1회 포켓몬 16강 월드컵 최종 챔피언에 올랐습니다! ${winner.types.join(', ')} 타입의 강력함과 독보적인 매력으로 왕좌를 차지했습니다!`
        );
      } finally {
        setLoadingAi(false);
      }
    };

    fetchCommentary();

    // Save Champion to localStorage history
    try {
      const existing = localStorage.getItem('pokemon_worldcup_champions');
      const list = existing ? JSON.parse(existing) : [];
      const newRecord = {
        id: String(Date.now()),
        date: new Date().toLocaleDateString('ko-KR'),
        winner,
        runnerUp,
        rosterType,
      };
      localStorage.setItem('pokemon_worldcup_champions', JSON.stringify([newRecord, ...list].slice(0, 20)));
    } catch {
      // Ignore storage errors
    }
  }, [winner]);

  const handleCopyShare = () => {
    const text = `🏆 [포켓몬 16강 월드컵 결과]\n최종 챔피언: ${winner.name} (${winner.category})\n총 종족값: ${winner.stats.total}\n준우승: ${runnerUp ? runnerUp.name : '없음'}\n나만의 16강 월드컵에서 챔피언을 확인해보세요!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const primaryType = winner.types[0] as PokemonType;
  const primaryDetail = TYPE_MAP[primaryType] || TYPE_MAP.normal;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Victory Stage Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-b from-amber-950/80 via-slate-900 to-slate-950 p-6 sm:p-10 rounded-3xl border-2 border-amber-400/80 shadow-[0_0_50px_rgba(251,191,36,0.25)] text-center space-y-6 overflow-hidden"
      >
        {/* Glowing background spotlights */}
        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-amber-400/10 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* Floating Crown / Trophy Icon */}
        <div className="flex justify-center items-center gap-2">
          <motion.div
            animate={{ rotate: [-5, 5, -5], y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 p-1 shadow-xl shadow-amber-400/50 flex items-center justify-center"
          >
            <Trophy className="w-9 h-9 text-slate-950" />
          </motion.div>
        </div>

        <div>
          <span className="inline-block text-xs font-black tracking-widest text-amber-300 uppercase bg-amber-950/80 px-4 py-1.5 rounded-full border border-amber-500/50 mb-2">
            🏆 16강 월드컵 최종 우승 🏆
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            축하합니다! <span className="text-amber-400">{winner.name}</span>이(가) 챔피언입니다!
          </h2>
        </div>

        {/* Champion Art Container */}
        <div className="relative w-56 h-56 sm:w-72 sm:h-72 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-amber-400/40 animate-spin-slow" />
          <motion.img
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            src={winner.image}
            alt={winner.name}
            className="w-48 h-48 sm:w-64 sm:h-64 object-contain filter drop-shadow-[0_15px_25px_rgba(251,191,36,0.4)] z-10"
          />
        </div>

        {/* Type Badges & Stat Summary */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {winner.types.map(t => {
            const info = TYPE_MAP[t as PokemonType] || TYPE_MAP.normal;
            return (
              <span key={t} className={`px-3 py-1 text-sm font-bold rounded-lg ${info.bg} ${info.text}`}>
                {info.ko} 타입
              </span>
            );
          })}
          <span className="px-3 py-1 text-sm font-bold rounded-lg bg-slate-800 text-amber-300 border border-slate-700">
            총 종족값: {winner.stats.total}
          </span>
        </div>

        {/* AI Victory Speech Box */}
        <div className="max-w-2xl mx-auto bg-slate-950/90 p-5 rounded-2xl border border-amber-500/40 text-left space-y-2 shadow-inner">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-amber-400" />
              <span>포켓몬 챔피언 축하 해설 멘트</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Gemini AI Studio</span>
          </div>

          {loadingAi ? (
            <div className="py-4 space-y-2 animate-pulse">
              <div className="h-4 bg-slate-800 rounded w-3/4" />
              <div className="h-4 bg-slate-800 rounded w-full" />
              <div className="h-4 bg-slate-800 rounded w-5/6" />
            </div>
          ) : (
            <div className="space-y-1.5 pt-1">
              {title && <h4 className="font-extrabold text-base text-amber-300">{title}</h4>}
              <p className="text-sm text-slate-200 leading-relaxed font-medium">{commentary}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={fireConfetti}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <PartyPopper className="w-4 h-4" />
            <span>축하 폭죽 다시 터뜨리기</span>
          </button>

          <button
            type="button"
            onClick={handleCopyShare}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-cyan-400" />}
            <span>{copied ? '결과 복사 완료!' : '우승 결과 공유하기'}</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>새 16강 시작하기</span>
          </button>
        </div>
      </motion.div>

      {/* Champion Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <span>챔피언 {winner.name}의 상세 능력치</span>
          </h3>
          <PokemonStatBar stats={winner.stats} />
        </div>

        {/* Tournament Path to Victory */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>챔피언의 승리 여정 (대진 승리 기록)</span>
          </h3>

          <div className="space-y-3">
            {matchHistory.length === 0 ? (
              <p className="text-xs text-slate-400">경기 기록이 없습니다.</p>
            ) : (
              matchHistory.map((m, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400 w-16">{m.round}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-emerald-400">{m.winner.name}</span>
                    <span className="text-slate-500">VS</span>
                    <span className="text-slate-400 line-through">{m.loser.name}</span>
                  </div>
                  <img src={m.winner.sprite} alt={m.winner.name} className="w-8 h-8 object-contain" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
