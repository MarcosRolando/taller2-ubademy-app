import React from "react";
import { View, Text } from "react-native";
import { Chip, Subheading } from "react-native-paper";
import { heightPercentageToDP, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../../styles/colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Tags = ({ hashtags }: any) => {

  function renderTags() {
    const tagsToRender = [];
    for (let i = 0; i < hashtags.length; i++) {
      tagsToRender.push(
        <Chip
          key={hashtags[i]}
          style={{margin:wp(1), backgroundColor: colors.primary}}
        >
          {hashtags[i]}
        </Chip>
      )
    }
    return tagsToRender;
  }

  return (
    <View style={{flexDirection:"row", flexWrap: "wrap", justifyContent: "center", marginBottom:hp(2)}}>
      {renderTags()}
    </View>
  )
}

export default Tags;