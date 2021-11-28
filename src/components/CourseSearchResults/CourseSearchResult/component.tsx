import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
// @ts-ignore
import defaultPicture from '../../../../assets/default-course-image.jpg';

export const CourseSearchResult = ({ course }: any) => {
  return (
    <View style={styles.CourseSearchResult}>
      <Text style={styles.CourseTitle}>
        {course.title}
      </Text>
      <Image
          //source={{uri: course.image}} TODO
          source={{uri: Image.resolveAssetSource(defaultPicture).uri, height: hp(35)}}
          style={styles.CourseImage}
      />
      <Text style={styles.SubTypeText}>
        {course.subType}
      </Text>
    </View>
  );
}
