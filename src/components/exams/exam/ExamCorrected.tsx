import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button, Divider, List, Paragraph, Subheading, TextInput, Title } from "react-native-paper";
import colors from "../../../styles/colors";
import { EXAM_CREATE_UPDATE } from "../../../routes";
import styles from "../../../styles/styles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import DropDown from "react-native-paper-dropdown";
import { postGradeExam } from "../../../scripts/exam";
import { getUserCredentials } from "../../../userCredentials";
import { getStudentExamCorrected } from "../../../scripts/exam";
import { useFocusEffect } from '@react-navigation/core';

const COMMENT_PLACEHOLDER = "Enter your comment..."
const MESSAGE_EXAM_IS_DONE= "The exam's correction has been submitted";


const ExamCorrected = ({ courseId, examName, navigation }: any) => {
  const [questions, setQuestions] = React.useState([] as Array<string>)
  const [answers, setAnswers] = React.useState([] as Array<string>)
  const [corrections, setCorrections] = React.useState([] as Array<string>);
  const [grade, setGrade] = React.useState("1");

  useFocusEffect(React.useCallback(() => {
    (async () => {
      try {
        const exam = await getStudentExamCorrected(courseId, examName, getUserCredentials().email);
        console.log(exam);
        console.log("respiestas:", exam.answers);
        setAnswers(exam.answers);
        setQuestions(exam.questions);
        setCorrections(exam.corrections);
        setGrade(exam.mark);
      } catch (error) {
        alert(error);
      }
    })();
  }, []))

  // useEffect(() => {
  //   (async () => {
  //     const answersAux = [] as Array<{id: number, value: string}>;
  //     for (let i = 0; i < questions.length; i++) {
  //       answersAux.push({
  //         id: i,
  //         value: ""
  //       })
  //     }
  //     setAnswers(answersAux);
  //   })();
  // }, [questions]);


  function renderQuestions() {
    const questionsToRender = [];
    for (let i = 0; i < questions.length; i++) {
      questionsToRender.push(
        <View key={i} style={{marginHorizontal:wp(2)}}>
          <Subheading style={{fontSize:wp(5), color:colors.primary}}>
            {"Question " + (i + 1).toString() + ": " + questions[i]}
          </Subheading>

          {/* TODO: agregar que se vean las respuestas */}
          <View style={{flexDirection:"row"}}>
            <Paragraph style={{color: colors.primary, flexDirection:"row", marginRight:wp(2)}}>
              My answer:
            </Paragraph>

            <View style={{width: wp(75)}}>
              <Paragraph style={{flexWrap:"wrap-reverse"}}>
                {answers[i]}
              </Paragraph>
            </View>
          </View>

          <View style={{flexDirection:"row"}}>
            <Paragraph style={{color: colors.primary, flexDirection:"row", marginRight:wp(2)}}>
              Correction:
            </Paragraph>

            <View style={{width: wp(75)}}>
              <Paragraph style={{color: "skyblue", flexWrap:"wrap-reverse"}}>
                {corrections[i]}
              </Paragraph>
            </View>
          </View>

          <Divider style={{marginTop:wp(2), marginBottom:wp(2)}}/>

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

        <Divider style={{marginTop:wp(2), marginBottom:wp(2)}}/>

        {renderQuestions()}

        <View style={{alignItems:"center"}}>

          <Text style={{color:colors.primary,fontSize:wp(8)}}>
            Grade: {grade}
          </Text>

        </View>

      </SafeAreaView>
    </ScrollView>
  )
}

export default ExamCorrected;