import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button, Subheading, TextInput, Title } from "react-native-paper";
import colors from "../../../styles/colors";
import { EXAM_CREATE_UPDATE } from "../../../routes";
import { getExamQuestions,
  postPublishExam,
  postCompleteExam
} from "../../../scripts/exam";
import { useFocusEffect } from '@react-navigation/core';
import styles from "../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getUserCredentials } from "../../../userCredentials";


const QUESTION_PLACEHOLDER = "Enter your answer..."

const Exam = ({ title, onlyView, courseId, navigation }: any) => {
  const [questions, setQuestions] = React.useState([] as Array<string>)
  const [answers, setAnswers] = React.useState([] as Array<{id: number, value: string}>)
  const [isFinished, setIsFinished] = React.useState(false);

  // useEffect(() => {
  //   setQuestions([
  //     "Shaba daaa shaba?",
  //     "Lero lero?",
  //     "Pregunta numero tres!",
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //   ])
  //   const answersAux = [] as Array<{id: number, value: string}>;
  //   for (let i = 0; i < questions.length; i++) {
  //     answersAux.push({
  //       id: i,
  //       value: ""
  //     })
  //   }
  //   setAnswers(answersAux);
  //   console.log(questions.length);
  //   console.log(answers);

  //   (async () => {
  //     callGetExamQuestions();
  //   })
  // }, [])

  // useFocusEffect(React.useCallback(() => {
  //     callGetExamQuestions();
  // }, []))

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const examQuestions = await getExamQuestions(courseId, title);
  //       console.log("preguntas recibidas",examQuestions);
  //       setQuestions(examQuestions.questions);
  //       console.log("preguntas",questions);
  //     } catch (error) {
  //       alert(error);
  //     }
  //   })
  // }, [])

  useEffect(() => {
    setAnswersPlaceholder()
  }, [questions]);

  useFocusEffect(React.useCallback(() => {
    callGetExamQuestions();
  }, []))

  async function callGetExamQuestions(){
    try {
      const examQuestions = await getExamQuestions(courseId, title);
      setQuestions(examQuestions);
    } catch (error) {
      alert(error);
    }
  }

  function setAnswersPlaceholder() {
    const answersAux = [] as Array<{id: number, value: string}>;
    for (let i = 0; i < questions.length; i++) {
      answersAux.push({
        id: i,
        value: ""
      })
    }
    setAnswers(answersAux);
  }

  async function callPostPublishExam() {
    try {
      const examQuestions = await postPublishExam(courseId, title, "vi");
    } catch (error) {
      alert(error);
    }
  }

  function goToExamUpdateScreen() {
    navigation.navigate(EXAM_CREATE_UPDATE, {
      courseId: courseId,
      name: title,
      isEditing: true,
      questions: questions
    })
  }

  async function sendExam() {
    const studentCredentials = getUserCredentials();
    const answersParsed = [] as Array<string>;
    for (let i = 0; i < answers.length; i++) {
      answersParsed.push(answers[i].value);
    }
    console.log("en examen:", answers);
    console.log("examen parseado:", answersParsed);

    try {
      const response = await postCompleteExam(
        courseId,
        answersParsed,
        title,
        studentCredentials.email
      )
    } catch (error) {
      alert(error);
    }

    //setIsFinished(true);
  }

  function renderQuestions() {
    const questionsToRender = [];
    for (let i = 0; i < questions.length; i++) {
      questionsToRender.push(
        <View key={i}>
          <Subheading>
            {"Question " + (i + 1).toString() + ": " + questions[i]}
          </Subheading>

          {!onlyView ? (
            <TextInput
            placeholder={QUESTION_PLACEHOLDER}
            disabled={isFinished}
            multiline={true}
            onChangeText={(newAnswer) => {
              setAnswers(answers.map((answer) => {
                if (answer.id === answers[i].id) {
                  answer.value = newAnswer;
                }
                return answer;
              }))
            }}
            >
            </TextInput>
          ) : <></>}

        </View>
      )
    }
    return questionsToRender;
  }

  return (
    <ScrollView>
      <SafeAreaView>

        <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
          {title}
        </Title>

      {renderQuestions()}

      {!onlyView ? (
        <Button
        disabled={isFinished}
        onPress={() => sendExam()}
        >
          Send
        </Button>
      ) : 
      <View>
        <Button
          onPress={() => goToExamUpdateScreen()}
        >
          Edit
        </Button>

        <Button
          onPress={() => callPostPublishExam()}
        >
          Publish
        </Button>
      </View>
      }

      </SafeAreaView>
    </ScrollView>
  )
}

export default Exam;