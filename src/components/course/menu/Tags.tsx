import React from "react";
import { View, Text } from "react-native";
import { Chip, Subheading } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../../styles/colors";

const Tags = ({ hashtags }: any) => {
  console.log("aca estan:")
  console.log(hashtags);

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
    <View style={{flexDirection:"row", flexWrap: "wrap", justifyContent: "center"}}>
      {renderTags()}
    </View>
  )
}

export default Tags;