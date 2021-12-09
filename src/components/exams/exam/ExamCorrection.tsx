import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button, List, Paragraph, Subheading, TextInput, Title } from "react-native-paper";
import colors from "../../../styles/colors";
import styles from "../../../styles/styles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import DropDown from "react-native-paper-dropdown";
import { postGradeExam } from "../../../scripts/exam";
import { getUserCredentials } from "../../../userCredentials";
import { useFocusEffect } from "@react-navigation/native";
import { getStudentExamCorrected } from "../../../scripts/exam";

const COMMENT_PLACEHOLDER = "Enter your comment..."
const MESSAGE_EXAM_IS_DONE= "The exam's correction has been submitted";

const ExamCorrection = ({ courseId, examTitle, studentEmail, navigation }: any) => {
  const [questions, setQuestions] = React.useState([] as Array<string>);
  const [corrections, setCorrections] = React.useState([] as Array<{id: number, value: string}>)
  const [answers, setAnswers] = React.useState([] as Array<string>);
  const [isFinished, setIsFinished] = React.useState(false);
  const [isFinishedMessage, setIsFinishedMessage] = React.useState("");
  const [grade, setGrade] = React.useState(1);
  const [showGrade, setShowGrade] = React.useState(false);
  const grades = [] as Array<{label: string, value: number}>;
  
  function setGrades() {
    for (let i = 1; i <= 10; i++) {
      grades.push({
        label: i.toString(),
        value: i
      })
    }
  }
  setGrades();

  useFocusEffect(React.useCallback(() => {
      (async () => {
        try {
        const exam = await getStudentExamCorrected(
          courseId, 
          examTitle, 
          studentEmail
        )
        setQuestions(exam.questions);
        setAnswers(exam.answers);
        } catch (error) {
          alert(error);
        }
      })();
  }, []))

  useEffect(() => {
    (async () => {
      const answersAux = [] as Array<{id: number, value: string}>;
      for (let i = 0; i < questions.length; i++) {
        answersAux.push({
          id: i,
          value: ""
        })
      }
      setCorrections(answersAux);
    })();
  }, [questions]);

  async function sendCorrections() {
    const answersParsed = [] as Array<string>;
    for (let i = 0; i < corrections.length; i++) {
      answersParsed.push(corrections[i].value);
    }
    const userCredentials = getUserCredentials();
    try {
      await postGradeExam(
        courseId,
        answersParsed,
        examTitle,
        studentEmail,
        userCredentials.email,
        grade
      )
      setIsFinishedMessage(MESSAGE_EXAM_IS_DONE);
    } catch (error) {
      alert(error);
    }
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
            {answers[i]}
          </Paragraph>

            <TextInput
              placeholder={COMMENT_PLACEHOLDER}
              disabled={isFinished}
              multiline={true}
              onChangeText={(newAnswer) => {
                setCorrections(corrections.map((answer) => {
                  if (answer.id === corrections[i].id) {
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

        <List.Item
          title={studentEmail}
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

      <View style={{alignContent:"center", alignItems:"center"}}>

      <Button
        onPress={() => sendCorrections()}
      >
        Send correction
      </Button>

      <Text style={{color:colors.primary}}>
        {isFinishedMessage}
      </Text>

      </View>

      <View style={{marginBottom:hp(10)}}></View>

      </SafeAreaView>
    </ScrollView>
  )
}

export default ExamCorrection;