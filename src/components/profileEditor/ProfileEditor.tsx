import React from "react";
import { View, ScrollView, Text } from "react-native";
import { HelperText , Subheading, TextInput, Title } from "react-native-paper";
import styles from "../../constants/styles";
import InfoFields from "./InfoFields";
import Location from "../profileEditor/Location";
import ImageSelector from "./ImageSelector";
import LikedTags from "./LikedTags";

const ProfileEditor = (props : any) => {
  const [info, setInfo] = React.useState({
    name: "John",
    location: "Argentina"
  });

  return (
    <View style={props.style}>

      <Title style={styles.profileTitle}>
        Profile Editor
      </Title>

      <ImageSelector/>

      <Subheading>
        {info.location}
      </Subheading>

      <InfoFields info = {info} setInfo = {setInfo} />

      <Location style={props.style} info = {info} setInfo = {setInfo} />

      <Subheading>
        Interests
      </Subheading>

      <LikedTags/>

    </View>
  );
}

export default ProfileEditor;