import React from "react";
import { View } from "react-native";
import { List, Subheading } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import styles from "../../styling/styles";
import ClassVideo from "./ClassVideo";

const CourseList = () => {
  const [courses, setCourses] = React.useState([
    {
    title: "Class 1",
    uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
    },
    {
    title: "Class 2",
    uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
    }
])

  function renderCourses() {
    const coursesToRender = []
    for (let i = 0; i < courses.length; i++) {
      coursesToRender.push(
        <ClassVideo key={i} title={courses[i].title} uri={courses[i].uri} />
      )
      console.log(courses[i].title)
    }
    return coursesToRender;
  }

  return (
    <View>
      <Subheading style={{...styles.profileSubtitle, paddingTop: hp(0), marginTop: hp(3), marginBottom: hp(3)}}>
        Classes
      </Subheading>

      {renderCourses()}
    </View>
  )
}

export default CourseList;