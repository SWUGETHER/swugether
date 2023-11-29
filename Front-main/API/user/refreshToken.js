import { apiClient } from "../apiClient";
import { API_BASE_URL } from "react-native-dotenv";

const refreshToken = async (accessToken, refreshToken) => {
  let newAccessToken, newRefreshToken;
  try {
    await apiClient
      .post(`${API_BASE_URL}/user/refresh`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Refresh: `Bearer ${refreshToken}`,
        },
      })
      .then((res) => {
        newAccessToken = res.data.data["accessToken"];
        newRefreshToken = res.data.data["refreshToken"];
      });

    return { newAccessToken, newRefreshToken };
  } catch (error) {
    console.error(error);
  }
};

export default refreshToken;
