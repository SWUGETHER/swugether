import { apiClient } from "../apiClient";
import getToken from "../../util/getToken";
import { API_BASE_URL } from "react-native-dotenv";

const readList = async (state, dispatch, order) => {
  const accessToken = await getToken(state, dispatch);

  try {
    const data = await apiClient
      .get(`${API_BASE_URL}/post`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { order: order },
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

export default readList;
