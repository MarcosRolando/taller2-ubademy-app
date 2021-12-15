import React from "react";
import { Searchbar } from "react-native-paper";
import colors from "../../styles/colors";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import DropDown from "react-native-paper-dropdown";
import { getProfileInfo } from "../../scripts/profile";
import { USER } from "../../routes";
import { newUserProfile } from "../../models/userProfile";
import { useFocusEffect } from "@react-navigation/native";
import { getSearchCourseFilters } from "../../scripts/search";

const Searcher = ({ navigation, onCourseSearch }: any) => {
  const [searchQuery, setSearchQuery] = React.useState({
    value: '',
    placeholder: 'Search',
    color: 'grey'
  });
  const [showCoursesType, setShowCoursesType] = React.useState(false);
  const [coursesType, setCoursesType] = React.useState([] as Array<any>);
  const [selectedCourseType, setSelectedCourseType] = React.useState('none');

  const [showSubType, setShowSubType] = React.useState(false);
  const [subTypes, setSubTypes] = React.useState([] as Array<any>);
  const [selectedSubType, setSelectedSubType] = React.useState('none');

  useFocusEffect(React.useCallback(() => {
    (async () => {
      try {
        const { _genres, _subTypes } = await getSearchCourseFilters();
        setCoursesType(_genres.map((_genre: any) => {
          if (_genre === 'Any') {
            return {label:_genre, value: 'none'}
          }
          return {label:_genre, value:_genre};
        }));
        setSubTypes(_subTypes.map((_subType: any) => {
          if (_subType === 'Any') {
            return {label:_subType, value: 'none'}
          }
          return {label:_subType, value:_subType};
        }));
      } catch(error) {
        console.log(error);
      }
    })();
  }, []))

  const onChangeSearch = (query: string) => 
    setSearchQuery({placeholder: 'Search', value: query, color: 'grey'});

  function sendQuery() {
    if (searchQuery.value !== '') {
      getProfileInfo(searchQuery.value)
      .then(({_name, _email, _location, _subType, _image, _genres}) => {
        const userProfile = newUserProfile(_name, _email, _location, _subType, _image, _genres);
        navigation.navigate(USER, { userProfile });
      })
      .catch((error) => {
        console.log(error)
        setSearchQuery({
          value: '', 
          placeholder: 'That user does not exist',
          color: colors.error
        })
      });
    } else {
      onCourseSearch(selectedCourseType, selectedSubType); // TODO despues mejorar esto
    }
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
