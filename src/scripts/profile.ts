import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { PROFILE } from "../endpoints";
import { getUserCredentials } from '../userCredentials';

export async function getOwnProfile() {
  try {
    const res = await sendAPIrequest(() => axios.get(
      `${API_URL}${PROFILE}/${getUserCredentials().email}`, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve({
      _name: res.data['name'],
      _email: res.data['email'],
      _location: res.data['country'],
      _subType: res.data['subscription_type'],
      _genres: res.data['interesting_genres'],
      //TODO eventualmente me tienen que llegar los cursos en los que esta inscripto
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export default async function getCoursesData() {
  try {
    const response = await fetch(
        'https://reqres.in/api/unknown',
    );
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
  } // TODO usar axios
}
