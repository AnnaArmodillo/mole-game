import { MOLE_TIME } from './constants';

export function getPoints(timeLeft) {
  return ((timeLeft * 100) / MOLE_TIME).toFixed();
}
