import React from "react";
import { ScrollView, Text } from "react-native";
import { Button, Title } from "react-native-paper";
import styles from "../../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ExamList from "./ExamsList";
import { EXAM_CREATE_UPDATE } from "../../../../routes";
import { getExamList } from "../../../../scripts/exam";
import { useFocusEffect } from '@react-navigation/core';
import colors from "../../../../styles/colors";

const MenuExams = ({id, canEdit, navigation}: any) => {
  const [examList, setExamList] = React.useState([] as Array<string>);
  const [errorMessage, setErrorMessage] = React.useState("");

  function goToCreateExamScreen() {
    navigation.navigate(EXAM_CREATE_UPDATE, {
      id: id,
      isEditing: false
    })
  }

  async function callGetExamList(id: string) {
    try {
      await getExamList(id)
      .then((exams) => {
        setExamList(exams);
      })
    } catch (error) {
      setErrorMessage("An error has ocurred");
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

      <Text style={{color: colors.error, alignSelf: 'center', paddingBottom: hp(4)}}>
        {errorMessage}
      </Text>

    </ScrollView>
  )
}

export default MenuExams;