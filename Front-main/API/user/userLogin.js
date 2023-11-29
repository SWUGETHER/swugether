import { apiClient } from "../apiClient";
import { API_BASE_URL } from "react-native-dotenv";

const userLogin = async (id_token) => {
  let userId, email, accessToken, refreshToken, isAdmin;
  const accessToken_expiration = new Date(
    new Date().getTime() + 60 * 1000 * 60 * 2
  );
  const refreshToken_expiration = new Date(
    new Date().getTime + 60 * 1000 * 60 * 24 * 7
  );

  try {
    await apiClient
      .post(`${API_BASE_URL}/user/login`, null, {
        headers: {
          "id-token": id_token,
        },
      })
      .then((res) => {
        userId = res.data.data["userId"];
        email = res.data.data["email"];
        accessToken = res.data.data["accessToken"];
        refreshToken = res.data.data["refreshToken"];
        isAdmin = res.data.data["isAdmin"];
      });

    return {
      userId,
      email,
      accessToken,
      refreshToken,
      accessToken_expiration,
      refreshToken_expiration,
      isAdmin,
    };
  } catch (error) {
    console.error(error);
  }
};

export default userLogin;
