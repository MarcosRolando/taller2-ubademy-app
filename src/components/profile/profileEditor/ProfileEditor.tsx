import React from "react";
import { View } from "react-native";
import { Subheading, Text, Button } from "react-native-paper";
import styles from "../../../styles/styles";
import InfoFields from "./InfoFields";
import Location from "./Location";
import ImageSelector from "./ImageSelector";
import LikedCourses from "./LikedCourses";
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../../styles/colors";
import { sendUpdateProfile } from "../../../scripts/profile";
import { PROFILE_INFO } from "../../../routes";

const ProfileEditor = ({ _name, _location, _likedCourses=['Matematica', 'Fisica'], 
                        navigation, style }: any) => {
  const [name, setName] = React.useState(_name);

  const [location, setLocation] = React.useState(_location);
  const [locationList, setLocationList] = React.useState([
    {label: "EEUU", value: "EEUU"},
    {label: "Inglaterra", value: "Inglaterra"}
  ]);
  
  const [image, setImage] = React.useState('../../images/example.jpg');
  
  const [coursesType, setCoursesType] = React.useState(
    ['Proba', 'Fisica', 'Matematica', 'Analisis Numerico', 'Programacion']);
  const [likedCourses, setLikedCourses] = React.useState(_likedCourses);
    
  const [errorMessage, setErrorMessage] = React.useState('');

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

  function sendProfile() {
    if (validateData()) {
      sendUpdateProfile(name, location, likedCourses, 'Free')
        .then(() => {
          navigation.navigate(PROFILE_INFO);
        },
        (errorMsg: Error) => {
          setErrorMessage(errorMsg.message);
      });
    }
  }

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
        onPress={sendProfile}>
        Save profile
      </Button>
      <Text 
      style={{marginVertical: hp(1), 
        color: colors.error, alignSelf: 'center', fontSize: 15}}
        onPress={sendProfile}
      >
        {errorMessage}
      </Text>
    </View>
  );
}

export default ProfileEditor;
