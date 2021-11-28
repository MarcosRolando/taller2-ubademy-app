import React from "react"
import { View, Image, Text } from "react-native";
import { CourseSearchResult } from "./CourseSearchResult";

export const CourseSearchResults = ({ courseResults }: any) => {
  if (courseResults.length === 0) return <View />

  return (
    <View>
      {courseResults.map((course: any, index: number) =>
       <CourseSearchResult course={course} key={index}/>)}
    </View>
  );
}
