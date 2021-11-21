import React from "react";
import { View } from "react-native";
import DropDown from 'react-native-paper-dropdown';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const Location = ({style, location, setLocation,
                  locationList} : any) => {

  const [showLocations, setShowLocations] = React.useState(false);
  const [locationLabel, setLocationLabel] = React.useState(location);

  return (
    <View style={style}>

      <View style={{paddingHorizontal: wp(5)}}>

        <DropDown
          label={locationLabel}
          visible={showLocations}
          showDropDown={() => setShowLocations(true)}
          onDismiss={() => setShowLocations(false)}
          value={location}
          setValue={(value : any) => {
            setLocation(value);
            setLocationLabel('');
          }}
          list={locationList}
        />
        
      </View>
    </View>
  );
};

export default Location;
