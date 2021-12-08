import React, {useEffect} from "react";
import { Title, Text } from "react-native-paper";
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

const examList = ["Pregunta filtrada"];

const MenuExamsCorrection = ({id, navigation}: any) => {
  const [searchValue, setSearchValue] = React.useState("none");
  const [showExamsType, setShowExamsType] = React.useState(false);

  useEffect(() => {
    //console.log(searchValue);
    (async () => {
      console.log(searchValue);
      getFilteredExams(id, searchValue);
    })();
  }, [searchValue]);

  return (
    <ScrollView>
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

      <Text>
        {searchValue}
      </Text>
    </ScrollView>
  )
}

export default MenuExamsCorrection;
