import React, { useEffect } from "react";
import { View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import styles from "../../../styles/styles";
import colors from "../../../styles/colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getCourseInfo } from "../../../scripts/course";

const BasicInfo = (props: any) => {
  const [showCover, setShowCover] = React.useState(false);
  const [cover, setCover] = React.useState("");

  useEffect(() => {
    (
      async () => {
        await getCourseInfo()
          .then(({
            id, country, course_type, description, hashtags,
            images, subscription_type, title, total_exams, _videos}) => {
            
              if (Object.keys(images).length > 0) {
                setCover(images[0]);
                setShowCover(true);
              }

          })
      }
    )()
  }, [])

  return (
    <View>

      <Title style={{...styles.profileTitle, marginTop:hp(-5)}}>
        {props.info.title}
      </Title>

      {showCover ? (
        <View style={{marginTop: hp(2)}}>
          <Card>
            <Card.Cover
            source={{uri: cover}}
            resizeMode={'contain'}
            style={{backgroundColor: colors.background}}/>
          </Card>
        </View>
      ) : null}

      <Paragraph style={{marginTop: hp(3)}}>
        {props.info.intro}
      </Paragraph>

    </View>
  )
}

export default BasicInfo;