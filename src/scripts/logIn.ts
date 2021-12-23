import {API_URL} from '../../api_url';
import axios from 'axios';
import {setAccessToken} from '../apiWrapper';
import {OAUTH_LOGIN} from '../endpoints';
import {setUserCredentials} from '../userCredentials';
import {ERROR_BAD_LOGIN} from '../apiErrorMessages';
import { setUserProfilePicture } from '../userProfile';
import { getProfileInfo } from './profile';
import { getExpoToken } from '../expoToken';

export async function sendGoogleCredentials(email: string, accessToken: string) {
  try {
    const res = await axios.post(`${API_URL}${OAUTH_LOGIN}`, {
      email, 
      accessToken,
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
    setUserCredentials(email, '');
    setAccessToken(res.data['access_token']);
    const { _image } = await getProfileInfo(email); // Que me juzgue la historia
    setUserProfilePicture(_image);
    return Promise.resolve({ created: res.data['created'], password: res.data['firebase_password'] });
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export { sendLoginCredentials } from '../apiWrapper';
