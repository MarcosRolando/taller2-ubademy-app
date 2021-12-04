import React from "react";
import { ScrollView } from "react-native";
import { List, Title } from "react-native-paper";
import { COURSE } from "../../../routes";
import styles from "../../../styles/styles";

const Menu = ({id, navigation}: any) => {

  function goToCourseScreen() {
    //TODO:
    console.log("a la pantalla de curso!");
    navigation.navigate(COURSE, {id: id});
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
      
      <Title style={styles.profileTitle}>
        Menu
      </Title>

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