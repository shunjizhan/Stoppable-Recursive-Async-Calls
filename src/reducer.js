
const UPDATE_TIMESPAN = 'UPDATE_TIMESPAN';

const defaultState = {
  timespan: 0
}
const reducer = (state = defaultState, action) => {
  const { type, data } = action;

  switch (type) {
    case UPDATE_TIMESPAN:
      const { timespan } = data;
      console.log('---------------------------------');
      console.log(`updating timespan to [${timespan}]`);
      console.log('---------------------------------');
      return { timespan };

    default:
      return state;
  }
};

export {
  UPDATE_TIMESPAN,
}
export default reducer;