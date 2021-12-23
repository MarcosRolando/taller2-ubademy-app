import {API_URL} from '../../api_url';
import axios from 'axios';
import {SIGNUP, UPDATE_PROFILE} from '../endpoints';
import {sendAPIrequest, setAccessToken, getAxiosConfig} from '../apiWrapper';
import {setUserCredentials} from '../userCredentials';
import {ERROR_EMAIL_USED} from '../apiErrorMessages';
import Fire from '../../Fire';
import { setUserProfilePicture } from '../userProfile';
import { getExpoToken } from '../expoToken';
import * as SecureStore from 'expo-secure-store';

export async function sendSignupCredentials(email: string, password: string) {
  try {
    const res = await axios.post(`${API_URL}${SIGNUP}`, {
      email: email,
      password: password,
      expo_token: getExpoToken()
    });
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        case ERROR_EMAIL_USED:
          return Promise.reject(new Error('That email is already used'));
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    setUserCredentials(email, password);
    setAccessToken(res.data['access_token']);
    await Fire.register(email, password);
    await SecureStore.setItemAsync('ubademy-email', email);
    await SecureStore.setItemAsync('ubademy-password', password);
    return Promise.resolve('');
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function sendSignupProfile(username: string, location: string, courses: Array<string>) {
  try {
    const res = await sendAPIrequest(() => axios.put(`${API_URL}${UPDATE_PROFILE}`, {
      name: username,
      country: location,
      interesting_genres: courses,
      subscription_type: 'Free',
      profile_picture: 'https://firebasestorage.googleapis.com/v0/b/ubademy-ee2aa.appspot.com/o/default-ubademy-profile-pic.jpeg?alt=media&token=4ea6baf0-333b-47e3-b486-2864fdb9eec2'
    }, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      console.log(res.data['message']); // Should never happen!
      return Promise.reject(new Error('Unkown error in the server'));
    }
    setUserProfilePicture('https://firebasestorage.googleapis.com/v0/b/ubademy-ee2aa.appspot.com/o/default-ubademy-profile-pic.jpeg?alt=media&token=4ea6baf0-333b-47e3-b486-2864fdb9eec2');
    return Promise.resolve(''); // Ok!
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}
