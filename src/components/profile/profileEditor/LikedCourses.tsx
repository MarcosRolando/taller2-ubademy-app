import React from "react";
import { View } from "react-native";
import { Chip, List } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const LikedCourses = ({likedCourses, setLikedCourses, courses}: any) => {

  function renderCourses() {
    const coursesToRender = [];
    for (let i = 0; i < likedCourses.length; i++) {
      coursesToRender.push(
        <Chip
          key={likedCourses[i]}
          onClose={() => {
            setLikedCourses(likedCourses.filter((likedTag: string) => likedTag !== likedCourses[i]));
          }}
          style={{margin:wp(1)}}
        >
          {likedCourses[i]}
        </Chip>
      )
    }
    return coursesToRender;
  }

  function renderSelectableCourses() {
    const coursesToRender = [];
    for (let i = 0; i < courses.length; i++) {
      coursesToRender.push(
        <List.Item
          key={courses[i]}
          title={courses[i]}
          onPress={() => {
            if (!likedCourses.includes(courses[i])) {
              setLikedCourses([...likedCourses, courses[i]]);
            }
          }}
        />
      )
    }
    return coursesToRender;
  }

  return (
    <View>
      <View style={{flexDirection:"row", flexWrap: "wrap", justifyContent: "center"}}>
        {renderCourses()}
      </View>

      <List.Accordion
        title="Select more interests"
        left={props => <List.Icon {...props} icon="folder" />}>
        {renderSelectableCourses()}
      </List.Accordion>

    </View>
  );
};

export default LikedCourses;
