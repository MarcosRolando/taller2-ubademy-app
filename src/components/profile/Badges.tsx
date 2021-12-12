import React from "react";
import { Image, FlatList, Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { block } from "react-native-reanimated";
import { heightPercentageToDP as hp,
   widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../styles/colors";

const DATA = [
  {
    id: '1',
    title: 'First Item',
  },
  {
    id: '2',
    title: 'Second Item y mucho texto para rellenar',
  },
  {
    id: '3',
    title: 'Third Item',
  },
  {
    id: '4',
    title: '4 Item',
  },
  {
    id: '5',
    title: '5 Item',
  },
];

const Item = ({ title }: any) => (
  <View style={styles.item}>
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <Image
          source={require("../../images/badge.png")}
          style={{flex: 1, width: undefined, height: undefined, resizeMode: "cover"}}
        ></Image>

        <Text style={styles.text}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const Badges = () => {

  const renderItem = ({ item }: any) => (
    <Item title={item.title} />
  );

  return (
    <View>
      <FlatList
      horizontal
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      />
    </View>
  )
}

export default Badges;

const styles = StyleSheet.create({
  item: {
    marginVertical: wp(5),
    marginHorizontal: wp(5)
  },
  itemContainer: {
    width: wp(25),
    height: wp(25),
    alignContent:"center",
    justifyContent:"center"
  },
  text : {
    position: "absolute",
    alignSelf:"center",
    textAlign: "center",
    color: colors.background,
    fontWeight: "bold"
  }
});