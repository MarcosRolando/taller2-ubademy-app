import React from "react";
import { Title } from "react-native-paper";
import { ScrollView } from "react-native";
import styles from "../../../../styles/styles";
import DropDown from "react-native-paper-dropdown";
const MenuExamsEdit = ({id, navigation}: any) => {
  return (
    <ScrollView>
      <Title style={styles.profileTitle}>
        Exams
      </Title>

      <DropDown>
        placeholder={"Filter"}
        placeholderTextColor={"gray"}
        value={""}
        style={styles.searchbar}
        iconColor={colors.primary}
        onIconPress={sendQuery}
      </DropDown>
    </ScrollView>
  )
}

export default MenuExamsEdit;