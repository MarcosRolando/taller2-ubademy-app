import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Title } from "react-native-paper";
import { Button, TextInput } from "react-native-paper";
import colors from "../../../styles/colors";
import styles from "../../../styles/styles";

const ExamCreateUpdate = ({navigation} : any) => {

  const [idCounter, setIdCounter] = React.useState(0);
  const [questions, setQuestions] = React.useState([] as Array<{id: number, value: string}>)

  function addQuestion() {
    setQuestions([...questions, {
      id: idCounter,
      value: ""
    }])
    setIdCounter(idCounter + 1);
  }

  function renderQuestions() {
    const questionsToRender = [] as any;
    for (let i = 0; i < questions.length; i++) {
      questionsToRender.push(
        <TextInput
          key={i}
          label="Enter a question"
          value={questions[i].value}
          right={
            <TextInput.Icon
              name="close-circle"
              onPress={() => {
                setQuestions(questions.filter((question) => question.id !== questions[i].id ))
              }}
            />
          }
          multiline={true}
          onChangeText={(newValue) => {
            setQuestions(questions.map((question) => {
              if (question.id === questions[i].id) {
                question.value = newValue;
              }
              return question;
            }))
          }}
      />
      )
    }
    return questionsToRender;
  }

  return (
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

      <Button
        onPress={() => console.log(questions)}
      >
        Create
      </Button>

    </SafeAreaView>
  )
}

export default ExamCreateUpdate;
