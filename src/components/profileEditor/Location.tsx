import React, { useEffect } from "react";
import { Text, View } from "react-native";
import DropDown from 'react-native-paper-dropdown';
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp} from "react-native-responsive-screen";
  import colors from '../../styling/colors';

const Location = (props : any) => {
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = React.useState(false);
  const [location, setLocation] = React.useState('Hola');
  const [errorMessage, setErrorMessage] = React.useState('');
  //const [locationList, setLocationList] = React.useState([] as Array<{label:string, value:string}>);
  const [locationList, setLocationList] = React.useState([{label: "EEUU", value: "EEUU"},
  {label: "Inglaterra", value: "Inglaterra"}]);
  const [message, setMessage] = React.useState(props.info.location);

  return (
    <View style={props.style}>

      <View style={{paddingTop:hp(4), paddingBottom:hp(1.2)}}>

        <DropDown
          label={message}
          visible={showMultiSelectDropDown}
          showDropDown={() => setShowMultiSelectDropDown(true)}
          onDismiss={() => setShowMultiSelectDropDown(false)}
          value={location}
          setValue={(value : any) => {
            const newInfo = {
              ...props.info,
              location: value
            }
            props.setInfo(newInfo);
            setLocation(value);
            setMessage("Location");
          }}
          list={locationList}
          dropDownStyle={{paddingTop:hp(1)}}
        />
        
      </View>

      <View style={{flexDirection: 'row', justifyContent:'center'}}>
        <Text style={{marginVertical: hp(1), color: colors.error}}>
          {errorMessage}
        </Text>
      </View>

    </View>
  );
};

export default Location;
