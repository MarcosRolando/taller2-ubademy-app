import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { List, Title } from "react-native-paper";
import styles from "../../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ExamList from "./ExamsList";
import { EXAM_CREATE_UPDATE } from "../../../../routes";
import { getExamList } from "../../../../scripts/exam";
import { useFocusEffect } from '@react-navigation/core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import DropDown from "react-native-paper-dropdown";
import { getStudentsExams } from "../../../../scripts/course";


const MenuStudents = ({courseId, navigation}: any) => {
  const [examList, setExamList] = React.useState([] as Array<string>);
  const [examListParsed, setExamListParsed] = React.useState([] as Array<{label:string, value:string}>);
  const [showExamList, setShowExamsList] = React.useState(false);
  const [exam, setExam] = React.useState("none");
  const [studentsList, setStudentsList] = React.useState([] as Array<{examName: string, email: string}>);

  useFocusEffect(React.useCallback(() => {
    (async () => {
      try {
      const exams = await getExamList(courseId);
      setExamList(exams);
      } catch (error) {
        alert(error);
      }
    })()
  }, []))

  useEffect(() => {
    const examListParsedAux = [] as Array<{label:string, value:string}>;
    examListParsedAux.push({
      label: "All",
      value: "none"
    })
    for (let i = 0; i < examList.length; i++) {
      examListParsedAux.push({
        label: examList[i],
        value: examList[i]
      })
    }
    setExamListParsed(examListParsedAux);
  }, [examList])

  useEffect(() => {
      (async () => {
        try {
        // TODO: probar que esto ande cuando el baka-back lo arregle
        // y mostrar los estudiantes filtrados
        const res = await getStudentsExams(courseId, exam);
      } catch (error) {
        alert(error);
      }
      })();
  }, [exam])

  function renderStudents() {
    const studentsToRender = [];
    
    for (let i = 0; i < 10; i++) {
      studentsToRender.push(
        <List.Item
        key={i}
        title="First Item"
        left={
          props => <List.Icon {...props} icon={(props) => 
            <List.Icon {...props} icon={({size, color}) => (
              <FontAwesomeIcon color={color} size={size} icon={ faUserGraduate } />
        )} />} />}
      />
      )
    }
    return studentsToRender;
  }

  return (
    <ScrollView>

      <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
        Students
      </Title>

      <DropDown
        visible={showExamList}
        placeholder={"Select an exam type"}
        
        mode={"outlined"}
        showDropDown={() => setShowExamsList(true)}
        onDismiss={() => setShowExamsList(false)}
        value={exam}
        setValue={(value : any) => {
          setExam(value);
        }}
        list={examListParsed}
      />

      <View style={styles.menu}>
      {renderStudents()}
      </View>

    </ScrollView>
  )
}

export default MenuStudents;
