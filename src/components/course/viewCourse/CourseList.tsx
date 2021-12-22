import React from "react";
import { View } from "react-native";
import ClassVideo from "./ClassVideo";

const CourseList = (props: any) => {
  const [isDisabled, setIsDisabled] = React.useState(false);
  const course = props.info.videos;

  function renderCourses() {
    const coursesToRender = []
    for (let i = 0; i < course.length; i++) {
      coursesToRender.push(
        <ClassVideo
          key={i}
          title={course[i].title}
          uri={course[i].uri}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}/>
      )
    }
    return coursesToRender;
  }

  return (
    <View>

      {renderCourses()}
      
    </View>
  )
}

export default CourseList;