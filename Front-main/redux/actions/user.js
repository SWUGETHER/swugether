export const SIGNIN = "SIGNIN";
export const SIGNOUT = "SIGNOUT";
export const REFRESH = "REFRESH";

export const signIn = (
  userId,
  email,
  accessToken,
  refreshToken,
  accessToken_expiration,
  refreshToken_expiration,
  isAdmin
) => {
  return {
    type: SIGNIN,
    userId: userId,
    email: email,
    accessToken: accessToken,
    refreshToken: refreshToken,
    accessToken_expiration: accessToken_expiration,
    refreshToken_expiration: refreshToken_expiration,
    isAdmin: isAdmin,
  };
};

export const signOut = () => {
  return { type: SIGNOUT };
};

export const updateToken = (
  accessToken,
  refreshToken,
  accessToken_expiration,
  refreshToken_expiration
) => {
  return {
    type: REFRESH,
    accessToken: accessToken,
    refreshToken: refreshToken,
    accessToken_expiration: accessToken_expiration,
    refreshToken_expiration: refreshToken_expiration,
  };
};
