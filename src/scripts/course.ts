import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { COURSES } from "../endpoints";

export default async function getCourseInfo() {
  try {
    const res = await sendAPIrequest(() => axios.get(
    `${API_URL}${COURSES}/6192b41db810e014bbe14315`, getAxiosConfig()));
    if (res.data['status'] == 'error') {
      switch (res.data["message"]) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    const course = res.data['course'];
    return Promise.resolve({
      id: course['_id'],
      country: course['country'],
      course_type: course['course_type'],
      description: course['description'],
      hashtags: course['hastags'],
      images: course['images'],
      subscription_type: course['subscription_type'],
      title: course['title'],
      total_exams: course['total_exams'],
      videos: course['videos']
    })
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error("Error when trying to reach the server"));
  }
}
