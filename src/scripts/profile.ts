import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { MY_COURSES, SIGNUP_PROFILE, UPDATE_PROFILE,
  PROFILE_PASSED_COURSES, 
  SUB_TYPES,
  SUB_MODIFY,
  SUB_PAY} from "../endpoints";

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

export async function getSubTypes() {
  try {
    const res = await sendAPIrequest(() => axios.get(
      `${API_URL}${SUB_TYPES}`, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve(res.data["types"] as Array<string>);
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function postModifySub(
  subscription: string
) {
  try {
    const res = await sendAPIrequest(() => axios.post(
      `${API_URL}${SUB_MODIFY}`, {
        new_subscription: subscription,
    }, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve(res.data); // Ok!
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function postPaySub(
  subscription: string
) {
  try {
    const res = await sendAPIrequest(() => axios.post(
      `${API_URL}${SUB_PAY}`, {
        new_subscription: subscription,
    }, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve(res.data); // Ok!
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export { getProfileInfo } from '../apiWrapper';
