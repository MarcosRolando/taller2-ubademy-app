import axios, { AxiosResponse } from "axios";
import { ERROR_EXPIRED_CREDENTIALS } from "./apiErrorMessages";
import { sendLoginCredentials } from "./scripts/logIn";
import { getUserCredentials } from './userCredentials';

let accessToken = ''; // The JWT
let config = {
  headers: { Authorization: '' }
};

export function setAccessToken(newAccessToken: string) {
  accessToken = newAccessToken;
  config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };
}

export function getAxiosConfig() {
  return config;
}

export async function sendAPIrequest(request: () => Promise<AxiosResponse>) {
  if (accessToken === '') {
    return Promise.reject(new Error('No access token defined, log in first!'));
  }
  const res = await request();
  if ((res.data['status'] === 'error') && (res.data['message'] === ERROR_EXPIRED_CREDENTIALS)) {
    const { email, password } = getUserCredentials();
    await sendLoginCredentials(email, password);
    return request();
  }
  return res;
}
