import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const molesSlice = createSlice({
  name: 'moles',
  initialState: initState.moles,
  reducers: {
    setMoles(_, action) {
      return action.payload;
    },
  },
});

export const {
  setMoles,
} = molesSlice.actions;

export const getMolesSelector = (state) => state.moles;

export const molesReducer = molesSlice.reducer;
