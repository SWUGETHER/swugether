import refreshToken from "../API/user/refreshToken";
import { signOut, updateToken } from "../redux/actions/user";

const getToken = async (state, dispatch) => {
  const now = new Date();
  let new_accessToken;
  const access_token = state["userReducer"]["accessToken"];
  const refresh_token = state["userReducer"]["refreshToken"];
  const accessToken_expiration = state["userReducer"]["accessToken_expiration"];
  const refreshToken_expiration =
    state["userReducer"]["refreshToken_expiration"];

  if (now > refreshToken_expiration) {
    dispatch(signOut());
    throw new Error("Login Required.");
  }

  if (now > accessToken_expiration) {
    const new_accessToken_expiration = new Date(
      new Date().getTime() + 60 * 1000 * 60 * 2
    );
    const new_refreshToken_expiration = new Date(
      new Date().getTime + 60 * 1000 * 60 * 24 * 7
    );
    const { newAccessToken, newRefreshToken } = await refreshToken(
      access_token,
      refresh_token
    );

    dispatch(
      updateToken(
        newAccessToken,
        newRefreshToken,
        new_accessToken_expiration,
        new_refreshToken_expiration
      )
    );

    new_accessToken = newAccessToken;
  } else {
    new_accessToken = access_token;
  }

  return new_accessToken;
};

export default getToken;
