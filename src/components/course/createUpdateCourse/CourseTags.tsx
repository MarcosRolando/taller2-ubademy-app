import React from "react";
import { View } from "react-native";
import { Chip, List, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const CourseTags = (props : any) => {
  const [courseTags, setCourseTags] = [props.courseTags, props.setCourseTags];
  const [newTag, setNewTag] = React.useState("");
  const tags = props.tags;

  function addNewTag() {
    if (!courseTags.includes(newTag)) {
      setCourseTags([...courseTags, newTag]);
    }
    setNewTag("");
  }

  function renderTags() {
    const tagsToRender = [];
    for (let i = 0; i < courseTags.length; i++) {
      tagsToRender.push(
        <Chip
          key={courseTags[i]}
          onClose={() => {
            setCourseTags(courseTags.filter((courseTag: string) => courseTag !== courseTags[i]));
          }}
          style={{margin:wp(1)}}
        >
          {courseTags[i]}
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
            if (!courseTags.includes(tags[i])) {
              setCourseTags([...courseTags, tags[i]]);
            }
          }}
        />
      )
    }
    return tagsToRender;
  }

  return (
    <View style={props.style}>
      <View style={{flexDirection:"row", flexWrap: "wrap", justifyContent: "center"}}>
        {renderTags()}
      </View>

      <TextInput
        label="Add tag"
        mode="outlined"
        value={newTag}
        onChangeText={(value) => setNewTag(value)}
        right={<TextInput.Icon name="pound" onPress={() => addNewTag()}/>}
      />

    </View>
  );
};

export default CourseTags;
