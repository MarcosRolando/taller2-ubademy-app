import React, { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../../styles/colors";
import styles from "../../../styles/styles";
import Question from "./Question";

const MESSAGE_ERROR_CREATE_EMPTY_EXAM = "You can't create an empty exam";
const MESSAGE_ERROR_UPDATE_EMPTY_EXAM = "You can't update an empty exam";
const MESSAGE_ERROR_EMPTY_QUESTIONS = "There's still empty questions";

const ExamCreateUpdate = ({navigation} : any) => {

  const [idCounter, setIdCounter] = React.useState(0);
  const [questions, setQuestions] = React.useState([] as Array<{id: number, value: string}>)
  const [isEditing, setIsEditing] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  useEffect(() => {
    return () => {
      if (isEditing) {
        // TODO: pedirle al baka-back la data
        // Lo que sigue es de prueba:
        const newQuestions = [
          {
            id: 0,
            value: "Pregunta 1: esto es una pregunta?"
          },
          {
            id: 1,
            value: "Pregunta 2: lo de arriba era una pregunta?"
          },
          {
            id: 2,
            value: "Pregunta 3: no sé qué más preguntar?"
          }
        ];
        setQuestions(newQuestions);
        setIdCounter(newQuestions.length);
      }
    }
  }, [])

  function addQuestion() {
    setQuestions([...questions, {
      id: idCounter,
      value: ""
    }])
    setIdCounter(idCounter + 1);
  }

  function questionsAreValid(){
    if (questions.length == 0) {
      if (isEditing) {
        setErrorMessage(MESSAGE_ERROR_UPDATE_EMPTY_EXAM);
      } else {
        setErrorMessage(MESSAGE_ERROR_CREATE_EMPTY_EXAM);
      }
      return false;
    }
    for (let i = 0; i < questions.length; i++) {
      let value = questions[i].value;
      if (value === "") {
        setErrorMessage(MESSAGE_ERROR_EMPTY_QUESTIONS);
        return false;
      }
    }
    setErrorMessage("");
    return true;
  }

  function createExam() {
    let result = questionsAreValid();
    if (result && questions.length != 0) {
      setErrorMessage("");
      // TODO: enviar al back!
      console.log("Se crea el examen y se lo envía al back!");
      console.log(questions);
    } else {
      console.log("No se crea :(");
    }
  }

  function updateExam() {
    let result = questionsAreValid();
    if (result && questions.length != 0) {
      setErrorMessage("");
      // TODO: enviar al back!
      console.log("Se updatea el examen y se lo envía al back");
      console.log(questions);
    } else {
      console.log("No se updatea nada :(");
    }
  }

  function renderQuestions() {
    const questionsToRender = [] as any;
    for (let i = 0; i < questions.length; i++) {
      questionsToRender.push(
      <Question
        key={i}
        i={i}
        questions={questions}
        setQuestions={setQuestions}
      />)
    }
    return questionsToRender;
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.profileTitle}>
        <Text style={{fontSize:50, color: colors.primary}}>
          Create Exam
        </Text>

        {renderQuestions()}

        <Button
          onPress={() => addQuestion()}
        >
          Add Question
        </Button>

        {isEditing ? (
          <Button
            onPress={() => createExam()}
          >
            Update
          </Button>
          ) : 
          <Button
            onPress={() => createExam()}
          >
            Create
          </Button>
        }

        <Text style={{color: colors.error, alignSelf: 'center', paddingBottom: hp(4)}}>
          {errorMessage}
        </Text>

      </SafeAreaView>
    </ScrollView>
  )
}

export default ExamCreateUpdate;
