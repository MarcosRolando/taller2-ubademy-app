import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "../../../styles/styles";
import { Themes } from "../../../styles/themes";


const InfoFields = ({ name, setName }: any) => {
  return (
    <View style={styles.fieldView}>
      <TextInput
        theme={Themes.textInput}
        onChangeText={setName}
        value={name}
      />
    </View>

  )
}

export default InfoFields;
