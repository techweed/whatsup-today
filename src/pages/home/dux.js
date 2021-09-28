//dummy react project
export const setweathers = (weathers) => ({
  type: "SET_WEATHERS",
  data: weathers,
});

const initialState = {
  weathers: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WEATHERS":
      return {
        ...state,
        weathers: action.data,
      };

    default:
      return state;
  }
};

export function getweathers(state) {
  return state.homeReducer.weathers;
}

export default homeReducer;
