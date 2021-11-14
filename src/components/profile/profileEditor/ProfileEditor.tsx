import React from "react";
import { View } from "react-native";
import { Subheading, Text, Button } from "react-native-paper";
import styles from "../../../styles/styles";
import InfoFields from "./InfoFields";
import Location from "./Location";
import ImageSelector from "./ImageSelector";
import LikedTags from "./LikedTags";
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../../styles/colors";

const ProfileEditor = (props : any) => {
  const [name, setName] = React.useState('John');

  const [location, setLocation] = React.useState('Argentina');
  const [locationList, setLocationList] = React.useState([
    {label: "EEUU", value: "EEUU"},
    {label: "Inglaterra", value: "Inglaterra"}
  ]);
  
  const [image, setImage] = React.useState('../../images/example.jpg');
  
  const [tags, setTags] = React.useState(
    ["Tag 1", "Tag 2", "Tag 3", "Tag 4",
    "Tag 5", "Tag 6", "Tag 7", "Tag 8",
    "Tag 9", "Tag 10", "Tag 11","Tag 12"]);
  const [likedTags, setLikedTags] = React.useState(["Tag 1", "Tag 2"]);
    
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
      //TODO mandar el perfil al back
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
        style={props.style}
        location={location}
        setLocation={setLocation}
        locationList={locationList}
      />
      <Subheading style={{...styles.profileSubtitle, marginVertical:hp(1)}}>
        Interests
      </Subheading>
      <LikedTags 
        tags={tags}
        likedTags={likedTags}
        setLikedTags={setLikedTags}
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
