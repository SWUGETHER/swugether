import { apiClient } from "../apiClient";
import getToken from "../../util/getToken";
import { API_BASE_URL } from "react-native-dotenv";

const readLikeList = async (state, dispatch) => {
  const accessToken = await getToken(state, dispatch);

  try {
    const data = await apiClient
      .get(`${API_BASE_URL}/post/like`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res) {
          return res["data"]["data"];
        }
        return res;
      });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default readLikeList;
