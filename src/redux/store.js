import { configureStore } from '@reduxjs/toolkit';
import { getInitState } from './initState';
import { molesReducer } from './slices/molesSlice';

export const store = configureStore({
  reducer: {
    moles: molesReducer,
  },
  preloadedState: getInitState(),
});
