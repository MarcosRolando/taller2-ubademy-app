import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { CREATE_EXAM } from "../endpoints";

export async function createExam(
  courseId: string,
  questions: Array<string>,
  examName: string,
  examCreatorEmail: string) {

  try {
    const res = await sendAPIrequest(() => axios.post(`${API_URL}${CREATE_EXAM}`, {
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

export async function publishExam(
  courseId: string,
  examName: string,
  examCreatorEmail: string 
) {

  try {
    
  } catch (error) {

  }
}