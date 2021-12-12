import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { COURSE_GENRES, SEARCH_COURSES, SUBSCRIPTION_TYPES } from "../endpoints";

export async function searchCoursesByType(courseType: string, subType: string) {
  console.log(courseType, subType);
  try {
    const res = await sendAPIrequest(() => axios.get(
      `${API_URL}${SEARCH_COURSES}/${courseType}/${subType}`, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve(res.data['courses']);
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function getSearchCourseFilters() {
  try {
    const res_sub_types = await sendAPIrequest(() => axios.get(
      `${API_URL}${SUBSCRIPTION_TYPES}`, getAxiosConfig()));
    if (res_sub_types.data['status'] === 'error') {
      switch (res_sub_types.data['message']) {
        default:
          return Promise.reject(new Error(res_sub_types.data['message']));
      }
    }
    const res_course_genres = await sendAPIrequest(() => axios.get(
      `${API_URL}${COURSE_GENRES}`, getAxiosConfig()));
    if (res_course_genres.data['status'] === 'error') {
      switch (res_course_genres.data['message']) {
        default:
          return Promise.reject(new Error(res_course_genres.data['message']));
      }
    }
    return Promise.resolve({ _genres: ['Any', ...res_course_genres.data['course_genres']], _subTypes: ['Any', ...res_sub_types.data['types']] });
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}
