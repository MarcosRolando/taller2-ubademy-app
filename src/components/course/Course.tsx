import React from "react";
import { Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Paragraph, Portal, Subheading, Text, Title } from "react-native-paper";
import { Button, TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../styling/colors";
import styles from "../../styling/styles";
import { Themes } from "../../styling/themes";
import BasicInfo from "./BasicInfo";
import ClassVideo from "./ClassVideo";
import CourseList from "./CourseList";
import Gallery from "./Gallery/Gallery";

const Course = () => {
  const [info, setInfo] = React.useState({
    name: "Titulo del curso",
    source: require('../../images/example.jpg'),
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    subscriptionType: "FREE",
    images: [
      {
        title: "Title 1",
        url: "https://i.imgur.com/UYiroysl.jpg"
      },
      {
        title: "Title 2",
        url: "https://i.imgur.com/UPrs1EWl.jpg"
      }
    ],
    videos: [
      {
        title: "Class 1",
        uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
        },
        {
        title: "Class 2",
        uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
        }
    ]
  })

  return (
    <ScrollView style={{paddingHorizontal: wp(3)}}>
      <View>
        <BasicInfo info={info} />
      </View>

      <CourseList info={info}/>

      <View style={{marginBottom: hp(3)}}></View>

      <Gallery info={info}/>

      <View style={{paddingBottom: hp(10)}}></View>

      <Portal>
        <View style={styles.viewOnFront}>

          <Text>{info.subscriptionType}</Text>

          <TouchableOpacity
            onPress={() => console.log("presionado!")}
            style={{backgroundColor: colors.background, borderRadius: 1.5, padding:wp(2), marginLeft:wp(10)}}
          >

            <Text style={{}}
              >SUBSCRIBE
            </Text>
            
          </TouchableOpacity>

        </View>
      </Portal>
  
    </ScrollView>
  )

}

export default Course;