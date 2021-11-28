import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { SEARCH_COURSES } from "../endpoints";

export async function searchCoursesByType(courseType: string) {
  try {
    const res = await sendAPIrequest(() => axios.get(
      `${API_URL}${SEARCH_COURSES}/course_type/${courseType}`, getAxiosConfig()));
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
