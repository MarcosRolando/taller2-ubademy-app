import React from "react";
import { Avatar, IconButton } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { View } from "react-native";
import styles from "../../../styles/styles";
import colors from "../../../styles/colors";

const ImageSelector = ({ image, setImage }: any) => {
  async function openGallery() {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access gallery is required');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!pickerResult.cancelled) {
      setImage({changed: true, value: pickerResult.uri});
    }
  };

  return(
    <View style={{alignItems: "center"}}>
      
      <View style={styles.profileImage}>
        <Avatar.Image
          size={wp(40)}
          source={{uri: image.value}}
          style={{backgroundColor: colors.second}}
        />
      </View>

      <View style={{position:"absolute", paddingTop:wp(27), paddingRight:wp(30)}}>
        <IconButton
          icon="camera"
          color={colors.primary}
          size={wp(15)}
          onPress={openGallery}
        />
      </View>

    </View>

  )
}

export default ImageSelector;
