import React, { useEffect } from "react";
import { Platform, View, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import colors from "../../styling/colors";
// @ts-ignore
import defaultPicture from '../../../assets/default-course-image.jpg';
import { Button, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

const CreateCourse = ({ style }: any) => {
  const [image, setImage] = React.useState(Image.resolveAssetSource(defaultPicture).uri);

  const [showCourses, setShowCourses] = React.useState(false);
  const [coursesList, setCoursesList] = React.useState([] as Array<{label:string, value:string}>);
  const [course, setCourse] = React.useState('');

  const [showSubTypes, setShowSubTypes] = React.useState(false);
  const [subTypesList, setSubTypesList] = React.useState([] as Array<{label:string, value:string}>);
  const [subType, setSubType] = React.useState('');

  const [showLocations, setShowLocations] = React.useState(false);
  const [locationsList, setLocationsList] = React.useState([] as Array<{label:string, value:string}>);
  const [location, setLocation] = React.useState('');

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

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={style}>
      <Image source={{uri: image, height: hp(33)}} style={{borderRadius: 10, resizeMode:'contain'}} />
      <View style={{position:'absolute', left: wp(3)}}>
        <TouchableWithoutFeedback 
          style={{width:wp(14)}} 
          onPress={pickImage}>
          <FontAwesomeIcon color={colors.primary} size={50} icon={ faCamera } />
        </TouchableWithoutFeedback>
      </View>
      <TextInput
        label='Name'
        mode='outlined'
        disableFullscreenUI={true}
        style={{marginBottom:hp(2), marginTop:hp(2)}}
      />
      <TextInput 
        label='Description' 
        mode='outlined'
        disableFullscreenUI={true}
        multiline={true}
        style={{marginBottom:hp(2)}}
      />
      <DropDown
        label={"Course type"}
        mode={"outlined"}
        visible={showCourses}
        showDropDown={() => setShowCourses(true)}
        onDismiss={() => setShowCourses(false)}
        value={course}
        setValue={setCourse}
        list={coursesList}
        dropDownStyle={{paddingTop:hp(1)}}
      />
      <TextInput 
        label='Number of exams' 
        mode='outlined'
        disableFullscreenUI={true}
        style={{marginTop:hp(2), marginBottom:hp(2)}}
        keyboardType='numeric'
      />
      <DropDown
        label={"Subscription type"}
        mode={"outlined"}
        visible={showSubTypes}
        showDropDown={() => setShowSubTypes(true)}
        onDismiss={() => setShowSubTypes(false)}
        value={subType}
        setValue={setSubType}
        list={subTypesList}
        dropDownStyle={{paddingTop:hp(1)}}
      />
      <View style={{paddingBottom:hp(2)}} />
      <DropDown
        label={"Location"}
        mode={"outlined"}
        visible={showLocations}
        showDropDown={() => setShowLocations(true)}
        onDismiss={() => setShowLocations(false)}
        value={location}
        setValue={setLocation}
        list={locationsList}
        dropDownStyle={{paddingTop:hp(1)}}
      />
      <Button 
        mode='contained'
        style={{marginVertical: hp(4), marginHorizontal: wp(8)}}
        >
        Next
      </Button>
    </View>
  );
}

export default CreateCourse;
