import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TouchableHighlight } from "react-native-gesture-handler";
import colors from "../../../styles/colors";
import { COURSE_MENU } from "../../../routes";

export const CourseSearchResult = ({ course, navigation }: any) => {
  const navigateToCourse = (id: string) => {
    navigation.navigate(COURSE_MENU, { id });
  }

  return (
    <View style={styles.CourseSearchResult}>
      <TouchableHighlight 
        onPress={() => navigateToCourse(course.id)}
        underlayColor={colors.underlay}
        style={styles.TouchableHighlight}>
        <View>
          <Text style={styles.CourseTitle}>
            {course.title}
          </Text>
          <Image
            source={{uri: course.image, height:hp(35)}}
            style={styles.CourseImage}
          />
          <Text style={styles.SubTypeText}>
            {course.subType}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
