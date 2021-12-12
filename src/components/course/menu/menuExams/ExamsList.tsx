import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import styles from "../../../../styles/styles";
import { EXAM, EXAM_CORRECTION, COURSE_MENU_EXAM_OPTIONS } from "../../../../routes";

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
          onlyView: canEdit,
          isPublished: examList[index].isPublished
        })
      } else {
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
        examsToRender.push(
          <List.Item
            key={i}
            title={examName}
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
