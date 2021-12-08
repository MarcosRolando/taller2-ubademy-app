import React, { useEffect } from "react";
import { ScrollView, SafeAreaView, Text } from "react-native";
import { HelperText, Title, TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../../styles/colors";
import styles from "../../../styles/styles";
import Question from "./Question";
import { useFocusEffect } from '@react-navigation/core';

import { createExam, putEditExam } from "../../../scripts/exam";

const MESSAGE_ERROR_EMPTY_NAME = "The name is empty";
const MESSAGE_ERROR_CREATE_EMPTY_EXAM = "You can't create an empty exam";
const MESSAGE_ERROR_UPDATE_EMPTY_EXAM = "You can't update an empty exam";
const MESSAGE_ERROR_EMPTY_QUESTIONS = "There's still empty questions";

const ExamCreateUpdate = ({examName, canEdit, questions, navigation} : any) => {
  const [name, setName] = React.useState(examName);
  const [idCounter, setIdCounter] = React.useState(0);
  const [questionList, setQuestionsList] = React.useState([] as Array<{id: number, value: string}>)
  const [errorMessage, setErrorMessage] = React.useState("");

  function setQuestions() {
    const questionsAux = [] as Array<{id: number, value: string}>;
    var i = idCounter;
    for (i = 0; i < questions.length; i++) {
      questionsAux.push({
        id: i,
        value: questions[i]
      })
    }
    setQuestionsList(questionsAux);
    setIdCounter(i);
  }

  useFocusEffect(React.useCallback(() => {
    setQuestions();
    console.log("idcounter:",idCounter);
  }, []))

  function nameIsEmpty() {
    return name === "";
  }

  function addQuestion() {
    setQuestionsList([...questionList, {
      id: idCounter,
      value: ""
    }])
    setIdCounter(idCounter + 1);
  }

  function questionsAreValid(){
    if (name.length == 0) {
      setErrorMessage(MESSAGE_ERROR_EMPTY_NAME);
      return false;
    }
    if (questionList.length == 0) {
      if (canEdit) {
        setErrorMessage(MESSAGE_ERROR_UPDATE_EMPTY_EXAM);
      } else {
        setErrorMessage(MESSAGE_ERROR_CREATE_EMPTY_EXAM);
      }
      return false;
    }
    for (let i = 0; i < questionList.length; i++) {
      let value = questionList[i].value;
      if (value === "") {
        setErrorMessage(MESSAGE_ERROR_EMPTY_QUESTIONS);
        return false;
      }
    }
    setErrorMessage("");
    return true;
  }

  async function createAndSendExam() {
    try {
      let result = questionsAreValid();
      if (result && questionList.length != 0) {
        setErrorMessage("");
  
        const parsedQuestions = parseQuestions();
        await createExam(
          "61a7e42fd2398ad27a7d0099",
          parsedQuestions,
          name,
          "vi"
        ).then()
  
        navigation.goBack();
      } else {
        // TODO: informar que no se creo
      }
    } catch(error) {
      console.log(error);
      setErrorMessage('Failed to create exam');
    }
  }

  async function updateExam() {
    // let result = questionsAreValid();
    // if (result && questions.length != 0) {
    //   setErrorMessage("");
    //   // TODO: enviar al back!
    //   console.log("Se updatea el examen y se lo envía al back");
    //   console.log(questionList);
    // } else {
    //   console.log("No se updatea nada :(");
    // }
    try {
      let result = questionsAreValid();
      if (result && questionList.length != 0) {
        const questionParsed = [];
        for (let i = 0; i < questionList.length; i++) {
          questionParsed.push(questionList[i].value);
        }
        const res = await putEditExam(
          "61a7e42fd2398ad27a7d0099",
          questionParsed,
          name,
          "vi"
        )
      }
    } catch (error) {
      alert(error);
    }
  }

  function parseQuestions() {
    const parsedQuestions = [] as Array<string>;
    for (let i = 0; i < questionList.length; i++) {
      parsedQuestions.push(questionList[i].value);
    }
    return parsedQuestions;
  }

  function renderQuestions() {
    const questionsToRender = [] as any;
    for (let i = 0; i < questionList.length; i++) {
      questionsToRender.push(
      <Question
        key={i}
        i={i}
        questionsList={questionList}
        setQuestionsList={setQuestionsList}
      />)
    }
    return questionsToRender;
  }

  return (
    <ScrollView>
      <SafeAreaView>

        {canEdit ? (
          <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
            Edit exam
          </Title>
        ) : 
          <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
            Create exam
          </Title>
        }

        <TextInput
          label={"Exam's name"}
          value={name}
          onChangeText={(newName) => setName(newName)}
        >
        </TextInput>

        <HelperText
          type="error"
          visible={nameIsEmpty()}
        >
          {MESSAGE_ERROR_EMPTY_NAME}
        </HelperText>

        {renderQuestions()}

        <Button
          onPress={() => addQuestion()}
        >
          Add Question
        </Button>

        {canEdit ? (
          <Button
            onPress={() => updateExam()}
          >
            Update
          </Button>
          ) : 
          <Button
            onPress={() => createAndSendExam()}
          >
            Create
          </Button>
        }

        <Button
          onPress={() => navigation.goBack()}
        >
          Go Back
        </Button>

        <Text style={{color: colors.error, alignSelf: 'center', paddingBottom: hp(4)}}>
          {errorMessage}
        </Text>

      </SafeAreaView>
    </ScrollView>
  )
}

export default ExamCreateUpdate;
