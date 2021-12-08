import React from "react";
import { View, Text } from "react-native";
import { Button, List } from "react-native-paper";
import styles from "../../../../styles/styles";
import colors from "../../../../styles/colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { DarkTheme } from "react-native-paper";
import { EXAM, EXAM_CORRECTION, COURSE_MENU_EXAM_OPTIONS } from "../../../../routes";
import { getExamList } from "../../../../scripts/exam";
import { useFocusEffect } from '@react-navigation/core';

const ExamList = ({id, examList, canEdit, canCorrect, navigation} : any) => {

  function goToExamScreen(index: number) {
    if (canCorrect) {
      navigation.navigate(EXAM_CORRECTION, {
        courseId: id,
        examTitle: examList[index].examName,
        canCorrect: canCorrect,
        studentEmail: examList[index].email
      })
    } else {
      if (canEdit) {
        navigation.navigate(EXAM, {
          courseId: id,
          title: examList[index].examName,
          onlyView: canEdit
        })
      // TODO: cambiarlo para ir a otra ventana con opciones
      } else {
        console.log("ENTRA ACA");
        navigation.navigate(COURSE_MENU_EXAM_OPTIONS, {
          courseId: id,
          examName: examList[index].examName
        })
      }
    }
  }

  // TODO: reutilizar esta funcion cuando el back mande examenes publicados o no publicados
  // function renderExams() {
  //   const examsToRender = [];
  //   for (let i = 0; i < examList.length; i++) {
  //     if (examList[i].published) {
  //       let isDisabled = examList[i].solved;
  //       examsToRender.push(
  //         <List.Item
  //           key={examList[i].examName}
  //           title={examList[i].examName}
  //           // TODO: que la descripción cambie si se está corriendo o solo viendo examenes
  //           description="Student's email"
  //           disabled={isDisabled}
  //           left={props => <List.Icon {...props}
  //             icon="lead-pencil"/>}
  //           onPress={() => goToExamScreen()
              
  //           }
  //           titleStyle={{color:isDisabled ? DarkTheme.colors.disabled : colors.text}}
  //         />
  //       )
  //     }
  //   }
  //   return examsToRender;
  // }

  function renderExams() {
    const examsToRender = [];
    for (let i = 0; i < examList.length; i++) {
        const examName = examList[i].examName;
        const email = examList[i].email;
        console.log(examName);
        examsToRender.push(
          <List.Item
            key={i}
            title={examName}
            // TODO: que la descripción cambie si se está corriendo o solo viendo examenes
            description={email}
            left={props => <List.Icon {...props}
              icon="lead-pencil"/>}
              onPress={() => goToExamScreen(i)
            }
          />
        )
      }
    return examsToRender;
  }

  return (
    <View style={styles.menu}>

      {renderExams()}

    </View>
  )
}

export default ExamList;