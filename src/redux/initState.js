export const initState = {
  mole: {
    row: '',
    column: '',
    size: '',
    lives: '',
  },
  game: {
    started: false,
    score: 0,
    level: 1,
    totalScore: 0,
    goal: 200,
    weapon: 0,
    weaponPrice: 500,
  },
  sound: false,
};

export const getInitState = () => initState;
