import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Paragraph, Portal, Subheading, Text, Title } from "react-native-paper";
import { Button, TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../styles/colors";
import styles from "../../styles/styles";
import { Themes } from "../../styles/themes";
import BasicInfo from "./BasicInfo";
import ClassVideo from "./ClassVideo";
import CourseList from "./CourseList";
import Gallery from "./Gallery/Gallery";
import sendLoginCredentials from "../../scripts/logIn";

import { getCourseInfo } from "../../scripts/course";
import { getUserCredentials } from "../../userCredentials";

const Course = () => {
  // const [info, setInfo] = React.useState({
  //   title: "Titulo del curso muy muy muy largo",
  //   source: require('../../images/example.jpg'),
  //   intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   subscriptionType: "FREE",
  //   images: [
  //     {
  //       title: "Title 1",
  //       url: "https://i.imgur.com/UYiroysl.jpg"
  //     },
  //     {
  //       title: "Title 2",
  //       url: "https://i.imgur.com/UPrs1EWl.jpg"
  //     }
  //   ],
  //   videos: [
  //     {
  //       title: "Class 1",
  //       uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
  //       },
  //       {
  //       title: "Class 2",
  //       uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
  //       }
  //   ]
  // })

  const [info, setInfo] = React.useState({
    title: "Titulo del curso muy muy muy largo",
    source: require('../../images/example.jpg'),
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    subscriptionType: "FREE",
    images: [] as Array<{title: string, url: string}>,
    videos: [] as Array<{title: string, uri: string}>
  })

  const [showVideo, setShowVideo] = React.useState(true);
  const [showImages, setShowImages] = React.useState(true);

  useEffect(() => {
    (
      async () => {
        await getCourseInfo()
          .then(({
            id, country, course_type, description, hashtags,
            images, subscription_type, title, total_exams, _videos}) => {
            
            const videosParsed = [];
            for (let i = 0; i < Object.keys(_videos).length; i++) {
              videosParsed.push({
                title: _videos[i].name,
                uri: _videos[i].url
              })
            };

            const imagesParsed = [] as Array<{title: string, url: string}>;
            for (let i = 1; i < Object.keys(images).length; i++) {
              imagesParsed.push({
                title: "",
                url: images[i]
              })
            }

            setInfo({
              ...info,
              title: title,
              source: images[0],
              subscriptionType: subscription_type,
              intro: description,
              videos: videosParsed,
              images: imagesParsed
            })
          })
      }
    )()
  }, [])

  return (
    <ScrollView style={{paddingHorizontal: wp(3)}}>
      <View>
        <BasicInfo info={info} />
      </View>

      {showVideo ? (
        <CourseList info={info}/>
        ) : null}

      <View style={{marginBottom: hp(3)}}></View>

      {showImages ? (
        <Gallery info={info}/>
        ) : null}

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