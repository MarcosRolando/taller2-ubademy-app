import React from "react";
import { View } from "react-native";
import { Button, Divider, HelperText, Paragraph, Subheading, TextInput, Title } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import styles from "../../../../styles/styles";
import { heightPercentageToDP as hp,
  widthPercentageToDP as wp } from "react-native-responsive-screen";
import { postGradeCourse, getStudentsGradings } from "../../../../scripts/course";
import { getUserCredentials } from "../../../../userCredentials";
import { Rating, AirbnbRating } from 'react-native-ratings';
import colors from "../../../../styles/colors";
import { useFocusEffect } from "@react-navigation/native";

const data = [{
    studentName: "estudiante 1",
    grading: 3,
    review: "Es muy malo"
  }, {
    studentName: "estudiante 2",
    grading: 5,
    review: "Lo amé, AAAAA"
  }
]

const Reviews = ({courseId} : any) => {
  const [userReview, setUserReview] = React.useState("");
  const [userGrading, setUserGrading] = React.useState(0);
  const [courseGrading, setCourseGrading] = React.useState(0);
  const [showGradings, setShowGradings] = React.useState(false);
  const gradesList = setGradings();

  useFocusEffect(React.useCallback(() => {
    (async () => {
      try {
        const gradings = await getStudentsGradings(courseId);
        console.log("average:", gradings.average);
        console.log("gradings:", gradings.gradings);
      } catch (error) {
        alert(error);
      }
    })();
  }, []))

  function setGradings() {
    const gradings = [] as Array<{label: string, value: number}>
    for (let i = 0; i <= 5; i++) {
      gradings.push({
        label: i.toString(),
        value: i
      })
    }
    return gradings;
  }

  async function sendReview() {
    try {
      await postGradeCourse(
        courseId,
        userReview,
        userGrading
      )

      console.log("courseId:", courseId);
      console.log("userReview:", userReview);
      console.log("userGrade:", userGrading);
    } catch (error) {
      alert(error);
    }
  }

  function renderGradings() {
    const grandingsToRender = [];
    for (let i = 0; i < data.length; i++) {
      grandingsToRender.push(
      <View key={i} style={{marginHorizontal:wp(2), alignItems:"flex-start"}}>
        <Subheading style={{fontWeight:"bold", fontSize:wp(5)}}>
          {data[i].studentName}
        </Subheading>

        <AirbnbRating
          count={5}
          defaultRating={data[i].grading}
          size={wp(3)}
          selectedColor={colors.primary}
          reviewColor={colors.primary}
          showRating={false}
          isDisabled={true}
        />
        <Paragraph style={{}}>
          {data[i].review}
        </Paragraph>

        <Divider style={{marginTop:hp(1), marginBottom:hp(1)}}/>

      </View>)
    }
    return grandingsToRender;
  }

  const hasErrors = () => {
    return userReview === "";
  };

  return (
    <View style={{marginHorizontal:wp(2)}}>
    
      <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
        Reviews
      </Title>

      <View style={{flexDirection: "row", marginTop: hp(2)}}>

        <Subheading style={{fontSize: wp(6), color: colors.primary, alignSelf:"center", textAlignVertical:"center"}}>
          4.5
        </Subheading>

        <View style={{marginTop:-hp(0.5), marginHorizontal: wp(2)}}>
          <AirbnbRating
            count={5}
            defaultRating={3}
            size={wp(6)}
            selectedColor={colors.primary}
            reviewColor={colors.primary}
            showRating={false}
            isDisabled={true}
          />
        </View>

      </View>

      <Paragraph style={{marginBottom:hp(2)}}>
        (Number of reviews: )
      </Paragraph>

      <View style={{flex: 1, marginHorizontal: wp(3), marginBottom:hp(1)}}>

        <TextInput
          mode="outlined"
          label="Leave a review"
          value={userReview}
          multiline
          numberOfLines={5}
          onChangeText={(value) => setUserReview(value)}
        />

      <HelperText type="error" visible={hasErrors()}>
        You need to write something!
      </HelperText>
      
      </View>

      <AirbnbRating
        count={5}
        defaultRating={0}
        size={wp(7)}
        selectedColor={colors.primary}
        reviewColor={colors.primary}
        showRating={false}
        onFinishRating={(value) => setUserGrading(value)}
      />

      <Button
        onPress={() => sendReview()}
        disabled={hasErrors()}
        style={{marginTop:hp(1)}}
      >
        Send review
      </Button>

    {renderGradings()}

    </View>
  )
}

export default Reviews;