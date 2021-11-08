import React from "react";
import { Avatar, Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Alert, View } from "react-native";

const ImageSelector = () => {
  const [image, setImage] = React.useState('../../images/example.jpg');

  async function openGallery() {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access gallery is required');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
    console.log(pickerResult);
  }

  return(
    <View>
      <Avatar.Image
      size={wp(30)}
      source={{uri: image}}
    />

      <Button onPress={() => {
          openGallery();
        }}>
          Open Gallery
      </Button>
    </View>

  )
}

export default ImageSelector;