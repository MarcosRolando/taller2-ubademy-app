import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button, Subheading, TextInput, Title } from "react-native-paper";
import colors from "../../../styles/colors";
import { EXAM_CREATE_UPDATE } from "../../../routes";
import { getExamQuestions } from "../../../scripts/exam";
import { useFocusEffect } from '@react-navigation/core';
import styles from "../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


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

  function goToExamUpdateScreen() {
    navigation.navigate(EXAM_CREATE_UPDATE, {
      courseId: courseId,
      name: title,
      isEditing: true,
      questions: questions
    })
  }

  function sendExam() {
    // TODO: mandarle al baka-back
    setIsFinished(true);
  }

  function renderQuestions() {
    const questionsToRender = [];
    console.log("largo", questions.length);
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

        <Button>
          Publish
        </Button>
      </View>
      }

      </SafeAreaView>
    </ScrollView>
  )
}

export default Exam;