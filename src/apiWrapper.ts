import axios, { AxiosResponse } from "axios";
import { API_URL } from "../api_url";
import Fire from "../Fire";
import { ERROR_BAD_LOGIN, ERROR_EXPIRED_CREDENTIALS } from "./apiErrorMessages";
import { LOGIN, PROFILE } from "./endpoints";
import { getExpoToken } from "./expoToken";
import * as SecureStore from 'expo-secure-store';
import { getUserCredentials, setUserCredentials } from './userCredentials';
import { setUserProfilePicture } from "./userProfile";

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

export async function sendLoginCredentials(email: string, password: string) {
  try {
    const res = await axios.post(`${API_URL}${LOGIN}`, {
      email: email, 
      password: password,
      expo_token: getExpoToken()
    });
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        case ERROR_BAD_LOGIN:
          return Promise.reject(new Error('Incorrect email or password'));
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    setUserCredentials(email, password);
    setAccessToken(res.data['access_token']);
    await Fire.login(email, password);
    await SecureStore.setItemAsync('ubademy-email', email);
    await SecureStore.setItemAsync('ubademy-password', password);
    const { _image } = await getProfileInfo(email); // Que me juzgue la historia
    setUserProfilePicture(_image);
    return Promise.resolve('');
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function getProfileInfo(email: string) {
  try {
    const res = await sendAPIrequest(() => axios.get(
      `${API_URL}${PROFILE}/${email}`, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    const data = res.data['profile'];
    return Promise.resolve({
      _name: data['name'],
      _email: data['email'],
      _location: data['country'],
      _subType: data['subscription_type'],
      _genres: data['interesting_genres'],
      _image: data['profile_picture_link'],
      _wallet_data: data['wallet_data']
      //TODO eventualmente me tienen que llegar los cursos en los que esta inscripto
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}
