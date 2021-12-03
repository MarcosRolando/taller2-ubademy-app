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
    console.log(res.data);
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
    console.log(res.data);
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve(res.data['id']);
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function getCourseInfo(id: string = "61a7e42fd2398ad27a7d0099") {
  try {
    const res = await sendAPIrequest(() => axios.get(
    `${API_URL}${COURSES}/${id}`, getAxiosConfig()));
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
      hashtags: course['hashtags'],
      images: course['images'],
      subscription_type: course['subscription_type'],
      title: course['title'],
      total_exams: course['total_exams'],
      _videos: course['videos'],
      creatorEmail: course['creator_email']
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
      console.log(res.data['message']); // Should never happen!
      return Promise.reject(new Error('Unkown error in the server'));
    }
    return Promise.resolve(''); // Ok!
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}


export async function getCourseFilterData() {
  try {
    const res = await sendAPIrequest(() => axios.get(
    `${API_URL}${COURSES}/${/*TODO*/3}`, getAxiosConfig()));
    if (res.data['status'] == 'error') {
      switch (res.data["message"]) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve({ _courseTypes: res.data['course_types'], 
      _subTypes: res.data['subscription_types']});
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error("Error when trying to reach the server"));
  }
}