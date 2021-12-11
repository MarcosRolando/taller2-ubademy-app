import axios from "axios";
import { API_URL } from "../../api_url";
import { getAxiosConfig, sendAPIrequest } from "../apiWrapper";
import { EXAM_CREATE, EXAM_PUBLISH,
  EXAM_GET_LIST, COURSES, 
  EXAM, EXAM_EDIT,
  EXAM_COMPLETE, EXAM_STUDENTS,
  EXAM_GRADE } from "../endpoints";

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
    return Promise.resolve(res.data['id']);

  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function postPublishExam(
  courseId: string,
  examName: string,
  examCreatorEmail: string 
) {
  try {
    const res = await sendAPIrequest(() => axios.post(
      `${API_URL}${COURSES}/${EXAM_PUBLISH}`,{
        course_id: courseId,
        exam_name: examName,
        exam_creator_email: examCreatorEmail 
      }, getAxiosConfig()));
      if (res.data['status'] === 'error') {
        switch (res.data['message']) {
          default:
            return Promise.reject(new Error(res.data['message']));
        }
      }
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function getExamList(
  courseId: string
) {
  try {
    const res = await sendAPIrequest(() => axios.get(
      `${API_URL}${COURSES}/${courseId}/${EXAM_GET_LIST}`, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve(res.data['exams']);
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function getExamQuestions(
  courseId: string,
  examName: string,
) {
  try {
    const res = await sendAPIrequest(() => axios.get(
      `${API_URL}${COURSES}/${courseId}/${EXAM}/${examName}/questions/none`, getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    const data = res.data['exam'];
    return Promise.resolve(res.data['exam']['questions']);
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

export async function putEditExam(
  courseId: string,
  questions: Array<string>,
  examName: string,
  creatorEmail: string
) {
  try {
    const res = await sendAPIrequest(() => axios.put(
      `${API_URL}${COURSES}/${EXAM_EDIT}`,{
        course_id: courseId,
        questions: questions,
        exam_name: examName,
        exam_creator_email: creatorEmail 
      }, getAxiosConfig()));
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

export async function postCompleteExam(
  courseId: string,
  answers: Array<string>,
  examName: String,
  studentEmail: String 
) {
  try {
    const res = await sendAPIrequest(() => axios.post(
      `${API_URL}${COURSES}/${EXAM_COMPLETE}`,{
        course_id: courseId,
        answers: answers,
        exam_name: examName,
        student_email: studentEmail 
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

export async function getFilteredExams(
  courseId: string,
  filter: string
) {
  try {
    const res = await sendAPIrequest(() => axios.get(
      `${API_URL}${COURSES}/${courseId}/${EXAM_STUDENTS}/${filter}`
      ,getAxiosConfig()));
    if (res.data['status'] === 'error') {
      switch (res.data['message']) {
        default:
          return Promise.reject(new Error(res.data['message']));
      }
    }
    return Promise.resolve(res.data['exams']);
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }
}

// TODO: completar esta función cuando esté en el back
// @app.get('/courses/{course_id}/exam/{exam_name}/{exam_filter}')
export async function getStudentExamToCorrect(

) {

}

// @app.get('/courses/{course_id}/exam/{exam_name}/{exam_filter}/{student_email}')
// projection: questions or completed_exam
export async function getStudentExamCorrected(
  courseId: string,
  examName: string,
  studentEmail: string
) {
  try {
    const res = await sendAPIrequest(() => axios.get(
    `${API_URL}${COURSES}/${courseId}/${EXAM}/${examName}/completed_exam/${studentEmail}`
    ,getAxiosConfig()));

    return Promise.resolve(res.data['exam']);
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error('Error when trying to reach the server'));
  }

}

export async function postGradeExam(
  courseId: string,
  corrections: Array<string>,
  examName: string,
  studentEmail: string,
  professorEmail: string,
  mark: number
) {
  try {
    const res = await sendAPIrequest(() => axios.post(
      `${API_URL}${COURSES}/${EXAM_GRADE}`, {
        course_id: courseId,
        corrections: corrections,
        exam_name: examName,
        student_email: studentEmail,
        professor_email: professorEmail,
        mark: mark
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