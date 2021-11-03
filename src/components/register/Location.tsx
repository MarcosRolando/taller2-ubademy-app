import React from 'react';
import { Image, View } from 'react-native';
import { heightPercentageToDP as hp,
widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DropDown from 'react-native-paper-dropdown';
import { Text, Button } from 'react-native-paper';

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
        <View style={{paddingTop:hp(4), paddingBottom:hp(3)}}>
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
        <Button 
          mode='contained'
          style={{marginVertical: hp(1), marginHorizontal: wp(8)}}
          onPress={() => props.navigator.push('TODO')}>
            Next
        </Button>
        <Text 
        style={{marginTop:hp(2), 
                lineHeight:hp(3), 
                paddingHorizontal:wp(2), 
                backgroundColor:'#4444',
                borderRadius:6}}>
          Don't worry, we will only use this information to recommend you courses :-)
        </Text>
      </View>
    );
  };
  
export default Location;
