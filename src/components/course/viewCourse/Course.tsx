import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, Title, Subheading } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import CourseList from "./CourseList";
import Gallery from "./Gallery/Gallery";
import { useFocusEffect } from "@react-navigation/native";
import { getMyCourses } from "../../../scripts/profile";
import styles from "../../../styles/styles";

import { getCourseInfo } from "../../../scripts/course";
import { getUserCredentials } from "../../../userCredentials";
import { CREATE_UPDATE_COURSE } from "../../../routes";

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

  const [showVideo, setShowVideo] = React.useState(false);
  const [showImages, setShowImages] = React.useState(false);
  const [isSubscribed, setIsSubscribe] = React.useState(false);
  const [isCreator, setIsCreator] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  function goToEditCourse() {
    navigation.navigate(CREATE_UPDATE_COURSE, {
      id: info.id,
      isEditing: true
    });
  }

  useFocusEffect(React.useCallback(() => {
    (async () => {
      try{
        const { info_level, country, course_type, description, hashtags,
          images, subscription_type, title, total_exams, _videos,
          creatorEmail } = await getCourseInfo(id);

        const videosParsed = [];
        const imagesParsed = [] as Array<{title: string, url: string}>;
        
        
        if (info_level !== 'basic') {
          for (let i = 0; i < Object.keys(_videos).length; i++) {
            videosParsed.push({
              title: _videos[i].name,
              uri: _videos[i].url
            })
          };
          
          for (let i = 1; i < Object.keys(images).length; i++) {
            imagesParsed.push({
              title: "",
              url: images[i]
            })
          }

          if (imagesParsed.length > 0) {
            setShowImages(true);
          }

          if (videosParsed.length > 0) {
            setShowVideo(true);
          }
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

    (async () => {
      const myCourses = await getMyCourses();

      for (let i = 0; i < myCourses.student.length; i++) {
        if (myCourses.student[i]._id === id) {
          setIsCreator(false);
          setIsSubscribe(true)
          break;
        }
      }
      for (let i = 0; i < myCourses.collaborator.length; i++) {
        if (myCourses.collaborator[i]._id === id) {
          setIsCreator(false);
          setIsSubscribe(true)
          break;
        }
      }
      for (let i = 0; i < myCourses.creator.length; i++) {
        if (myCourses.creator[i]._id === id) {
          setIsCreator(true);
          setIsSubscribe(true)
          break;
        }
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

      <Title style={{...styles.profileTitle, marginTop:hp(-5)}}>
        Classes
      </Title>

      {(showVideo && isSubscribed) ? (
        <View style={{marginHorizontal:wp(2)}}>

          <Subheading style={styles.profileSubtitle}>
            Videos:
          </Subheading>

          <CourseList info={info}/>

        </View>
        ) : <></> }


      {(showImages && isSubscribed) ? (
        <View style={{marginHorizontal:wp(2)}}>

          <Subheading style={{...styles.profileSubtitle, marginBottom: hp(3)}}>
            Images:
          </Subheading>
          
          <Gallery info={info} />

        </View>
        ) : <></> }

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
