import React from "react";
import { View } from "react-native";
import { Chip, List } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const LikedTags = ({likedTags, setLikedTags, tags}: any) => {

  function renderTags() {
    const tagsToRender = [];
    for (let i = 0; i < likedTags.length; i++) {
      tagsToRender.push(
        <Chip
          key={likedTags[i]}
          onClose={() => {
            setLikedTags(likedTags.filter((likedTag: string) => likedTag !== likedTags[i]));
          }}
          style={{margin:wp(1)}}
        >
          {likedTags[i]}
        </Chip>
      )
    }
    return tagsToRender;
  }

  function renderSelectableTags() {
    const tagsToRender = [];
    for (let i = 0; i < tags.length; i++) {
      tagsToRender.push(
        <List.Item
          key={tags[i]}
          title={tags[i]}
          onPress={() => {
            if (!likedTags.includes(tags[i])) {
              setLikedTags([...likedTags, tags[i]]);
            }
          }}
        />
      )
    }
    return tagsToRender;
  }

  return (
    <View>
      <View style={{flexDirection:"row", flexWrap: "wrap", justifyContent: "center"}}>
        {renderTags()}
      </View>

      <List.Accordion
        title="Select more interests"
        left={props => <List.Icon {...props} icon="folder" />}>
        {renderSelectableTags()}
      </List.Accordion>

    </View>
  );
};

export default LikedTags;
