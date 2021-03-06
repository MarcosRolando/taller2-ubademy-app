import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { COURSE_SETUP, CREATE_COURSE,
  COURSES, UPDATE_COURSE,
  COURSE_SUBSCRIBE, STUDENTS,
  COURSE_UNSUBSCRIBE, 
  COURSE_ADD_COLLABORATOR, COURSE_VIEW,
  COURSE_GRADE,
  STUDENTS_GRADINGS} from "../endpoints";

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
      subscription_type: subscriptionType,
      course_type: courseType,
      country: country,
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
    return Promise.resolve(res.data['id']);
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function getCourseInfo(id: string) {
  try {
    const res = await sendAPIrequest(() => axios.get(
    `${API_URL}${COURSE_VIEW}/${id}`, getAxiosConfig()));
    if (res.data['status'] == 'error') {
      switch (res.data["message"]) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    const course = res.data['course'];
    return Promise.resolve({
      info_level: res.data['info_level'],
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

export async function putCourseInfo(_id: string, country: string,
  course_type: string, description: string, hashtags: Array<string>,
  images: Array<string>, subscription_type: string,
  title: string, total_exams: string,
  videos: Array<{name:string, url:string}>) {
  try {
    const res = await sendAPIrequest(() => axios.put(
      `${API_URL}${UPDATE_COURSE}`,{
        id: _id,
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

export async function postSubscribeToCourse(courseId: string) {
  try {
    const res = await sendAPIrequest(() => axios.post(
      `${API_URL}${COURSES}/${COURSE_SUBSCRIBE}`, {
      course_id: courseId
    }, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve("");
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function postUnsubscribeToCourse(
  courseId: string) {
    try {
      const res = await sendAPIrequest(() => axios.post(
        `${API_URL}${COURSES}/${COURSE_UNSUBSCRIBE}`, {
        course_id: courseId,
        useuser_email: ""
      }, getAxiosConfig()));
      if (res.data['status'] === 'error') {
        switch (res.data['message']) {
          default:
            return Promise.reject(new Error(res.data['message']));
        }
      }
      return Promise.resolve("");
    } catch (error) {
      console.log(error);
      return Promise.reject(new Error('Error when trying to reach the server'));
    }
}

export async function getStudentsExams(courseId: string, examName: string) {
  try {
    const res = await sendAPIrequest(() => axios.get(
    `${API_URL}${COURSES}/${courseId}/${examName}/${STUDENTS}`, getAxiosConfig()));
    if (res.data['status'] == 'error') {
      switch (res.data["message"]) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve(res.data['names']);
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error("Error when trying to reach the server"));
  }
}

export async function postAddCollaborator(
  courseId: string,
  collaboratorEmail: string
) {
  try {
    const res = await sendAPIrequest(() => axios.post(
      `${API_URL}${COURSES}/${COURSE_ADD_COLLABORATOR}`, {
        course_id: courseId,
        collaborator_email: collaboratorEmail,
    }, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve(''); // Ok!
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function postGradeCourse(
  courseId: string,
  comment: string,
  grade: number
) {
  try {
    const res = await sendAPIrequest(() => axios.post(
      `${API_URL}${COURSE_GRADE}`, {
        course_id: courseId,
        comment: comment,
        grade: grade
    }, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve(''); // Ok!
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function getStudentsGradings(
  courseId: string
  ) {
  try {
    const res = await sendAPIrequest(() => axios.get(
    `${API_URL}${STUDENTS_GRADINGS}${courseId}`, getAxiosConfig()));
    if (res.data['status'] == 'error') {
      switch (res.data["message"]) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve({
      average: res.data["average"] as number,
      gradings: res.data["gradings"] as Array<{
        comment:string,
        grade: number,
        student_email: string
      }>
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error("Error when trying to reach the server"));
  }
}