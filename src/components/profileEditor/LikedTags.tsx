import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Chip } from "react-native-paper";
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp} from "react-native-responsive-screen";
  import colors from '../../styling/colors';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const LikedTags = (props : any) => {

  return (
    <View style={{flexDirection:"row"}}>
        <Chip icon={({size, color}) => (
            <FontAwesomeIcon color={color} size={size} icon={ faTimesCircle } />
          )}
         onPress={() => console.log('Pressed')}>UWU</Chip>
         <Chip icon={({size, color}) => (
            <FontAwesomeIcon color={color} size={size} icon={ faTimesCircle } />
          )}
         onPress={() => console.log('Pressed')}>UWU</Chip>
    </View>
  );
};

export default LikedTags;
