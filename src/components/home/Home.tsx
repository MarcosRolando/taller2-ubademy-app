import React from "react";
import { View } from "react-native";
import { useSearchCoursesByType } from "../../hooks/useSearchCoursesByType";
import { CourseSearchResults } from "../CourseSearchResults";
import Searcher from "./Searcher";

export const Home = (props: any) => {
  const { searchCoursesByType } = useSearchCoursesByType();
  const [courses, setCoures] = React.useState([] as Array<{id: string, 
    image: string, subType: string, title: string}>);

  const onCourseSearch = (courseType: string, subType: string) => {
    searchCoursesByType(courseType, subType)
      .then((_courses: Array<any>) => {
        setCoures(_courses.map(({ _id, image, subscription_type, title}) => 
        { return {id: _id, image: image, subType: subscription_type, title: title}}));
      })
      .catch((error: Error) => {
        // TODO
        console.log(error.message);
      })
  }

  return (
    <View style={props.style}>
      <Searcher 
        navigation={props.navigation} 
        onCourseSearch={onCourseSearch}
      />
      <CourseSearchResults 
        courseResults={courses}
      />
    </View>
  );
}
