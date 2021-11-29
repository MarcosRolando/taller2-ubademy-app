import React from "react";
import { View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import styles from "../../../styles/styles";
import colors from "../../../styles/colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const BasicInfo = ({ info, cover }: any) => {
  return (
    <View>

      <Title style={{...styles.profileTitle, marginTop:hp(-5)}}>
        {info.title}
      </Title>

      <View style={{marginTop: hp(2)}}>
        <Card>
          <Card.Cover
          source={{uri: cover}}
          resizeMode={'contain'}
          style={{backgroundColor: colors.background}}/>
        </Card>
      </View>

      <Paragraph style={{marginTop: hp(3)}}>
        {info.intro}
      </Paragraph>

    </View>
  )
}

export default BasicInfo;