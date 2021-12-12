import React, {useEffect} from "react";
import { Image, FlatList, Text, StyleSheet, View } from "react-native";
import { Subheading } from "react-native-paper";
import { heightPercentageToDP as hp,
   widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../styles/colors";
import styles from "../../styles/styles";

const Item = ({ title }: any) => (
  <View style={stylesLocal.item}>
    <View style={stylesLocal.itemContainer}>
      <Image
        source={require("../../images/badge.png")}
        style={{flex: 1, width: undefined, height: undefined, resizeMode: "cover"}}
      ></Image>

      <Text style={stylesLocal.text}>
        {title}
      </Text>
    </View>
  </View>
);

const Badges = ({passedCourses} : any) => {
  const [data, setData] = React.useState([] as Array<{id: string, title: string}>)

  useEffect(() => {
    const dataAux = [] as Array<{id: string, title: string}>;
    for (let i = 0; i < Object.keys(passedCourses).length; i++) {
      dataAux.push({
        id: i.toString(),
        title: passedCourses[i].title
      })
    }
    setData(dataAux);
  }, [passedCourses])


  const renderItem = ({ item }: any) => (
    <Item title={item.title} />
  );

  return (
    <View>
      
      {(Object.keys(passedCourses).length > 0) ? (
        <Subheading style={styles.profileSubtitle}>
          Certificates
        </Subheading>
      ) : <></>}


      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default Badges;

const stylesLocal = StyleSheet.create({
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