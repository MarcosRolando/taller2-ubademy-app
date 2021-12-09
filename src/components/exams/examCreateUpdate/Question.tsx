import React from "react";
import { View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

const MESSAGE_ERROR_EMPTY_QUESTION = "This question is empty";

const Question = ({i, questionsList, setQuestionsList} : any) => {
  function questionIsEmpty(index : number) {
    return questionsList[index].value === "";
  }

  return(
    <View key={i}>
      <TextInput
        label="Enter a question"
        value={questionsList[i].value}
        right={
          <TextInput.Icon
            name="close-circle"
            onPress={() => {
              setQuestionsList(questionsList.filter((question: any) => question.id !== questionsList[i].id ))
            }}
          />
        }
        multiline={true}
        onChangeText={(newValue) => {
          setQuestionsList(questionsList.map((question: any) => {
            if (question.id === questionsList[i].id) {
              question.value = newValue;
            }
            return question;
          }))
        }}
    />

      <HelperText
        type="error"
        visible={questionIsEmpty(i)}
      >
        {MESSAGE_ERROR_EMPTY_QUESTION}
      </HelperText>
    </View>
  )
}

export default Question;