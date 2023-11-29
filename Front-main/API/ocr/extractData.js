import { apiClient } from "../apiClient";
import { API_BASE_URL } from "react-native-dotenv";

const extractData = async (formData) => {
  try {
    const data = await apiClient
      .post(`${API_BASE_URL}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res) {
          return res["data"];
        }
        return res;
      });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default extractData;
