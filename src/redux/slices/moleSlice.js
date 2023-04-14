import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';
import { getRandomNumber } from '../helper';

const moleSlice = createSlice({
  name: 'mole',
  initialState: initState.mole,
  reducers: {
    setMole() {
      return {
        hidden: false,
        row: getRandomNumber(),
        column: getRandomNumber(),
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
