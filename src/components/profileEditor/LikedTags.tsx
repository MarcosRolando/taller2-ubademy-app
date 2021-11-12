import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Chip } from "react-native-paper";
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp} from "react-native-responsive-screen";
  import colors from '../../styling/colors';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const LikedTags = (props : any) => {
  const [tags, setTags] = React.useState(["Tag 1", "Tag 2"]);
  //const [likedTags, setLikedTags] = React.useState([] as Array<any>);
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
        >
          {likedTags[i]}
        </Chip>
      )
    }
    return tagsToRender;
  }

  return (
    <View>
      <View style={{flexDirection:"row"}}>
        {renderTags()}
      </View>
    </View>
  );
};

export default LikedTags;
