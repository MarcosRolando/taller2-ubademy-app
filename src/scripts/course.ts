import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { COURSES } from "../endpoints";

export default async function getCourseInfo() {
  try {
    const res = await sendAPIrequest(() => axios.get(
    `${API_URL}${COURSES}/6192b41db810e014bbe14315`, getAxiosConfig()));
    if (res.data['status'] == 'error') {
      switch (res.data["message"]) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    console.log(res.data);
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error("Error when trying to reach the server"));
  }
}