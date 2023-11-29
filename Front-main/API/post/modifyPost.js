import { apiClient } from "../apiClient";
import getToken from "../../util/getToken";
import { API_BASE_URL } from "react-native-dotenv";

const modifyPost = async (state, dispatch, postId, title, content, images) => {
  const accessToken = await getToken(state, dispatch);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  images.map((image) =>
    formData.append("images", {
      uri: image.uri,
      type: image.type,
      name: image.name,
    })
  );

  try {
    await apiClient.patch(`${API_BASE_URL}/post/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default modifyPost;
