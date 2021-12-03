import React from "react";
import { List } from "react-native-paper";
import { EXAM_CREATE_UPDATE } from "../../../routes";
import { useNavigation } from "@react-navigation/core";

const ExamList = () => {
  const [exams, setExams] = React.useState([
    {
      idCourse: 666,
      examName: "Preguntas!",
      published: true,
      solved: false,
      questions: ["Pregunta 1: A", "Pregunta 2: B"],
    },
    {
      idCourse: 666,
      examName: "Más preguntas",
      published: true,
      solved: false,
      questions: ["Pregunta 1: C", "Pregunta 2: D", "Pregunta 3: E"],
    },
    {
      idCourse: 666,
      examName: "Preguntas parte 7",
      published: false,
      solved: false,
      questions: ["Pregunta 1: F", "Pregunta 2: G"],
    },
    {
      idCourse: 666,
      examName: "Who's a good boy?",
      published: true,
      solved: true,
      questions: ["Pregunta 1: H", "Pregunta 2: I"],
    },
  ])
  const navigation = useNavigation();


  return (
    <></>
  )
}

export default ExamList;