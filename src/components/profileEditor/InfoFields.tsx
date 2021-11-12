import React from "react";
import { useCallback } from "react";
import { View } from "react-native";
import { HelperText, TextInput, Subheading } from "react-native-paper";


const InfoFields = (props : any) => {

  function changeName(event : any) {
    const newState = {
      ...props.a,
      name: event
    }
      props.setInfo(newState);
  }

  return (

    <View>

      <TextInput
        label="Name"
        onChangeText={changeName}
        value={props.info.name}
      />

    </View>

  )
}

export default InfoFields;