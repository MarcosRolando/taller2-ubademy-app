import React, {useEffect} from "react";
import { Image, FlatList, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Subheading } from "react-native-paper";
import { heightPercentageToDP as hp,
   widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../styles/colors";
import styles from "../../styles/styles";
import * as Print from 'expo-print';
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { downloadAsync } from "expo-file-system";


function generateHTML(
  courseName: string,
  studentName: string,
  creatorName: string) {
  const html =
  `
  <div style="width:800px; height:600px; padding:20px; text-align:center; border: 10px solid #787878">
  <div style="width:750px; height:550px; padding:20px; text-align:center; border: 5px solid #787878">
    <span style="font-size:50px; font-weight:bold">Certificate of Completion</span>
    <br><br>
    <span style="font-size:25px"><i>This is to certify that</i></span>
    <br><br>
    <span style="font-size:30px"><b>${studentName}</b></span><br/><br/>
    <span style="font-size:25px"><i>has completed the course</i></span> <br/><br/>
    <span style="font-size:30px">${courseName}</span> <br/><br/>
    <span style="font-size:25px"><i>created by/i></span> <br/><br/>
    <span style="font-size:30px">${creatorName}</span> <br/><br/>
  </div>
  </div>
  `;
  return html;
}

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const html = generateHTML("curso", "estudiante", "creador");
    const { uri } = await Print.printToFileAsync({
      html
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }

const Item = ({ title }: any) => (
  <View style={stylesLocal.item}>
    <TouchableOpacity onPress={() => printToFile()}>
    <View style={stylesLocal.itemContainer}>
      <Image
        source={require("../../images/badge.png")}
        style={{flex: 1, width: undefined, height: undefined, resizeMode: "cover"}}
      ></Image>

      <Text style={stylesLocal.text}>
        {title}
      </Text>
    </View>
    </TouchableOpacity>
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