import React from "react";
import { ScrollView, View } from "react-native";
import { List, Title } from "react-native-paper";
import styles from "../../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ExamList from "./ExamsList";

const MenuExams = ({id, navigation}: any) => {

  return (
    <ScrollView>

      <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
        Exams
      </Title>

      <ExamList
        onlyView={false}
        id={id}
        
        navigation={navigation} />

    </ScrollView>
  )
}

export default MenuExams;