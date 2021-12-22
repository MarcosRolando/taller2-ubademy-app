import React from "react";
import { View } from "react-native";
import ClassVideo from "./ClassVideo";

const CourseList = (props: any) => {
  const [canPlay, setCanPlay] = React.useState(true);
  const course = props.info.videos;

  function renderCourses() {
    const coursesToRender = []
    for (let i = 0; i < course.length; i++) {
      coursesToRender.push(
        <ClassVideo
          key={i}
          title={course[i].title}
          uri={course[i].uri}
          canPlay={canPlay}
          setCanPlay={setCanPlay}/>
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