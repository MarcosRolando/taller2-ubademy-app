import React, { useEffect } from "react";
import { Platform, View, Image } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CreateCourse = ({ style }: any) => {
  const [image, setImage] = React.useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result); // TODO despues volarlo

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={style}>
      <Image source={{uri: image, height: hp(30)}} style={{borderRadius: 10, resizeMode:'contain'}} />
      <Button style={{marginTop: hp(5)}} onPress={pickImage}>
        Hola
      </Button>
    </View>
  );
}

export default CreateCourse;
