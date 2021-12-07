import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Title } from "react-native-paper";
import styles from "../../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ExamList from "./ExamsList";
import { EXAM_CREATE_UPDATE } from "../../../../routes";

const MenuExams = ({id, canEdit, navigation}: any) => {

  function goToCreateExamScreen() {
    navigation.navigate(EXAM_CREATE_UPDATE, {
      id: id,
      isEditing: false
    })
  }

  return (
    <ScrollView>

      <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
        Exams
      </Title>

      <ExamList
        onlyView={false}
        id={id}
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