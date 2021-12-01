import React, { useEffect } from "react";
import { View } from "react-native";
import { Button, Portal, Text, FAB } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../../styles/colors";
import styles from "../../../styles/styles";
import BasicInfo from "./BasicInfo";
import CourseList from "./CourseList";
import Gallery from "./Gallery/Gallery";
import sendLoginCredentials from "../../../scripts/logIn";
import ExamList from "./ExamsList";
import { StyleSheet } from 'react-native';

import { getCourseInfo } from "../../../scripts/course";
import { getUserCredentials } from "../../../userCredentials";

const Course = (props : any) => {

  const [info, setInfo] = React.useState({
    title: "Titulo del curso muy muy muy largo",
    source: require('../../../images/example.jpg'),
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    subscriptionType: "FREE",
    images: [] as Array<{title: string, url: string}>,
    videos: [] as Array<{title: string, uri: string}>,
    creatorEmail: "",
    ownEmail: ""
  })

  const [showVideo, setShowVideo] = React.useState(true);
  const [showImages, setShowImages] = React.useState(true);
  const [showCover, setShowCover] = React.useState(false);
  const [showExams, setShowExams] = React.useState(true);
  const [isSubscribed, setIsSubscribe] = React.useState(true);

  useEffect(() => {
    (
      async () => {
        await getCourseInfo()
          .then(({
            id, country, course_type, description, hashtags,
            images, subscription_type, title, total_exams, _videos,
            creatorEmail}) => {
            
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

            if (Object.keys(images).length > 0) {
              setShowCover(true);
            }

            const credentials = getUserCredentials();

            console.log(info.creatorEmail);
            setInfo({
              ...info,
              title: title,
              source: images[0],
              subscriptionType: subscription_type,
              intro: description,
              videos: videosParsed,
              images: imagesParsed,
              creatorEmail: creatorEmail,
              ownEmail: credentials.email
            })
          })

          if (Object.keys(info.images).length > 0) {
            setShowImages(true);
          }

          console.log(info.creatorEmail);
          console.log(info.ownEmail);
      }
    )()
  }, [])

  return (
    <View style={{paddingHorizontal: wp(3)}}>
      <View>
        <BasicInfo info={info} showCover={showCover} />
      </View>

      {isSubscribed ? (
        <>
          {showVideo ? (
            <CourseList info={info}/>
            ) : null}

          <View style={{marginBottom: hp(3)}}></View>

          {showImages ? (
            <Gallery info={info}/>
            ) : null}

          {showExams ? (
            <ExamList/>
            ) : <></>}

          {info.ownEmail == info.creatorEmail ? (
            // TODO: ir a la pantalla de edición del curso
            <Button
              onPress = {() => {console.log("Going to the editor screen, bro!")}}
              style={{marginTop:hp(3)}}
            >
              Edit course
            </Button>
          ) : null}
            </>
          ) :
        <>
          <Portal>
            <View style={styles.viewOnFront}>

              <Text>{info.subscriptionType}</Text>

              <TouchableOpacity
                // TODO: que se avise al baka-back que se subscribió
                onPress={() => console.log("presionado!")}
                style={{backgroundColor: colors.background, borderRadius: 1.5, padding:wp(2), marginLeft:wp(10)}}
              >

                <Text style={{}}
                  >SUBSCRIBE
                </Text>
                
              </TouchableOpacity>
              
            </View>
          </Portal>
        </>
      }

    </View>
  );
}

const stylesS = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

export default Course;