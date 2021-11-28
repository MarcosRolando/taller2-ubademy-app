import React from "react";
import { Searchbar } from "react-native-paper";
import colors from "../../styles/colors";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP, widthPercentageToDP as wp } from "react-native-responsive-screen";
import DropDown from "react-native-paper-dropdown";

const Searcher = ({ navigation, onCourseSearch }: any) => {
  const [searchQuery, setSearchQuery] = React.useState({
    value: '',
    placeholder: 'Search',
    color: 'grey'
  });
  const [showCoursesType, setShowCoursesType] = React.useState(false);
  const [coursesType, setCoursesType] = React.useState([{label:'Art', value:'Art'}, {label:'Programming', value:'Programming'}]);
  const [selectedCourseType, setSelectedCourseType] = React.useState('');

  const [showSubType, setShowSubType] = React.useState(false);
  const [subTypes, setSubTypes] = React.useState([{label:'Free', value:'Free'}, {label:'Gold', value:'Gold'}]);
  const [selectedSubType, setSelectedSubType] = React.useState('');

  const onChangeSearch = (query: string) => 
    setSearchQuery({placeholder: 'Search', value: query, color: 'grey'});

  function sendQuery() {
    onCourseSearch(selectedCourseType, selectedSubType);
    // if (searchQuery.value !== '') { TODO
    //   getProfileInfo(searchQuery.value)
    //   .then(({_name, _email, _location, _subType, _image, _genres}) => {
    //     const userProfile = newUserProfile(_name, _email, _location, _subType, _image, _genres);
    //     navigation.navigate(USER, { userProfile });
    //   })
    //   .catch((error) => {
    //     setSearchQuery({
    //       value: '', 
    //       placeholder: 'That user does not exist',
    //       color: colors.error
    //     })
    //   });
    // }
  }

  return (
    <View>
      <Searchbar
        placeholder={searchQuery.placeholder}
        placeholderTextColor={searchQuery.color}
        onChangeText={onChangeSearch}
        value={searchQuery.value}
        style={{...styles.searchbar}}
        iconColor={colors.primary}
        onIconPress={sendQuery}
        />
      <View style={{flexDirection: 'row', flex: 1, marginHorizontal: wp(5)}}>
        <View style={{flex: 1, marginRight: wp(3)}}>
          <DropDown
            label={"Subject"}
            mode={"outlined"}
            visible={showCoursesType}
            showDropDown={() => setShowCoursesType(true)}
            onDismiss={() => setShowCoursesType(false)}
            value={selectedCourseType}
            setValue={setSelectedCourseType}
            list={coursesType}
          />
        </View>
        <View style={{flex: 1}}>
          <DropDown
            label={"Subscription"}
            mode={"outlined"}
            visible={showSubType}
            showDropDown={() => setShowSubType(true)}
            onDismiss={() => setShowSubType(false)}
            value={selectedSubType}
            setValue={setSelectedSubType}
            list={subTypes}
          />
        </View>
      </View>
    </View>
  );
}

export default Searcher;

const styles = StyleSheet.create({
  searchbar: {
    marginHorizontal: wp(4),
    marginVertical: wp(3),
  }
});
