import {API_URL} from '../../api_url';
import axios from 'axios';
import {setAccessToken} from '../apiWrapper';
import {LOGIN, OAUTH_LOGIN} from '../endpoints';
import {setUserCredentials} from '../userCredentials';
import {ERROR_BAD_LOGIN} from '../apiErrorMessages';
import * as SecureStore from 'expo-secure-store';
import Fire from '../../Fire';
import { setUserProfilePicture } from '../userProfile';
import { getProfileInfo } from './profile';

export async function sendLoginCredentials(email: string, password: string, registerFingerprint: boolean) {
  try {
    const res = await axios.post(`${API_URL}${LOGIN}`, {email: email, password: password, biometric: registerFingerprint});
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
    if (registerFingerprint) {
      await SecureStore.setItemAsync('ubademy-biometric-jwt', res.data['access_token']);
      await SecureStore.setItemAsync('ubademy-email', email);
      await SecureStore.setItemAsync('ubademy-password', password);
    }
    const { _image } = await getProfileInfo(email); // Que me juzgue la historia
    setUserProfilePicture(_image);
    return Promise.resolve('');
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function sendGoogleCredentials(email: string, accessToken: string) {
  try {
    const res = await axios.post(`${API_URL}${OAUTH_LOGIN}`, {email, accessToken});
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        case ERROR_BAD_LOGIN:
          return Promise.reject(new Error('Incorrect email or password'));
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    setUserCredentials(email, '');
    setAccessToken(res.data['access_token']);
    const { _image } = await getProfileInfo(email); // Que me juzgue la historia
    setUserProfilePicture(_image);
    return Promise.resolve({ created: res.data['created'], password: res.data['password'] });
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}
