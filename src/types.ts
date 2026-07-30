import { Pokemon } from './data/pokemonData';

export type GameStage = 'selection' | 'tournament' | 'winner';

export type RoundName = '16강' | '8강' | '4강' | '결승전';

export interface MatchHistory {
  round: RoundName;
  winner: Pokemon;
  loser: Pokemon;
}

export interface TournamentState {
  currentRoundName: RoundName;
  roundPokemonList: Pokemon[];
  nextRoundPokemonList: Pokemon[];
  currentIndex: number;
  matchHistory: MatchHistory[];
  winner: Pokemon | null;
  runnerUp: Pokemon | null;
}

export interface ChampionRecord {
  id: string;
  date: string;
  winner: Pokemon;
  runnerUp: Pokemon;
  rosterType: string;
}
