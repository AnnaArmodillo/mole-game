export const initState = {
  mole: {
    row: '',
    column: '',
  },
  game: {
    started: false,
    score: 0,
  },
};

export const getInitState = () => initState;
