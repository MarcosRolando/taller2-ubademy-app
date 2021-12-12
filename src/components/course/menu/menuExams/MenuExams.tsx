import React from "react";
import { ScrollView } from "react-native";
import { Button, Title } from "react-native-paper";
import styles from "../../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ExamList from "./ExamsList";
import { EXAM_CREATE_UPDATE } from "../../../../routes";
import { getExamList } from "../../../../scripts/exam";
import { useFocusEffect } from '@react-navigation/core';

const MenuExams = ({id, canEdit, navigation}: any) => {
  const [examList, setExamList] = React.useState([] as Array<{
    examName: string,
    email: string
    isPublished: boolean
  }>);

  function goToCreateExamScreen() {
    navigation.navigate(EXAM_CREATE_UPDATE, {
      courseId: id,
      name: "",
      isEditing: false,
      questions:[]
    })
  }

  async function callGetExamList(id: string) {
    try {
      const exams = await getExamList(id, "none");
      const examsAux = [] as Array<{
        examName: string,
        email: string, 
        isPublished: boolean
    }>;
      for (let i = 0; i < exams.length; i++) {
        examsAux.push({
          examName: exams[i].exam_name,
          email: "",
          isPublished: exams[i].is_published
        })
      }
      setExamList(examsAux);
    } catch (error) {
      alert(error);
    }
  }

  useFocusEffect(React.useCallback(() => {
    (async () => {
      callGetExamList(id);
    })();
  }, []))

  return (
    <ScrollView>

      <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
        Exams
      </Title>

      <ExamList
        onlyView={false}
        id={id}
        examList={examList}
        canEdit={canEdit}
        navigation={navigation} />

      {canEdit ? (
        <Button
          onPress={goToCreateExamScreen}
        >
          Add Exam
        </Button>
      ) : <></>}

    </ScrollView>
  )
}

export default MenuExams;
