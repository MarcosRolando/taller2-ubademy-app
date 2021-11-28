import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Button, TextInput, Title, HelperText } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../../styles/colors";
import styles from "../../../styles/styles";

const ExamCreateUpdate = ({navigation} : any) => {

  const [idCounter, setIdCounter] = React.useState(0);
  const [questions, setQuestions] = React.useState([] as Array<{id: number, value: string}>)

  const [errorMessage, setErrorMessage] = React.useState("");

  function addQuestion() {
    setQuestions([...questions, {
      id: idCounter,
      value: ""
    }])
    setIdCounter(idCounter + 1);
  }

  function questionIsEmpty(index : number) {
    return questions[index].value === "";
  }

  function questionsAreValid(){
    if (questions.length == 0) {
      setErrorMessage("You can't create an empty exam");
      return false;
    }
    for (let i = 0; i < questions.length; i++) {
      let value = questions[i].value;
      if (value === "") {
        setErrorMessage("There's still empty questions");
        return false;
      }
    }
    setErrorMessage("");
    return true;
  }

  function createExam() {
    let result = questionsAreValid();
    if (result && questions.length != 0) {
      setErrorMessage("");
      // TODO: enviar al back!
      console.log("Se envia al back");
    } else {
      console.log("No se envia al back");
    }
  }

  function renderQuestions() {
    const questionsToRender = [] as any;
    for (let i = 0; i < questions.length; i++) {
      questionsToRender.push(
        <View key={i}>
          <TextInput
            label="Enter a question"
            value={questions[i].value}
            right={
              <TextInput.Icon
                name="close-circle"
                onPress={() => {
                  setQuestions(questions.filter((question) => question.id !== questions[i].id ))
                }}
              />
            }
            multiline={true}
            onChangeText={(newValue) => {
              setQuestions(questions.map((question) => {
                if (question.id === questions[i].id) {
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
            This question is empty
          </HelperText>
      </View>
      
      )
    }
    return questionsToRender;
  }

  return (
    <SafeAreaView style={styles.profileTitle}>
      <Text style={{fontSize:50, color: colors.primary}}>
        Create Exam
      </Text>

      {renderQuestions()}

      <Button
        onPress={() => addQuestion()}
      >
        Add Question
      </Button>

      <Button
        onPress={() => createExam()}
      >
        Create
      </Button>

      <Text style={{color: colors.error, alignSelf: 'center', paddingBottom: hp(4)}}>
        {errorMessage}
      </Text>

    </SafeAreaView>
  )
}

export default ExamCreateUpdate;
