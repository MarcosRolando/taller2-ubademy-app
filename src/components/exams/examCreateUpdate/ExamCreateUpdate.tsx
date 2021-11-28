import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Button } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../../styles/colors";
import styles from "../../../styles/styles";
import Question from "./Question";

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
      console.log(questions);
    } else {
      console.log("No se envia al back");
    }
  }

  function renderQuestions() {
    const questionsToRender = [] as any;
    for (let i = 0; i < questions.length; i++) {
      questionsToRender.push(
      <Question
        key={i}
        i={i}
        questions={questions}
        setQuestions={setQuestions}
      />)
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
