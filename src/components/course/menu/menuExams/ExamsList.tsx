import React, { useEffect} from "react";
import { View } from "react-native";
import { Button, List } from "react-native-paper";
import styles from "../../../../styles/styles";
import colors from "../../../../styles/colors";
import { DarkTheme } from "react-native-paper";
import { EXAM, EXAM_CORRECTION } from "../../../../routes";
import { getExamList } from "../../../../scripts/exam";

const ExamList = ({id, canEdit, canCorrect, navigation} : any) => {
  const [exams, setExams] = React.useState([
    {
      idCourse: 666,
      examName: "Preguntas!",
      published: true,
      solved: false,
      questions: ["Pregunta 1: A", "Pregunta 2: B"],
    },
    {
      idCourse: 666,
      examName: "Más preguntas",
      published: true,
      solved: false,
      questions: ["Pregunta 1: C", "Pregunta 2: D", "Pregunta 3: E"],
    },
    {
      idCourse: 666,
      examName: "Preguntas parte 7",
      published: false,
      solved: false,
      questions: ["Pregunta 1: F", "Pregunta 2: G"],
    },
    {
      idCourse: 666,
      examName: "Who's a good boy?",
      published: true,
      solved: true,
      questions: ["Pregunta 1: H", "Pregunta 2: I"],
    },
  ])

  async function printear() {
    await getExamList(id);
  }

  function goToExamScreen() {
    if (canCorrect) {
      navigation.navigate(EXAM_CORRECTION, {
        id: id,
        examTitle: "hello",
        canCorrect: canCorrect
      })
    } else {
      navigation.navigate(EXAM, {
        id: id,
        title:"hello",
        onlyView: canEdit
      })
    }
  }

  function renderExams() {
    const examsToRender = [];
    for (let i = 0; i < exams.length; i++) {
      if (exams[i].published) {
        let isDisabled = exams[i].solved;
        examsToRender.push(
          <List.Item
            key={exams[i].examName}
            title={exams[i].examName}
            disabled={isDisabled}
            left={props => <List.Icon {...props}
              icon="lead-pencil"/>}
            onPress={() => goToExamScreen()
              
            }
            titleStyle={{color:isDisabled ? DarkTheme.colors.disabled : colors.text}}
          />
        )
      }
    }
    return examsToRender;
  }

  return (
    <View style={styles.menu}>

      {renderExams()}

    <Button
      onPress={() => {
        printear();
      }}
    >
      printear examenes
    </Button>

    </View>
  )
}

export default ExamList;