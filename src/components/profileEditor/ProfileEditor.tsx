import React from "react";
import { View, ScrollView, Text } from "react-native";
import { HelperText , Subheading, TextInput, Title } from "react-native-paper";
import styles from "../../constants/styles";
import InfoFields from "./InfoFields";
import Location from "../profileEditor/Location";
import ImageSelector from "./ImageSelector";
import LikedTags from "./LikedTags";
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp } from "react-native-responsive-screen";

const ProfileEditor = (props : any) => {
  const [info, setInfo] = React.useState({
    name: "John",
    location: "Argentina"
  });

  return (
    <ScrollView style={{paddingHorizontal: wp(3)}}>

      <Title style={styles.profileTitle}>
        Profile Editor
      </Title>

      <ImageSelector />

      <Subheading style={styles.profileSubtitle}>
        Name
      </Subheading>

      <InfoFields info = {info} setInfo = {setInfo} />

      <Subheading style={styles.profileSubtitle}>
        Location
      </Subheading>

      <Location style={props.style} info = {info} setInfo = {setInfo} />

      <Subheading style={{...styles.profileSubtitle, paddingTop:hp(0)}}>
        Interests
      </Subheading>

      <LikedTags/>

    </ScrollView>
  );
}

export default ProfileEditor;