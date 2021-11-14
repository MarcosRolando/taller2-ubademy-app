import React from "react";
import { Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Card, Paragraph, Portal, Subheading, Title } from "react-native-paper";
import { color } from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../styling/colors";
import styles from "../../styling/styles";
import { Themes } from "../../styling/themes";
import BasicInfo from "./BasicInfo";
import ClassVideo from "./ClassVideo";
import CourseList from "./CourseList";
import Gallery from "./Gallery/Gallery";

const Course = () => {

  return (
    <ScrollView style={{paddingHorizontal: wp(3)}}>
      <View>
        <BasicInfo />
      </View>

      <CourseList/>

      <Gallery/>

      <View style={{paddingBottom: hp(10)}}></View>

      <Portal>
        <View
          style={styles.viewOnFront}>
          <Button
            color={colors.background}
            onPress={() => console.log("presionado!")}
          >
            Subscribe
          </Button>
        </View>
      </Portal>
  
    </ScrollView>
  )

}

export default Course;