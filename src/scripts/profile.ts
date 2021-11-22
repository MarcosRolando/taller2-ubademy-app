import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { PROFILE, UPDATE_PROFILE } from "../endpoints";

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
      //TODO eventualmente me tienen que llegar los cursos en los que esta inscripto
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function sendUpdateProfile(username: string, location: string, courses: Array<string>,
                                        subscription_type: string) {
  try {
    const res = await sendAPIrequest(() => axios.put(`${API_URL}${UPDATE_PROFILE}`, {
      name: username,
      country: location,
      interesting_genres: courses,
      subscription_type,
      profile_picture: 'algo' // TODO mandar el posta
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

export async function getCoursesData() {
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
