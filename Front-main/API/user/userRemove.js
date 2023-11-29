import { apiClient } from "../apiClient";
import { API_BASE_URL } from "react-native-dotenv";
import getToken from "../../util/getToken";

const userRemove = async (state, dispatch) => {
  const accessToken = await getToken(state, dispatch);

  try {
    await apiClient.post(`${API_BASE_URL}/user/leave`, null, {
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

export default userRemove;
