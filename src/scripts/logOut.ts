import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { LOGOUT } from "../endpoints";

export async function postLogOut() {
  try {
    const res = await sendAPIrequest(() => axios.post(
      `${API_URL}${LOGOUT}`, {}, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    console.log(res.data);
    return Promise.resolve('');
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}
