import { apiClient } from "../apiClient";
import getToken from "../../util/getToken";
import { API_BASE_URL } from "react-native-dotenv";

const deletePost = async (state, dispatch, postId) => {
  const accessToken = await getToken(state, dispatch);

  try {
    await apiClient.delete(`${API_BASE_URL}/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default deletePost;
