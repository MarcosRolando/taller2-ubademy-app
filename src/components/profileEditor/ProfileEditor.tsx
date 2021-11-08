import React from "react";
import { View, ScrollView } from "react-native";
import { HelperText , Subheading, TextInput, Title } from "react-native-paper";
import styles from "../../constants/styles";

import ImageSelector from "./ImageSelector";

const ProfileEditor = (props : any) => {

  return (
    <View style={props.style}>

      <Title style={styles.profileTitle}>
        Profile Editor
      </Title>

      <ImageSelector/>

      <Subheading>
        Name
      </Subheading>

      <TextInput>

      </TextInput>

    </View>
  );
}

export default ProfileEditor;