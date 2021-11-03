import React from 'react';
import { Image, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDown from 'react-native-paper-dropdown';
import { Text } from 'react-native-paper';

const Location = (props: any) => {
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = React.useState(false);
    const [locations, setLocations] = React.useState('');
    const locationList = [
      {
        label: "Argentina",
        value: "argentina",
      },
      {
        label: "Germany",
        value: "germany",
      },
      {
        label: "Peru",
        value: "peru",
      },
      {
        label: "Africa",
        value: "africa",
      },
      {
        label: "China",
        value: "china",
      },
    ];

    return (
      <View style={props.style}>
        <View style={{alignSelf: 'center'}}>
          <Image source={require('../../../assets/ubademy-logo.png')}/>
        </View>
        <View style={{paddingTop:hp(4)}}>
          <DropDown
              label={"Where are you from?"}
              mode={"outlined"}
              visible={showMultiSelectDropDown}
              showDropDown={() => setShowMultiSelectDropDown(true)}
              onDismiss={() => setShowMultiSelectDropDown(false)}
              value={locations}
              setValue={setLocations}
              list={locationList}
              dropDownStyle={{paddingTop:hp(1)}}
          />
        </View>
      <Text>
        We will use this information to recommend you courses
      </Text>
      </View>
    );
  };
  
export default Location;
