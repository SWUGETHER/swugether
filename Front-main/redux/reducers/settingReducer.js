// 초기 상태
const initialState = {
  version: null,
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_VERSION":
      return {
        ...state,
        version: action.version,
      };
    default:
      return state;
  }
};
