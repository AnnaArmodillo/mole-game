import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';
import { getRandomNumber } from '../helper';

const moleSlice = createSlice({
  name: 'mole',
  initialState: initState.mole,
  reducers: {
    setMole() {
      return {
        row: getRandomNumber(1, 9),
        column: getRandomNumber(1, 9),
        lives: getRandomNumber(1, 4),
      };
    },
    clearMole() {
      return initState.mole;
    },
  },
});

export const {
  setMole, clearMole,
} = moleSlice.actions;

export const getMoleSelector = (state) => state.mole;

export const moleReducer = moleSlice.reducer;
