import React from "react";
import { View } from "react-native";
import { Chip, List } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const LikedTags = (props : any) => {
  const [tags, setTags] = React.useState(
    ["Tag 1", "Tag 2", "Tag 3", "Tag 4",
    "Tag 5", "Tag 6", "Tag 7", "Tag 8",
    "Tag 9", "Tag 10", "Tag 11","Tag 12"]);
  const [likedTags, setLikedTags] = React.useState(["Tag 1", "Tag 2"]);

  function renderTags() {
    const tagsToRender = [];
    for (let i = 0; i < likedTags.length; i++) {
      tagsToRender.push(
        <Chip
          key={likedTags[i]}
          onClose={() => {
            setLikedTags(likedTags.filter((likedTag) => likedTag !== likedTags[i]));
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