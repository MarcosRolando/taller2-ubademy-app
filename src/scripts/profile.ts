import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { MY_COURSES, PROFILE, SIGNUP_PROFILE, UPDATE_PROFILE,
  PROFILE_PASSED_COURSES } from "../endpoints";

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
      _image: data['profile_picture_link'],
      //TODO eventualmente me tienen que llegar los cursos en los que esta inscripto
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}


export async function getProfileOptionsData() {
  try {
    const res = await sendAPIrequest(() => axios.get(`${API_URL}${SIGNUP_PROFILE}`, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      console.log(res.data['message']); // Should never happen!
      return Promise.reject(new Error(res.data['message']));
    }
    return Promise.resolve({locations: res.data['locations'] as Array <string>, 
      courses: res.data['course_genres'] as Array<string>});
  } catch (error) {
    console.log('Error when trying to reach the server');
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}


export async function sendUpdateProfile(username: string, location: string, courses: Array<string>,
                                        profile_picture: string, subscription_type: string) {
  try {
    const res = await sendAPIrequest(() => axios.put(`${API_URL}${UPDATE_PROFILE}`, {
      name: username,
      country: location,
      interesting_genres: courses,
      subscription_type,
      profile_picture
    }, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      console.log(res.data['message']); // Should never happen!
      return Promise.reject(new Error(res.data['message']));
    }
    return Promise.resolve(''); // Ok!
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function getMyCourses() {
  try {
    const res = await sendAPIrequest(() => axios.get(
      `${API_URL}${MY_COURSES}`, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      console.log(res.data['message']); // Should never happen!
      return Promise.reject(new Error(res.data['message']));
    }
    return Promise.resolve({
      creator: res.data['creator'] as Array <{_id: string, title: string}>, 
      collaborator: res.data['collaborator'] as Array <{_id: string, title: string}>,
      student: res.data['student'] as Array <{_id: string, title: string}>,
    });
  } catch (error) {
    console.log('Error when trying to reach the server');
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function getPassedCourses() {
  try {
    const res = await sendAPIrequest(() => axios.get(
      `${API_URL}${PROFILE_PASSED_COURSES}`, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      console.log(res.data['message']); // Should never happen!
      return Promise.reject(new Error(res.data['message']));
    }
    console.log(res.data['passed_courses_names']);
    return Promise.resolve(
      res.data['passed_courses_names'] as Array<{creator_email: string, title: string}>
    );
  } catch (error) {
    console.log('Error when trying to reach the server');
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}