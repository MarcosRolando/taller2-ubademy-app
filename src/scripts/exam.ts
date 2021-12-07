import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { EXAM_CREATE, EXAM_PUBLISH, EXAM_GET_LIST, COURSES } from "../endpoints";

export async function createExam(
  courseId: string,
  questions: Array<string>,
  examName: string,
  examCreatorEmail: string) {

  try {
    const res = await sendAPIrequest(() => axios.post(`${API_URL}${EXAM_CREATE}`, {
      course_id: courseId,
      questions: questions,
      exam_name: examName,
      exam_creator_email: examCreatorEmail
    }, getAxiosConfig()));

    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    console.log(res.data);
    return Promise.resolve(res.data['id']);

  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

//TODO: hacer esta función 
export async function publishExam(
  courseId: string,
  examName: string,
  examCreatorEmail: string 
) {
  try {

  } catch (error) {

  }
}

//TODO: arreglar esta función, que todavía no está en api_gateway
export async function getExamList(
  courseId: string
) {
  try {
    console.log(courseId)
    const res = await sendAPIrequest(() => axios.get(
      `${API_URL}${COURSES}/${courseId}/${EXAM_GET_LIST}`, getAxiosConfig()));
      console.log(res.data);
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve(res.data);
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}
