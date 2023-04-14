import { configureStore } from '@reduxjs/toolkit';
import { getInitState } from './initState';
import { moleReducer } from './slices/moleSlice';
import { gameReducer } from './slices/gameSlice';

export const store = configureStore({
  reducer: {
    mole: moleReducer,
    game: gameReducer,
  },
  preloadedState: getInitState(),
});
