import { MOLE_TIME } from './constants';

export function getPoints(timeLeft, lives) {
  return ((timeLeft * 100 * lives) / MOLE_TIME).toFixed();
}
