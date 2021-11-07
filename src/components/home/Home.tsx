import React from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../styling/colors";

const Home = (props: any) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <View style={props.style}>
      <Searchbar
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
        iconColor={colors.primary}
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  searchbar: {
    marginHorizontal: wp(4),
    marginVertical: wp(3),
  }
});
