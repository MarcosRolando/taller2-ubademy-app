import React from "react";
import { Avatar, Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Alert, Text,TouchableHighlight, TouchableOpacity, View } from "react-native";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import styles from "../../constants/styles";

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
  };

  return(
    <View style={{alignItems: "center"}}>
      <Avatar.Image
      size={wp(30)}
      source={{uri: image}}
    />

    <View style={{position:"absolute", paddingTop:wp(20), paddingLeft:wp(20)}}>
      <TouchableOpacity onPress={()=>console.log("ah!")} >
          <View>
            <FontAwesomeIcon
              color={"red"}
              size={wp(10)}
              icon={ faCameraRetro } 
              style={{paddingTop:wp(8)}}/>
          </View>
      </TouchableOpacity>
    </View>

      <Button onPress={() => {
          openGallery();
        }}>
          Open Gallery
      </Button>
    </View>

  )
}

export default ImageSelector;