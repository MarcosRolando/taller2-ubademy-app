import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Subheading, Text, Button, ActivityIndicator } from "react-native-paper";
import styles from "../../../styles/styles";
import InfoFields from "./InfoFields";
import Location from "./Location";
import ImageSelector from "./ImageSelector";
import LikedCourses from "./LikedCourses";
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../../styles/colors";
import { getProfileOptionsData, sendUpdateProfile } from "../../../scripts/profile";
import { PROFILE_INFO } from "../../../routes";
import { getDownloadURL, getStorage, ref, uploadBytes } from "@firebase/storage";

const ProfileEditor = ({ _name, _location, _likedCourses=['Art', 'Programming'], 
                        navigation, _image }: any) => {
  const [name, setName] = React.useState(_name);
  const [location, setLocation] = React.useState(_location);
  const [locationList, setLocationList] = React.useState([] as Array<{label:string, value:string}>)
  const [image, setImage] = React.useState(_image);
  const [coursesType, setCoursesType] = React.useState([] as Array<string>);
  const [likedCourses, setLikedCourses] = React.useState(_likedCourses);
  const [uploading, setUploading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  useEffect(() => {
    getProfileOptionsData()
      .then(({locations, courses}) => {
        let nLocations = locations.map((location) => {
          return {label:location, value:location};
        })
        setLocationList(nLocations);
        setCoursesType(courses);
      },
      (errorMsg: Error) => {
        setErrorMessage(errorMsg.message);
      });
  }, []);

  function validateData() {
    if (!name.trim()) {
      setErrorMessage('Please enter a profile name');
      return false;
    }
    if (!location.trim()) {
      setErrorMessage('Please enter a location');
      return false;
    }
    return true;
  }

  async function uploadMedia() {
    let image_to_upload = image;
    try {
      image_to_upload = await uploadMediaToFirebase(image);
    } catch(error) {
      console.log(error);
    }
    return image_to_upload;
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

    const fileRef = ref(getStorage(), `${name}/${uri.replace(/^.*[\\\/]/, '')}`);
    
    await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    // @ts-ignore
    blob.close();

    return await getDownloadURL(fileRef);
  }

  async function updateProfile() {
    try {
      if (validateData()) {
        setErrorMessage('');
        setUploading(true);
        const image_url = await uploadMedia();
        await sendUpdateProfile(name, location, likedCourses, image_url, 'Free');
        setUploading(false);
        navigation.navigate(PROFILE_INFO);
      }
    } catch(error) {
      console.log(error);
      setErrorMessage('Failed to update the profile');
    }
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
            Updating profile...
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={{paddingHorizontal: wp(3)}}>
      <ImageSelector
        image={image}
        setImage={setImage}
      />
      <Subheading style={styles.profileSubtitle}>
        Name
      </Subheading>
      <InfoFields 
        name={name}
        setName={setName}
      />
      <Subheading style={styles.profileSubtitle}>
        Location
      </Subheading>
      <Location
        location={location}
        setLocation={setLocation}
        locationList={locationList}
      />
      <Subheading style={{...styles.profileSubtitle, marginVertical:hp(1)}}>
        Interests
      </Subheading>
      <LikedCourses 
        courses={coursesType}
        likedCourses={likedCourses}
        setLikedCourses={setLikedCourses}
      />
      <Button 
        mode='contained'
        style={{marginVertical: hp(2), marginHorizontal: wp(8)}}
        onPress={updateProfile}>
        Save profile
      </Button>
      <Text
      style={{marginVertical: hp(1), 
        color: colors.error, alignSelf: 'center', fontSize: 15}}
        onPress={updateProfile}
      >
        {errorMessage}
      </Text>
      
      {maybeRenderUploadingOverlay()}

    </View>
  );
}

export default ProfileEditor;
