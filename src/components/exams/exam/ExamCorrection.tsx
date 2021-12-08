import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button, List, Paragraph, Subheading, TextInput, Title } from "react-native-paper";
import colors from "../../../styles/colors";
import { EXAM_CREATE_UPDATE } from "../../../routes";
import styles from "../../../styles/styles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import DropDown from "react-native-paper-dropdown";

const COMMENT_PLACEHOLDER = "Enter your comment..."

const examTypes = [
  {label:'1', value:'1'},
  {label:'2 corrected', value:'2'},
  {label: 'All', value: 'none'}
];

const ExamCorrection = ({ courseId, examTitle, studentEmail, navigation }: any) => {
  const [questions, setQuestions] = React.useState([] as Array<string>)
  const [answers, setAnswers] = React.useState([] as Array<{id: number, value: string}>)
  const [isFinished, setIsFinished] = React.useState(false);
  const [grade, setGrade] = React.useState('1');
  const [showGrade, setShowGrade] = React.useState(false);
  const grades = [] as Array<{label: string, value: string}>;

  function setGrades() {
    for (let i = 1; i <= 10; i++) {
      grades.push({
        label: i.toString(),
        value: i.toString()
      })
    }
  }
  setGrades();

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

          {/* TODO: agregar que se vean las respuestas */}
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
          Corrections
        </Title>

        <List.Item
          title={examTitle}
          description="Exam"
          left={props => <List.Icon {...props} icon="notebook" />}
        />

        {/* TODO: agregar que se vea el mail */}
        <List.Item
          title="email"
          description="Student's email"
          left={props => <List.Icon {...props} icon="email" />}
        />

      {renderQuestions()}

      <View style={{marginHorizontal: wp(30)}}>
        <DropDown
          visible={showGrade}
          placeholder={"Select a grade"}
          mode={"outlined"}
          showDropDown={() => setShowGrade(true)}
          onDismiss={() => setShowGrade(false)}
          value={grade}
          setValue={(value : any) => {
            setGrade(value);
          }}
          list={grades}
        />
      </View>

      <Button
        onPress={() => sendCorrections()}
      >
        Send correction
      </Button>

      <View style={{marginBottom:hp(10)}}></View>

      </SafeAreaView>
    </ScrollView>
  )
}

export default ExamCorrection;