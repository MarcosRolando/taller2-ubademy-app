import React, { useEffect } from "react";
import { Platform, View, Image, StyleSheet } from "react-native";
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import colors from "../../styling/colors";
// @ts-ignore
import defaultPicture from '../../../assets/default-course-image.jpg';
import { Button, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { sendCreateCourse } from "../../scripts/course";
import CourseTags from "./CourseTags";
import { ProfileSetupScreen } from "../register/Screens";


const CreateCourse = ({ style }: any) => {
  const[uploading, setUploading] = React.useState(false);

  const [courseName, setCoursenName] = React.useState('');
  const [courseDescription, setCourseDescription] = React.useState('');
  const [examsNumber, setExamsNumber] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const [courseImage, setCourseImage] = React.useState(Image.resolveAssetSource(defaultPicture).uri);
  const [videos, setVideos] = React.useState([] as Array<{name: string, uri: string}>)
  const [images, setImages] = React.useState([] as Array<string>)

  const [showCourses, setShowCourses] = React.useState(false);
  const [coursesList, setCoursesList] = React.useState([] as Array<{label:string, value:string}>);
  const [courseType, setCourseType] = React.useState('');

  const [showSubTypes, setShowSubTypes] = React.useState(false);
  const [subTypesList, setSubTypesList] = React.useState([] as Array<{label:string, value:string}>);
  const [subType, setSubType] = React.useState('');

  const [showLocations, setShowLocations] = React.useState(false);
  const [locationsList, setLocationsList] = React.useState([] as Array<{label:string, value:string}>);
  const [location, setLocation] = React.useState('');

  const [tags, setTags] = React.useState(
    ["Tag 1", "Tag 2", "Tag 3", "Tag 4",
    "Tag 5", "Tag 6", "Tag 7", "Tag 8",
    "Tag 9", "Tag 10", "Tag 11","Tag 12"]);
  const [courseTags, setCourseTags] = React.useState([] as Array<string>);

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

  async function pickCourseImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setCourseImage(result.uri);
    }
  };

  async function addVideo() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setVideos([...videos, {name: '', uri: result.uri}]);
    }
  }

  async function addImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  }

  function renderVideos() {
    let videosToRender = [];
    let counter = 0;
    for (const {name, uri} of videos) {
      videosToRender.push(
        <View key={counter}>
          <Image
            source={{uri: uri, height: hp(14), width: wp(30)}} 
            style={{borderRadius: 10, resizeMode:'contain'}} 
          />
          <TextInput 
            mode='flat'
            value={name}
            onChangeText={(newName) => setVideos(videos.map((elem) => {
              if (elem.uri === uri) {
                elem.name = newName;
              }
              return elem;
            }))}
            disableFullscreenUI={true}
            style={{height: hp(4), width: wp(30)}}
          />
          <IconButton
            icon='close-circle'
            color={colors.primary}
            size={wp(10)}
            style={{position:'absolute', left: wp(-5), top: hp(-4)}}
            onPress={() => setVideos(videos.filter((video) => video.uri !== uri ))}
          />
        </View>
      );
      counter++;
    }
    return videosToRender;
  }


  function renderImages() {
    let imagesToRender = [];
    let counter = 0;
    for (const uri of images) {
      imagesToRender.push(
        <View key={counter}>
          <Image
            source={{uri: uri, height: hp(14), width: wp(30)}} 
            style={{borderRadius: 10, resizeMode:'contain'}} 
          />
          <IconButton
            icon='close-circle'
            color={colors.primary}
            size={wp(10)}
            style={{position:'absolute', left: wp(-5), top: hp(-4)}}
            onPress={() => setImages(images.filter((imageUri) => imageUri !== uri ))}
          />
        </View>
      );
      counter++;
    }
    return imagesToRender;
  }

  function validateData() {
    if (!courseName.trim()) {
      setErrorMessage('Please enter a course name');
      return false;
    }
    if (!courseType.trim()) {
      setErrorMessage('Please select a course type');
      return false;
    }
    if (!examsNumber.trim()) {
      setErrorMessage('Please enter the amount of exams');
      return false;
    }
    if (!subType.trim()) {
      setErrorMessage('Please select a subscription type');
      return false;
    }
    if (!location.trim()) {
      setErrorMessage('Please select a location for this course');
      return false;
    }
    return true;
  }

  async function createCourse() {
    try {
      if (!validateData()) {
        setErrorMessage('');
        setUploading(true);
        const {_images, _videos} = await uploadMedia();
        sendCreateCourse(courseName, courseDescription, 
          examsNumber, subType, courseType, location, tags, 
          _images, _videos);
        setUploading(false);
        //TODO ir a la pantalla del curso creado
      }
    } catch(error) {
      console.log(error);
      setErrorMessage('Failed to create the course');
    }
  }

  async function uploadMedia() {
    let _images = [] as Array<string>;
    let _videos = [] as Array<{name:string, uri:string}>;
    try {
      _images.push(await uploadMediaToFirebase(courseImage));
      for (const imageToUpload of images) {
        _images.push(await uploadMediaToFirebase(imageToUpload));
      }
      for (const videoToUpload of videos) {
        _videos.push({name: videoToUpload.name, uri: await uploadMediaToFirebase(videoToUpload.uri)});
      }
    } catch(error) {
      console.log(error);
    }
    return {_images, _videos};
  }

  async function uploadMediaToFirebase(uri: string) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), `${courseName}/${uri.replace(/^.*[\\\/]/, '')}`);
    
    await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    // @ts-ignore
    blob.close();

    return await getDownloadURL(fileRef);
  }

  function maybeRenderUploadingOverlay() {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.8)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color={colors.primary} animating size="large" />
          <Text style={{color: colors.primary, fontSize: 20}}>
            Creating course...
          </Text>
        </View>
      );
    }
  };

  return (
    <View>
      <View style={style}>
        <Image
          source={{uri: courseImage, height: hp(33)}} 
          style={{borderRadius: 10, resizeMode:'contain'}} 
        />
        <IconButton
          icon="camera"
          color={colors.primary}
          size={wp(15)}
          style={{position:'absolute', left: wp(-3), top: hp(-3)}}
          onPress={pickCourseImage}
        />
        <TextInput
          label='Name'
          mode='outlined'
          value={courseName}
          onChangeText={(name) => setCoursenName(name)}
          disableFullscreenUI={true}
          style={{marginBottom:hp(2), marginTop:hp(2)}}
        />
        <TextInput 
          label='Description' 
          mode='outlined'
          value={courseDescription}
          onChangeText={(descr) => setCourseDescription(descr)}
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
          value={courseType}
          setValue={setCourseType}
          list={coursesList}
          dropDownStyle={{paddingTop:hp(1)}}
        />
        <TextInput 
          label='Number of exams' 
          mode='outlined'
          value={examsNumber}
          onChangeText={(exams) => setExamsNumber(exams)}
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
        <CourseTags
          tags={tags}
          courseTags={courseTags}
          setCourseTags={setCourseTags}
          style={{marginTop: hp(2)}}
        />
        <View style={{backgroundColor: '#3333', marginTop: hp(2)}}>
          <View 
            style={{flexDirection: 'row', 
            flexWrap: 'wrap', 
            justifyContent: 'space-around', 
            marginTop: hp(3)}}>
            {renderImages()}
          </View>
          <Button 
            mode='contained'
            style={{marginVertical: hp(2), marginHorizontal: wp(8)}}
            onPress={addImage}
            >
            Add image
          </Button>
        </View>
        
        <View style={{backgroundColor: '#3333', marginTop: hp(2)}}>
          <View 
            style={{flexDirection: 'row', 
            flexWrap: 'wrap', 
            justifyContent: 'space-around', 
            marginTop: hp(3)}}>
            {renderVideos()}
          </View>
          <Button
            mode='contained'
            style={{marginVertical: hp(2), marginHorizontal: wp(8)}}
            onPress={addVideo}
            >
            Add video
          </Button>
        </View>
        
        <Button 
          mode='contained'
          style={{marginVertical: hp(4), marginHorizontal: wp(8)}}
          onPress={createCourse}
          >
          Create course
        </Button>

        <Text style={{color: colors.error, alignSelf: 'center', paddingBottom: hp(4)}}>
          {errorMessage}
        </Text>

      </View>

      {maybeRenderUploadingOverlay()}
    </View>
  );
}

export default CreateCourse;
