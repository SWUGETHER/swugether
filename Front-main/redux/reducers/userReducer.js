// 초기 상태
const initialState = {
  userId: null,
  email: null,
  accessToken: null,
  refreshToken: null,
  accessToken_expiration: null,
  refreshToken_expiration: null,
  isAdmin: false,
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        userId: action.userId,
        email: action.email,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        accessToken_expiration: action.accessToken_expiration,
        refreshToken_expiration: action.refreshToken_expiration,
        isAdmin: action.isAdmin,
      };
    case "SIGNOUT":
      return {
        ...state,
        userId: null,
        email: null,
        accessToken: null,
        refreshToken: null,
        accessToken_expiration: null,
        refreshToken_expiration: null,
        isAdmin: false,
      };
    case "REFRESH":
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        accessToken_expiration: action.accessToken_expiration,
        refreshToken_expiration: action.refreshToken_expiration,
      };
    default:
      return state;
  }
};
