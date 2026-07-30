import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Pokemon, POKEMON_LIST, PRESET_ROSTERS, getRandom16Pokemon, TYPE_MAP, PokemonType } from '../data/pokemonData';
import { Play, Shuffle, CheckCircle2, Sparkles, Filter, Info } from 'lucide-react';

interface RosterSelectionProps {
  onStartGame: (selectedPokemon: Pokemon[], presetTitle: string) => void;
}

export const RosterSelection: React.FC<RosterSelectionProps> = ({ onStartGame }) => {
  const [presetId, setPresetId] = useState<string>('random');
  const [selectedRoster, setSelectedRoster] = useState<Pokemon[]>(() => getRandom16Pokemon('random'));
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);

  const handleSelectPreset = (id: string) => {
    setPresetId(id);
    const newRoster = getRandom16Pokemon(id);
    setSelectedRoster(newRoster);
  };

  const handleShuffle = () => {
    setSelectedRoster(getRandom16Pokemon(presetId));
  };

  const handleTogglePokemonInCustom = (pokemon: Pokemon) => {
    const exists = selectedRoster.some(p => p.id === pokemon.id);
    if (exists) {
      if (selectedRoster.length <= 16) return; // Keep at least 16
      setSelectedRoster(selectedRoster.filter(p => p.id !== pokemon.id));
    } else {
      if (selectedRoster.length >= 16) return; // Max 16
      setSelectedRoster([...selectedRoster, pokemon]);
    }
  };

  const currentPresetObj = PRESET_ROSTERS.find(p => p.id === presetId) || PRESET_ROSTERS[0];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wide">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>공식 포켓몬 16강 이상형 월드컵</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          당신의 최애 <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">포켓몬 챔피언</span>을 뽑아주세요!
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          16마리의 포켓몬이 일대일 배틀로 겨룹니다. 각 포켓몬의 상세 능력치(HP, 공격, 방어, 스피드)와 타입을 비교하며 이상형을 결정하세요!
        </p>

        {/* Start Game Button */}
        <div className="pt-4 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => onStartGame(selectedRoster, currentPresetObj.title)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-lg sm:text-xl shadow-xl shadow-amber-500/25 border-2 border-amber-300 flex items-center gap-3 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-slate-950" />
            <span>16강 토너먼트 시작하기</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Roster Preset Selector */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Filter className="w-5 h-5 text-amber-400" />
              <span>대진 라인업 선택</span>
            </h3>
            <p className="text-xs text-slate-400">참가시킬 포켓몬 테마를 선택하거나 직접 16마리를 구성하세요.</p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleShuffle}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Shuffle className="w-4 h-4 text-amber-400" />
              <span>다시 셔플</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCustomizing(!isCustomizing)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isCustomizing
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <span>{isCustomizing ? '선택 완료' : '직접 16마리 선택'}</span>
            </button>
          </div>
        </div>

        {/* Preset Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_ROSTERS.map(preset => {
            const isSelected = preset.id === presetId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-sm font-bold ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                      {preset.title}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">{preset.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Picker Modal/Grid if isCustomizing */}
      {isCustomizing && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-amber-500/40 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              <span>전체 도감에서 선택 (현재 {selectedRoster.length}/16마리 선택됨)</span>
            </h4>
            <span className="text-xs text-amber-400 font-semibold">16마리를 채우면 참가 준비가 완료됩니다.</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-96 overflow-y-auto p-2 bg-slate-950/80 rounded-xl border border-slate-800">
            {POKEMON_LIST.map(p => {
              const isPicked = selectedRoster.some(s => s.id === p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleTogglePokemonInCustom(p)}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer relative ${
                    isPicked
                      ? 'bg-amber-950/60 border-amber-400 text-white ring-1 ring-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <img src={p.sprite} alt={p.name} className="w-12 h-12 object-contain" />
                  <span className="text-xs font-bold truncate w-full text-center">{p.name}</span>
                  {isPicked && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-slate-950" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected 16 Pokémon Grid Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center justify-between">
          <span>참가 확정 16강 대표 포켓몬 목록</span>
          <span className="text-xs font-mono text-amber-400 font-semibold">총 {selectedRoster.length}마리</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {selectedRoster.map((p, idx) => {
            const primaryType = p.types[0] as PokemonType;
            const typeInfo = TYPE_MAP[primaryType] || TYPE_MAP.normal;

            return (
              <motion.div
                key={`${p.id}-${idx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.02 }}
                className="bg-slate-900/90 rounded-xl border border-slate-800 p-2.5 flex flex-col items-center text-center hover:border-slate-700 transition-all group"
              >
                <div className="w-16 h-16 flex items-center justify-center p-1 relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-contain filter drop-shadow group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-xs font-extrabold text-white mt-1 truncate w-full">{p.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 mt-1 rounded font-semibold ${typeInfo.bg} ${typeInfo.text}`}>
                  {typeInfo.ko}
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                  능력치 {p.stats.total}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
