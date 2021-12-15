import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Divider, Paragraph, Subheading, Title } from "react-native-paper";
import colors from "../../../styles/colors";
import styles from "../../../styles/styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getUserCredentials } from "../../../userCredentials";
import { getStudentExamCorrected } from "../../../scripts/exam";
import { useFocusEffect } from '@react-navigation/core';

const ExamCorrected = ({ courseId, examName, navigation }: any) => {
  const [questions, setQuestions] = React.useState([] as Array<string>)
  const [answers, setAnswers] = React.useState([] as Array<string>)
  const [corrections, setCorrections] = React.useState([] as Array<string>);
  const [grade, setGrade] = React.useState("1");
  const [showCorrections, setShowCorrections] = React.useState(false);

  useFocusEffect(React.useCallback(() => {
    (async () => {
      try {
        const exam = await getStudentExamCorrected(courseId, examName, getUserCredentials().email);
        if (exam !== undefined) {
          setAnswers(exam.answers);
          setQuestions(exam.questions);
          if (exam.corrections !== undefined) {
            setShowCorrections(true);
            setCorrections(exam.corrections);
            setGrade(exam.mark);
          }
        }
      } catch (error) {
        alert(error);
      }
    })();
  }, []))

  function renderQuestions() {
    const questionsToRender = [];
    for (let i = 0; i < questions.length; i++) {
      questionsToRender.push(
        <View key={i} style={{marginHorizontal:wp(2)}}>
          <Subheading style={{fontSize:wp(5), color:colors.primary}}>
            {"Question " + (i + 1).toString() + ": " + questions[i]}
          </Subheading>

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

        {showCorrections ? (
          <View>
            <Divider style={{marginTop:wp(2), marginBottom:wp(2)}}/>

            {renderQuestions()}

            <View style={{alignItems:"center"}}>

              <Text style={{color:colors.primary,fontSize:wp(8)}}>
                Grade: {grade}
              </Text>

            </View>
          </View>
        ) : 
          <View style={{alignItems:"center"}}>
            <Text style={{color:colors.primary, marginTop: hp(40)}}>
              Still not graded
            </Text>
          </View>
        }

      </SafeAreaView>
    </ScrollView>
  )
}

export default ExamCorrected;