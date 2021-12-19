import React, {useEffect} from "react";
import { Title } from "react-native-paper";
import { ScrollView } from "react-native";
import DropDown from "react-native-paper-dropdown";
import ExamList from "./ExamsList";
import styles from "../../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getFilteredExams } from "../../../../scripts/exam";

const examTypes = [
  {label:'Corrected', value:'graded'},
  {label:'Not corrected', value:'not_graded'},
  {label: 'All', value: 'none'}
];

const MenuExamsCorrection = ({id, navigation}: any) => {
  const [searchValue, setSearchValue] = React.useState("none");
  const [showExamsType, setShowExamsType] = React.useState(false);
  const [examList, setExamList] = React.useState([] as Array<{examName: string, email: string}>);

  useEffect(() => {
    (async () => {
      try {
        const exams = await getFilteredExams(id, searchValue);
        const examAux = [];
        for (let i = 0; i < Object.keys(exams).length; i++) {
          examAux.push({
            examName: exams[i].exam_name,
            email: exams[i].student_email,
          })
        }
        setExamList(examAux);
      } catch (error) {
        alert(error);
      }
    })();
  }, [searchValue]);

  return (
    <ScrollView style={styles.screen}>
      <Title style={{...styles.profileTitle, paddingTop:hp(2)}}>
        Students' exams
      </Title>

      <DropDown
        visible={showExamsType}
        placeholder={"Select an exam type"}
        
        mode={"outlined"}
        showDropDown={() => setShowExamsType(true)}
        onDismiss={() => setShowExamsType(false)}
        value={searchValue}
        setValue={(value : any) => {
          setSearchValue(value);
        }}
        list={examTypes}
      />

      <ExamList
        id={id}
        examList={examList}
        canCorrect={true}
        navigation={navigation}
      />

    </ScrollView>
  )
}

export default MenuExamsCorrection;
