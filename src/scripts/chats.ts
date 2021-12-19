import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { MESSAGE_NOTIFICATION } from "../endpoints";

export async function sendMessageNotification(userReceiverEmail: string, messageBody: string) {
  try {
    const res = await sendAPIrequest(() => axios.post(
      `${API_URL}${MESSAGE_NOTIFICATION}`, {
        user_receiver_email: userReceiverEmail,
        message_body: messageBody
      },
      getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve('');
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}
