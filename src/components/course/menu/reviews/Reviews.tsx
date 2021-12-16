import React from "react";
import { View } from "react-native";
import { Button, Divider, HelperText, 
  Paragraph, Subheading, TextInput, Title } from "react-native-paper";
import styles from "../../../../styles/styles";
import { heightPercentageToDP as hp,
  widthPercentageToDP as wp } from "react-native-responsive-screen";
import { postGradeCourse,
  getStudentsGradings } from "../../../../scripts/course";
import { getUserCredentials } from "../../../../userCredentials";
import { AirbnbRating } from 'react-native-ratings';
import colors from "../../../../styles/colors";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const Reviews = ({courseId} : any) => {
  const [userReview, setUserReview] = React.useState("");
  const [userGrading, setUserGrading] = React.useState(0);
  const [courseGrading, setCourseGrading] = React.useState(0);
  const [gradingsList, setGradingsList] = React.useState([] as Array<{
    comment: string,
    grade: number,
    student_email: string
  }>)
  const [alreadyReviewed, setAlreadyReviewed] = React.useState(false);

  useFocusEffect(React.useCallback(() => {
    (async () => {
      try {
        const gradings = await getStudentsGradings(courseId);
        setCourseGrading(gradings.average);
        setGradingsList(gradings.gradings);
        setAlreadyReviewed(alreadyLeftAReview());
      } catch (error) {
        alert(error);
      }
    })();
  }, []))

  async function sendReview() {
    try {
      await postGradeCourse(
        courseId,
        userReview,
        userGrading
      )
      setAlreadyReviewed(true);
    } catch (error) {
      alert(error);
    }
  }

  function alreadyLeftAReview() {
    for (let i = 0; i < gradingsList.length; i++) {
      if (gradingsList[i].student_email == getUserCredentials().email) {
        return true;
      }
    }
    return false;
  }

  function renderGradings() {
    const grandingsToRender = [];
    for (let i = 0; i < gradingsList.length; i++) {
      grandingsToRender.push(
      <View key={i} style={{marginHorizontal:wp(2), alignItems:"flex-start"}}>
        <Subheading style={{fontWeight:"bold", fontSize:wp(5)}}>
          {gradingsList[i].student_email}
        </Subheading>

        <AirbnbRating
          count={5}
          defaultRating={gradingsList[i].grade}
          size={wp(3)}
          selectedColor={colors.primary}
          reviewColor={colors.primary}
          showRating={false}
          isDisabled={true}
        />
        <Paragraph style={{}}>
          {gradingsList[i].comment}
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
    <ScrollView style={{marginHorizontal:wp(2)}}>
    
      <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
        Reviews
      </Title>

      <View style={{flexDirection: "row", marginTop: hp(2)}}>

        <Subheading style={{fontSize: wp(6), color: colors.primary, alignSelf:"center", textAlignVertical:"center"}}>
        {courseGrading}
        </Subheading>

        <View style={{marginTop:-hp(0.5), marginHorizontal: wp(2)}}>
          <AirbnbRating
            count={5}
            defaultRating={courseGrading}
            size={wp(6)}
            selectedColor={colors.primary}
            reviewColor={colors.primary}
            showRating={false}
            isDisabled={true}
          />
        </View>

      </View>

      <Paragraph style={{marginBottom:hp(2)}}>
        (Number of reviews: {gradingsList.length})
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

      <HelperText type="error" visible={hasErrors() && !alreadyReviewed}>
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
        disabled={hasErrors() || alreadyReviewed}
        style={{marginTop:hp(1)}}
      >
        Send review
      </Button>

    {renderGradings()}

    </ScrollView>
  )
}

export default Reviews;