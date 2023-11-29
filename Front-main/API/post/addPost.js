import { apiClient } from "../apiClient";
import getToken from "../../util/getToken";
import { API_BASE_URL } from "react-native-dotenv";

const addPost = async (state, dispatch, title, content, images) => {
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
    const postId = await apiClient
      .post(`${API_BASE_URL}/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res) {
          return res["data"]["post_id"];
        }

        return res;
      });

    return postId;
  } catch (error) {
    console.error(error);
  }
};

export default addPost;
