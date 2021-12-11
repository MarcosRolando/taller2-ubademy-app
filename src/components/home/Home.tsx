import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useSearchCoursesByType } from "../../hooks/useSearchCoursesByType";
import { CourseSearchResults } from "../CourseSearchResults";
import Searcher from "./Searcher";

export const Home = (props: any) => {
  const { searchCoursesByType } = useSearchCoursesByType();
  const [courses, setCoures] = React.useState([] as Array<{id: string, 
    image: string, subType: string, title: string}>);
  const [loading, setLoading] = React.useState(false);

  const onCourseSearch = (courseType: string, subType: string) => {
    setLoading(true);
    searchCoursesByType(courseType, subType)
      .then((_courses: Array<any>) => {
        setCoures(_courses.map(({ _id, image, subscription_type, title}) => 
        { return {id: _id, image: image, subType: subscription_type, title: title}}));
      })
      .catch((error: Error) => {
        // TODO
        console.log(error.message);
      })
      .finally(() => setLoading(false))
  }

  return (
    <View style={props.style}>
      <Searcher 
        navigation={props.navigation} 
        onCourseSearch={onCourseSearch}
      />
      {(loading) ?
        <ActivityIndicator size='large' />
      :
        <CourseSearchResults
          navigation={props.navigation}
          courseResults={courses}
        />
      }
    </View>
  );
}
