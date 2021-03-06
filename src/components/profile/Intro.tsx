import React from "react";
import { View } from "react-native";
import { Avatar, Title } from "react-native-paper";
import styles from "../../styles/styles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const Intro = ({ username, image }: any) => {
  return (
    <View style={styles.profileImage}>
      <Avatar.Image
        size={wp(40)}
        source={{uri: image}}
      />
      <Title style={styles.profileName}>
        {username}
      </Title>
    </View>
  );
}

export default Intro;
