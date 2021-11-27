import React from "react";
import { View } from "react-native";
import { Subheading } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import styles from "../../../styles/styles";
import ClassVideo from "./ClassVideo";

const CourseList = (props: any) => {
  const course = props.info.videos;

  function renderCourses() {
    const coursesToRender = []
    for (let i = 0; i < course.length; i++) {
      coursesToRender.push(
        <ClassVideo key={i} title={course[i].title} uri={course[i].uri} />
      )
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