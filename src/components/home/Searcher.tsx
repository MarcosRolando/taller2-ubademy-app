import React from "react";
import { Searchbar } from "react-native-paper";
import colors from "../../styles/colors";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { USER } from "../../routes";

const Searcher = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);

  function sendQuery() {
    if (searchQuery === 'some other user') {
      navigation.navigate(USER);
    }
  }

  return (
    <Searchbar
      placeholder='Search'
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={styles.searchbar}
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
