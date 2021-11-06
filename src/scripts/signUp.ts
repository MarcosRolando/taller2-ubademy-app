import {API_URL} from '../../api_url';
import axios from 'axios';
import { SIGNUP } from '../endpoints';

export async function sendSignupCredentials(email: string, password: string, username: string) {
  try {
    const res = await axios.post(`${API_URL}${SIGNUP}`,{
      email:email, 
      password:password, 
      name:username
    });
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        case 'error_email_in_use':
          return Promise.reject('That email is already used');
        default:
          return Promise.reject(res.data['message']);
      }
    }
    return Promise.resolve('');
  } catch(error) {
    console.log(error);
    return Promise.reject('Error when trying to reach the server');
  }
}
