import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Button, TextInput, Title, HelperText } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../../styles/colors";
import styles from "../../../styles/styles";

const Question = (props : any) => {
  function questionIsEmpty(index : number) {
    return props.questions[index].value === "";
  }

  return(
    <View key={props.i}>
      <TextInput
        label="Enter a question"
        value={props.questions[props.i].value}
        right={
          <TextInput.Icon
            name="close-circle"
            onPress={() => {
              props.setQuestions(props.questions.filter((question: any) => question.id !== props.questions[props.i].id ))
            }}
          />
        }
        multiline={true}
        onChangeText={(newValue) => {
          props.setQuestions(props.questions.map((question: any) => {
            if (question.id === props.questions[props.i].id) {
              question.value = newValue;
            }
            return question;
          }))
        }}
    />

      <HelperText
        type="error"
        visible={questionIsEmpty(props.i)}
      >
        This question is empty
      </HelperText>
    </View>
  )
}

export default Question;