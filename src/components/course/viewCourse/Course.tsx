import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import BasicInfo from "./BasicInfo";
import CourseList from "./CourseList";
import Gallery from "./Gallery/Gallery";
import { useFocusEffect } from "@react-navigation/native";

import { getCourseInfo } from "../../../scripts/course";
import { getUserCredentials } from "../../../userCredentials";
import { EXAM_CREATE_UPDATE, CREATE_UPDATE_COURSE } from "../../../routes";

const Course = ({ id, navigation }: any) => {

  const [info, setInfo] = React.useState({
    id: '',
    title: '',
    cover: undefined,
    intro: '',
    subscriptionType: '',
    images: [] as Array<{title: string, url: string}>,
    videos: [] as Array<{title: string, uri: string}>,
    creatorEmail: '',
    ownEmail: ''
  })

  const [showVideo, setShowVideo] = React.useState(true);
  const [showImages, setShowImages] = React.useState(true);
  const [isSubscribed, setIsSubscribe] = React.useState(true);
  const [isCreator, setIsCreator] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  function goToExamCreateScreen() {
    navigation.navigate(EXAM_CREATE_UPDATE, {
      id: info.id,
      name: "",
      isEditing: false
    });
  }

  function goToEditCourse() {
    navigation.navigate(CREATE_UPDATE_COURSE, {
      id: info.id,
      isEditing: true
    });
  }

  useFocusEffect(React.useCallback(() => {
    (async () => {
      try{
        const { country, course_type, description, hashtags,
          images, subscription_type, title, total_exams, _videos,
          creatorEmail } = await getCourseInfo(id);

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
        
        const credentials = getUserCredentials();

        setInfo({
          ...info,
          id: id,
          title: title,
          cover: images[0],
          subscriptionType: subscription_type,
          intro: description,
          videos: videosParsed,
          images: imagesParsed,
          creatorEmail: creatorEmail,
          ownEmail: credentials.email
        })
        if (Object.keys(info.images).length > 0) {
          setShowImages(true);
        }
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []))

  if (loading) {
    return (
      <View style={{marginTop: hp(5)}}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View style={{paddingHorizontal: wp(3)}}>
      <View>
        <BasicInfo info={info} cover={info.cover}/>
      </View>

      {showVideo ? (
        <CourseList info={info}/>
        ) : null}

      <View style={{marginBottom: hp(3)}}></View>

      {showImages ? (
        <Gallery info={info}/>
        ) : null}

      {isCreator ? (
        <View>
          <Button
            onPress = {() => goToEditCourse()}
            style={{marginTop:hp(3)}}
          >
            Edit course
          </Button>
        </View>
      ) : <></> }
    </View>
  );
}

export default Course;
