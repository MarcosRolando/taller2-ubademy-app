import {API_URL} from '../../api_url';
import axios from 'axios';
import {SIGNUP, SIGNUP_PROFILE} from '../endpoints';
import {sendAPIrequest, setAccessToken, getAxiosConfig} from '../apiWrapper';
import {setUserCredentials} from '../userCredentials';
import {ERROR_EMAIL_USED} from '../apiErrorMessages';

export async function sendSignupCredentials(email: string, password: string) {
  try {
    const res = await axios.post(`${API_URL}${SIGNUP}`, {
      email: email,
      password: password,
      name: 'oinoin',
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
    return Promise.resolve('');
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function sendSignupProfile(username: string, location: string, courses: Array<string>) {
  try {
    const res = await sendAPIrequest(() => axios.post(`${API_URL}${SIGNUP_PROFILE}`, {
      name: username,
      location: location,
      courses: courses,
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

export async function getSignupData() {
  try {
    const res = await sendAPIrequest(() => axios.get(`${API_URL}${SIGNUP_PROFILE}`, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      console.log(res.data['message']); // Should never happen!
      return Promise.reject(new Error('Unkown error in the server'));
    }
    return Promise.resolve({locations: res.data['locations'] as Array <string>, 
      courses: res.data['course_genres'] as Array<string>});
  } catch (error) {
    console.log('Error when trying to reach the server');
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}
