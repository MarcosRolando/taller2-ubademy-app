import React from "react";
import { View } from "react-native";
import { Card, Paragraph, Subheading, Title } from "react-native-paper";
import styles from "../../styling/styles";
import colors from "../../styling/colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const BasicInfo = (props: any) => {

  return (
    <View>

      <Title style={styles.profileTitle}>
        {props.info.name}
      </Title>

      <View style={{marginTop: hp(2)}}>
        <Card>
          <Card.Cover
          source={props.info.source}
          resizeMode={'contain'}
          style={{backgroundColor: colors.background}}/>
        </Card>
      </View>

      <Paragraph style={{marginTop: hp(3)}}>
        {props.info.intro}
      </Paragraph>

    </View>
  )
}

export default BasicInfo;