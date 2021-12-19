import React from "react";
import { View } from "react-native";
import { List, Title } from "react-native-paper";
import styles from "../../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { EXAM, EXAM_CORRECTED } from "../../../../routes";

const MenuExamOptions = ({courseId, examName, navigation}: any) => {

  function goToExamScreen() {
    navigation.navigate(EXAM, {
      courseId: courseId,
      title: examName,
      onlyView: false
    })
  }

  function goToExamCorrections() {
    navigation.navigate(EXAM_CORRECTED, {
      courseId: courseId,
      examName: examName
    })
  }

  return (
    <View style={styles.screen}>
      <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
        {examName}
      </Title>

      <View style={styles.menu}>

        <List.Item
          title={"Do exam"}
          right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
          onPress={goToExamScreen}
        />

        <List.Item
          title={"See corrections"}
          right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
          onPress={goToExamCorrections}
        />

      </View>
    </View>
  )
}

export default MenuExamOptions;