import {API_URL} from '../../api_url';
import axios from 'axios';
import {COURSES, LOCATIONS, SIGNUP} from '../endpoints';

export async function sendSignupCredentials(email: string, password: string, username: string) {
  try {
    const res = await axios.post(`${API_URL}${SIGNUP}`, {
      email: email,
      password: password,
      name: username,
    });
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        case 'error_email_in_use':
          return Promise.reject(new Error('That email is already used'));
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

export async function getSignupLocations() {
  try {
    const res = await axios.get(`${API_URL}${LOCATIONS}`);
    if (res.data['status'] === 'error') {
      console.log(res.data['message']); // Should never happen!
      return Promise.reject(new Error('Unkown error in the server'));
    }
    return Promise.resolve(res.data['locations'] as Array<string>);
  } catch (error) {
    console.log('Error when trying to reach the server');
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function getSignupCourses() {
  try {
    const res = await axios.get(`${API_URL}${COURSES}`);
    if (res.data['status'] === 'error') {
      console.log(res.data['message']); // Should never happen!
      return Promise.reject(new Error('Unkown error in the server'));
    }
    return Promise.resolve(res.data['courses'] as Array<string>);
  } catch (error) {
    console.log('Error when trying to reach the server');
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function sendSignupLocation(location: string) {
  try {
    const res = await axios.post(`${API_URL}${LOCATIONS}`, {
      location: location,
    });
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

export async function sendSignupCourses(courses: Array<string>) {
  try {
    const res = await axios.post(`${API_URL}${COURSES}`, {
      courses: courses,
    });
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
