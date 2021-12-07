import React from "react";
import { ScrollView, View } from "react-native";
import { List, Title } from "react-native-paper";
import { COURSE, COURSE_MENU_EXAMS, COURSE_MENU_EXAMS_CORRECTION } from "../../../routes";
import styles from "../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Menu = ({id, navigation}: any) => {
  const [canEdit, setCanEdit] = React.useState(true);
  const [canCorrect, setCanCorrect] = React.useState(true);

  function goToCourseScreen() {
    navigation.navigate(COURSE, {id: id});
  }

  function goToExamsScreen() {
    navigation.navigate(COURSE_MENU_EXAMS, {
        id: id,
        canEdit: canEdit
    })
  }

  function goToStudentsExamsScreen() {
    navigation.navigate(COURSE_MENU_EXAMS_CORRECTION, {
      id: id,
      canCorrect: canCorrect
    })
  }

  function goToStudentsScreen(){
    //TODO:
    console.log("a la pantalla con la lista de alumnos!")
  }

  return (
    <ScrollView>
      
      <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
        Menu
      </Title>

      <View style={styles.menu}>
        <List.Item
          title={"See course"}
          right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
          onPress={goToCourseScreen}
        />

        <List.Item
          title={"See course's exams"}
          right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
          onPress={goToExamsScreen}
        />

        <List.Item
          title={"See students' exams"}
          right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
          onPress={goToStudentsExamsScreen}
        />

        <List.Item
          title={"See students"}
          right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
          onPress={goToStudentsScreen}
        />
      </View>

    </ScrollView>
  )
}

export default Menu;