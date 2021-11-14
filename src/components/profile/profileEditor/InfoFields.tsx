import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "../../../styles/styles";
import { Themes } from "../../../styles/themes";


const InfoFields = (props : any) => {

  function changeName(event : any) {
    const newState = {
      ...props.a,
      name: event
    }
      props.setInfo(newState);
  }

  return (

    <View style={styles.fieldView}>

      <TextInput
        theme={Themes.textInput}
        onChangeText={changeName}
        value={props.info.name}
      />

    </View>

  )
}

export default InfoFields;