import {API_URL} from '../../api_url';
import axios from 'axios';

export default async function sendLoginCredentials(username: string, password: string) {
  try {
    const res = await axios.post(API_URL + 'login/', {email:username, password:password});
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        case 'error_bad_login':
          return Promise.reject('Incorrect email or password');
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
