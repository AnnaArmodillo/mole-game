export const initState = {
  mole: {
    row: '',
    column: '',
  },
  game: {
    started: false,
    score: 0,
    level: 1,
    totalScore: 0,
    goal: 200,
  },
};

export const getInitState = () => initState;
