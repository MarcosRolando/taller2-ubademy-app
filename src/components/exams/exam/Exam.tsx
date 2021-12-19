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
const MESSAGE_EXAM_IS_DONE= "The exam has been submitted";
const MESSAGE_EXAM_IS_PUBLISHED = "The exam has been published";

const Exam = ({ title, onlyView, courseId, isPublished, isProfessor, navigation }: any) => {
  const [questions, setQuestions] = React.useState([] as Array<string>)
  const [answers, setAnswers] = React.useState([] as Array<{id: number, value: string}>)
  const [isFinished, setIsFinished] = React.useState(false);
  const [isFinishedMessage, setIsFinishedMessage] = React.useState("");

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
      setIsFinishedMessage(MESSAGE_EXAM_IS_PUBLISHED);
      setIsFinished(true);
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

    try {
      const response = await postCompleteExam(
        courseId,
        answersParsed,
        title,
        studentCredentials.email
      );

      setIsFinished(true);
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

            <TextInput
            placeholder={QUESTION_PLACEHOLDER}
            disabled={isFinished || isProfessor}
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
    <ScrollView style={styles.screen}>
      <SafeAreaView>

        <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
          {title}
        </Title>

      {renderQuestions()}

      {!isProfessor ? (
        <View style={{alignItems: "center"}}>
          <Button
          disabled={isFinished}
          onPress={() => sendExam()}
          >
            Send
          </Button>

          <Text style={{color: colors.primary}}>
            {isFinishedMessage}
          </Text>
        </View>
      ) : 
      <View>
        {(!isPublished && onlyView) ? (
          <View style={{alignItems: "center"}}>
            
            <Button
              onPress={() => goToExamUpdateScreen()}
              disabled={isFinished}
            >
              Edit
            </Button>

            <Button
              onPress={() => callPostPublishExam()}
              disabled={isFinished}
            >
              Publish
            </Button>

            <Text style={{color: colors.primary}}>
              {isFinishedMessage}
            </Text>
          
          </View>
        ) : <></>}

      </View>
      }

      </SafeAreaView>
    </ScrollView>
  )
}

export default Exam;
