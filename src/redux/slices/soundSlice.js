import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const soundSlice = createSlice({
  name: 'sound',
  initialState: initState.sound,
  reducers: {
    setSound(state) {
      return !state;
    },
  },
});

export const {
  setSound,
} = soundSlice.actions;

export const getSoundSelector = (state) => state.sound;

export const soundReducer = soundSlice.reducer;
