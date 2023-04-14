import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';
import { getRandomNumber } from '../helper';
import { MOLE_SIZE } from '../constants';

const moleSlice = createSlice({
  name: 'mole',
  initialState: initState.mole,
  reducers: {
    setMole() {
      return {
        row: getRandomNumber(1, 9),
        column: getRandomNumber(1, 9),
        size: MOLE_SIZE[getRandomNumber(0, 3)],
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
