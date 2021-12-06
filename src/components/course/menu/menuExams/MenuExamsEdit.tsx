import React from "react";
import { Title } from "react-native-paper";
import { ScrollView } from "react-native";
import DropDown from "react-native-paper-dropdown";
import ExamList from "./ExamsList";
import styles from "../../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const examTypes = [
  {label:'Corrected', value:'Corrected'},
  {label:'Not corrected', value:'Not corrected'},
  {label: 'All', value: 'All'}
];

const MenuExamsEdit = ({id, navigation}: any) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [showExamsType, setShowExamsType] = React.useState(false);

  return (
    <ScrollView>
      <Title style={{...styles.profileTitle, paddingTop:hp(2)}}>
        Exams
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

      <ExamList id={id} navigation={navigation} onlyView={true}/>
    </ScrollView>
  )
}

export default MenuExamsEdit;
