import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';
import { LEVEL_GOAL, WEAPON_PRICES } from '../constants';

const gameSlice = createSlice({
  name: 'game',
  initialState: initState.game,
  reducers: {
    startGame(state) {
      return { ...state, started: true, score: 0 };
    },
    countPoints(state, action) {
      return { ...state, score: action.payload };
    },
    finishGame(state) {
      return { ...state, started: false };
    },
    setTotalScore(state, action) {
      return { ...state, totalScore: action.payload };
    },
    setLevelUp(state, action) {
      return {
        ...state,
        level: action.payload,
        score: 0,
        goal: LEVEL_GOAL[action.payload - 1],
      };
    },
    startNewGame() {
      return initState.game;
    },
    setWeaponLevelUp(state, action) {
      return {
        ...state,
        weapon: action.payload,
        weaponPrice: WEAPON_PRICES[action.payload],
      };
    },
    decreaseTotalScore(state, action) {
      return { ...state, totalScore: action.payload };
    },
    pauseGame(state) {
      return { ...state, started: false };
    },
    resumeGame(state) {
      return { ...state, started: true };
    },
  },
});

export const {
  startGame,
  countPoints,
  finishGame,
  setTotalScore,
  setLevelUp,
  startNewGame,
  setWeaponLevelUp,
  decreaseTotalScore,
  pauseGame, resumeGame,
} = gameSlice.actions;

export const getGameSelector = (state) => state.game;

export const gameReducer = gameSlice.reducer;
