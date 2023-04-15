import { configureStore } from '@reduxjs/toolkit';
import { getInitState } from './initState';
import { moleReducer } from './slices/moleSlice';
import { gameReducer } from './slices/gameSlice';
import { soundReducer } from './slices/soundSlice';

export const store = configureStore({
  reducer: {
    mole: moleReducer,
    game: gameReducer,
    sound: soundReducer,
  },
  preloadedState: getInitState(),
});
