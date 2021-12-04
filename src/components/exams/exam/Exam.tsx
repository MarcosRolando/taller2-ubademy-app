import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button, Subheading, TextInput } from "react-native-paper";
import colors from "../../../styles/colors";
import { EXAM_CREATE_UPDATE } from "../../../routes";

const QUESTION_PLACEHOLDER = "Enter your answer..."

const Exam = ({ title, onlyView, idCourse, navigation }: any) => {
  const [questions, setQuestions] = React.useState([] as Array<string>)
  const [answers, setAnswers] = React.useState([] as Array<{id: number, value: string}>)
  const [isFinished, setIsFinished] = React.useState(false);

  useEffect(() => {
    setQuestions([
      "Shaba daaa shaba?",
      "Lero lero?",
      "Pregunta numero tres!",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    ])
    const answersAux = [] as Array<{id: number, value: string}>;
    for (let i = 0; i < questions.length; i++) {
      answersAux.push({
        id: i,
        value: ""
      })
    }
    setAnswers(answersAux);
    console.log(questions.length);
    console.log(answers);
  }, [])

  function goToExamUpdateScreen() {
    navigation.navigate(EXAM_CREATE_UPDATE, {
      id: idCourse,
      name: title,
      isEditing: true
    })
  }

  function sendExam() {
    // TODO: mandarle al baka-back
    setIsFinished(true);
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
        <Text style={{fontSize:50, color: colors.primary}}>
          {title}
        </Text>

      {renderQuestions()}

      {!onlyView ? (
        <Button
        disabled={isFinished}
        onPress={() => sendExam()}
        >
          Send
        </Button>
      ) : 
      <Button
        onPress={() => goToExamUpdateScreen()}
      >
        Edit
      </Button>
      }

      </SafeAreaView>
    </ScrollView>
  )
}

export default Exam;