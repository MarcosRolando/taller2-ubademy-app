import React from "react";
import { Searchbar } from "react-native-paper";
import colors from "../../styles/colors";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { USER } from "../../routes";
import { getProfileInfo } from "../../scripts/profile";
import { newUserProfile } from "../../models/userProfile";

const Searcher = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = React.useState({
    value: '',
    placeholder: 'Search',
    color: 'grey'
  });
  const onChangeSearch = (query: string) => setSearchQuery({placeholder: 'Search', value: query, color: 'grey'});

  function sendQuery() {
    if (searchQuery.value !== '') {
      getProfileInfo(searchQuery.value)
      .then(({_name, _email, _location, _subType, _image, _genres}) => {
        const userProfile = newUserProfile(_name, _email, _location, _subType, _image, _genres);
        navigation.navigate(USER, { userProfile });
      })
      .catch((error) => {
        setSearchQuery({
          value: '', 
          placeholder: 'That user does not exist',
          color: colors.error
        })
      });
    }
  }

  return (
    <Searchbar
      placeholder={searchQuery.placeholder}
      placeholderTextColor={searchQuery.color}
      onChangeText={onChangeSearch}
      value={searchQuery.value}
      style={{...styles.searchbar}}
      iconColor={colors.primary}
      onIconPress={sendQuery}
    />
  );
}

export default Searcher;

const styles = StyleSheet.create({
  searchbar: {
    marginHorizontal: wp(4),
    marginVertical: wp(3),
  }
});
