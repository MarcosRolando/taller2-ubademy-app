import React from "react";
import { View } from "react-native";
import { List, Subheading, TextInput } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import styles from "../../../styles/styles";
import colors from "../../../styles/colors";
import { DarkTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { EXAM, ROOT } from "../../../routes";

const ExamList = (props : any) => {
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
  const navigation = useNavigation();

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
            onPress={() => 
              navigation.navigate(EXAM as never, {
                title:"hello",
                onlyView: props.onlyView
              } as never)
            }
            titleStyle={{color:isDisabled ? DarkTheme.colors.disabled : colors.text}}
          />
        )
      }
    }
    return examsToRender;
  }

  return (
    <View>
      <Subheading style={{...styles.profileSubtitle, paddingTop: hp(0), marginTop: hp(3), marginBottom: hp(3)}}>
        Exams
      </Subheading>

      {renderExams()}
    </View>
  )
}

export default ExamList;