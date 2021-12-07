import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button, Paragraph, Subheading, TextInput, Title } from "react-native-paper";
import colors from "../../../styles/colors";
import { EXAM_CREATE_UPDATE } from "../../../routes";
import styles from "../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const COMMENT_PLACEHOLDER = "Enter your comment..."

const ExamCorrection = ({ idCourse, examTitle, studentEmail, navigation }: any) => {
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

  function sendCorrections() {
    // TODO
  }

  function renderQuestions() {
    const questionsToRender = [];
    for (let i = 0; i < questions.length; i++) {
      questionsToRender.push(
        <View key={i}>
          <Subheading>
            {"Question " + (i + 1).toString() + ": " + questions[i]}
          </Subheading>

          <Paragraph>
            Texto
          </Paragraph>

            <TextInput
              placeholder={COMMENT_PLACEHOLDER}
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


        </View>
      )
    }
    return questionsToRender;
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
          {examTitle}
        </Title>

      {renderQuestions()}


      <Button
        onPress={() => sendCorrections()}
      >
        Send correction
      </Button>


      </SafeAreaView>
    </ScrollView>
  )
}

export default ExamCorrection;