import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { CREATE_COURSE } from "../endpoints";

export async function sendCreateCourse(title: string, description: string,
    totalExams: string, subscriptionType: string, courseType: string,
    country: string, hashtags: Array<string>, images: Array<string>, 
    videos: Array<{name: string, uri: string}>) {
  try {
    const res = await sendAPIrequest(() => axios.post(`${API_URL}${CREATE_COURSE}`, {
      title: title,
      description: description,
      total_exams: Number(totalExams),
      subscription_type: 'Free',
      course_type: 'Art',
      country: 'Argentina',
      hashtags: hashtags,
      media: images // TODO agregar los videos
    }, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve('');
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}
