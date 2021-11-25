import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { COURSE_SETUP, CREATE_COURSE, COURSES, UPDATE_COURSE } from "../endpoints";

export async function getCreateCourseInfo() {
  try {
    const res = await sendAPIrequest(() => axios.get(
      `${API_URL}${COURSE_SETUP}`, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve({
      _locations: res.data['locations'],
      _subTypes: res.data['subscriptions'],
      _genres: res.data['course_genres'],
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}


export async function sendCreateCourse(title: string, description: string,
    totalExams: string, subscriptionType: string, courseType: string,
    country: string, hashtags: Array<string>, images: Array<string>, 
    videos: Array<{name: string, url: string}>) {
  try {
    const res = await sendAPIrequest(() => axios.post(`${API_URL}${CREATE_COURSE}`, {
      title: title,
      description: description,
      total_exams: Number(totalExams),
      subscription_type: 'Free',
      course_type: 'Art',
      country: 'Argentina',
      hashtags: hashtags,
      images: images,
      videos: videos
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

export async function getCourseInfo() {
  try {
    const res = await sendAPIrequest(() => axios.get(
    `${API_URL}${COURSES}/619bffa222a2392ec59d8adc`, getAxiosConfig()));
    if (res.data['status'] == 'error') {
      switch (res.data["message"]) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    const course = res.data['course'];
    console.log(course);
    return Promise.resolve({
      id: course['_id'],
      country: course['country'],
      course_type: course['course_type'],
      description: course['description'],
      hashtags: course['hashtags'],
      images: course['images'],
      subscription_type: course['subscription_type'],
      title: course['title'],
      total_exams: course['total_exams'],
      _videos: course['videos'],
    })
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error("Error when trying to reach the server"));
  }
}

export async function putCourseInfo(id: string, country: string,
  course_type: string, description: string, hashtags: Array<string>,
  images: Array<string>, subscription_type: string,
  title: string, total_exams: string,
  videos: Array<{name:string, url:string}>) {
  try {
    console.log(images);
    console.log(videos);
    console.log(hashtags);
    const res = await sendAPIrequest(() => axios.put(
      `${API_URL}${UPDATE_COURSE}`,{
        id: id,
        country: country,
        course_type: course_type,
        description: description,
        hashtags: hashtags,
        images: images,
        subscription_type: subscription_type,
        title: title,
        total_exams: Number(total_exams),
        videos: videos
      },
    getAxiosConfig()
    ))
    if (res.data['status'] === 'error') {
      console.log("ocurre aca");
      console.log(res.data['message']); // Should never happen!
      return Promise.reject(new Error('Unkown error in the server'));
    }
    return Promise.resolve(''); // Ok!
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}