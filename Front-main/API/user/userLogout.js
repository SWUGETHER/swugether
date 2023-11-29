import { apiClient } from "../apiClient";
import getToken from "../../util/getToken";
import { API_BASE_URL } from "react-native-dotenv";

const userLogout = async (state, dispatch) => {
  const accessToken = await getToken(state, dispatch);

  try {
    await apiClient.post(`${API_BASE_URL}/user/logout`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

export default userLogout;
