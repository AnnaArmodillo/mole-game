import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

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
  },
});

export const { startGame, countPoints, finishGame } = gameSlice.actions;

export const getGameSelector = (state) => state.game;

export const gameReducer = gameSlice.reducer;
