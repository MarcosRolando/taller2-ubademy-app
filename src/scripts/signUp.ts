import {API_URL} from '../../api_url';
import axios from 'axios';
import {SIGNUP, UPDATE_PROFILE} from '../endpoints';
import {sendAPIrequest, setAccessToken, getAxiosConfig} from '../apiWrapper';
import {setUserCredentials} from '../userCredentials';
import {ERROR_EMAIL_USED} from '../apiErrorMessages';
import Fire from '../../Fire';

export async function sendSignupCredentials(email: string, password: string) {
  try {
    const res = await axios.post(`${API_URL}${SIGNUP}`, {
      email: email,
      password: password,
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
      profile_picture: 'none'
    }, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      console.log(res.data['message']); // Should never happen!
      return Promise.reject(new Error('Unkown error in the server'));
    }
    return Promise.resolve(''); // Ok!
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}
