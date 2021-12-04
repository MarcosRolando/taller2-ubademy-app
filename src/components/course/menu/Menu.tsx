import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { List, Text } from "react-native-paper";
import styles from "../../../styles/styles";
import colors from "../../../styles/colors";

const Menu = (props: any) => {

  function goToCourseScreen() {
    //TODO:
    console.log("a la pantalla de curso!")
  }

  function goToExamsScreen() {
        //TODO:
        console.log("a la pantalla con la lista de examenes!")
  }

  function goToStudentsScreen(){
    //TODO:
    console.log("a la pantalla con la lista de alumnos!")
  }

  return (
    <ScrollView>

      <Text style={styles.profileTitle}>
        Menu
      </Text>

      <List.Item
        title={"See course"}
        right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
        onPress={goToCourseScreen}
      />

      <List.Item
        title={"See exams"}
        right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
        onPress={goToExamsScreen}
      />

      <List.Item
        title={"See students"}
        right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
        onPress={goToCourseScreen}
      />


    </ScrollView>
  )
}

export default Menu;