import React, { useState } from 'react';
import { Pokemon } from './data/pokemonData';
import { GameStage, RoundName, MatchHistory } from './types';
import { Header } from './components/Header';
import { RosterSelection } from './components/RosterSelection';
import { MatchScreen } from './components/MatchScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { BracketModal } from './components/BracketModal';
import { HistoryModal } from './components/HistoryModal';
import { sound } from './utils/audio';

export default function App() {
  const [stage, setStage] = useState<GameStage>('selection');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [rosterType, setRosterType] = useState<string>('랜덤 16강');

  // Tournament state
  const [initial16, setInitial16] = useState<Pokemon[]>([]);
  const [currentRoundName, setCurrentRoundName] = useState<RoundName>('16강');
  const [roundPokemonList, setRoundPokemonList] = useState<Pokemon[]>([]);
  const [nextRoundPokemonList, setNextRoundPokemonList] = useState<Pokemon[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [matchHistory, setMatchHistory] = useState<MatchHistory[]>([]);
  const [winner, setWinner] = useState<Pokemon | null>(null);
  const [runnerUp, setRunnerUp] = useState<Pokemon | null>(null);

  // Modals
  const [showBracketModal, setShowBracketModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  // Start Tournament with selected 16 Pokemon
  const handleStartTournament = (selectedPokemon: Pokemon[], presetTitle: string) => {
    setInitial16(selectedPokemon);
    setRosterType(presetTitle);
    setCurrentRoundName('16강');
    setRoundPokemonList(selectedPokemon);
    setNextRoundPokemonList([]);
    setCurrentIndex(0);
    setMatchHistory([]);
    setWinner(null);
    setRunnerUp(null);
    setStage('tournament');
    sound.playSelect();
  };

  // Process winner of current match
  const handleSelectWinner = (matchWinner: Pokemon, matchLoser: Pokemon) => {
    const newHistoryItem: MatchHistory = {
      round: currentRoundName,
      winner: matchWinner,
      loser: matchLoser,
    };

    const updatedHistory = [...matchHistory, newHistoryItem];
    setMatchHistory(updatedHistory);

    const updatedNext = [...nextRoundPokemonList, matchWinner];
    setNextRoundPokemonList(updatedNext);

    const nextIndex = currentIndex + 1;
    const totalMatchesInRound = roundPokemonList.length / 2;

    if (nextIndex < totalMatchesInRound) {
      // Advance to next match in same round
      setCurrentIndex(nextIndex);
    } else {
      // Round completed! Advance to next round or finish
      if (currentRoundName === '16강') {
        setCurrentRoundName('8강');
        setRoundPokemonList(updatedNext);
        setNextRoundPokemonList([]);
        setCurrentIndex(0);
      } else if (currentRoundName === '8강') {
        setCurrentRoundName('4강');
        setRoundPokemonList(updatedNext);
        setNextRoundPokemonList([]);
        setCurrentIndex(0);
      } else if (currentRoundName === '4강') {
        setCurrentRoundName('결승전');
        setRoundPokemonList(updatedNext);
        setNextRoundPokemonList([]);
        setCurrentIndex(0);
      } else if (currentRoundName === '결승전') {
        // Championship Winner!
        setWinner(matchWinner);
        setRunnerUp(matchLoser);
        setStage('winner');
      }
    }
  };

  // Reset to roster selection
  const handleReset = () => {
    setStage('selection');
    setWinner(null);
    setRunnerUp(null);
    setMatchHistory([]);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
  };

  const totalMatchesInCurrentRound = roundPokemonList.length > 0 ? roundPokemonList.length / 2 : 0;
  const leftPokemon = roundPokemonList[currentIndex * 2];
  const rightPokemon = roundPokemonList[currentIndex * 2 + 1];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      <Header
        roundName={currentRoundName}
        matchIndex={currentIndex}
        totalMatches={totalMatchesInCurrentRound}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenBracket={() => setShowBracketModal(true)}
        onOpenHistory={() => setShowHistoryModal(true)}
        onReset={handleReset}
        isGameActive={stage === 'tournament'}
      />

      <main className="flex-1 flex flex-col items-center justify-start pb-12">
        {stage === 'selection' && (
          <RosterSelection onStartGame={handleStartTournament} />
        )}

        {stage === 'tournament' && leftPokemon && rightPokemon && (
          <MatchScreen
            roundName={currentRoundName}
            matchIndex={currentIndex}
            totalMatches={totalMatchesInCurrentRound}
            leftPokemon={leftPokemon}
            rightPokemon={rightPokemon}
            onSelectWinner={handleSelectWinner}
          />
        )}

        {stage === 'winner' && winner && (
          <VictoryScreen
            winner={winner}
            runnerUp={runnerUp}
            matchHistory={matchHistory}
            onRestart={handleReset}
            rosterType={rosterType}
          />
        )}
      </main>

      {/* Bracket View Modal */}
      {showBracketModal && (
        <BracketModal
          matchHistory={matchHistory}
          current16={initial16}
          winner={winner}
          onClose={() => setShowBracketModal(false)}
        />
      )}

      {/* History Records Modal */}
      {showHistoryModal && (
        <HistoryModal onClose={() => setShowHistoryModal(false)} />
      )}
    </div>
  );
}
