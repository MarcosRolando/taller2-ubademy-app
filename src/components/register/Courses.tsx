import React from 'react';
import { Image, View } from 'react-native';
import { heightPercentageToDP as hp,
widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DropDown from 'react-native-paper-dropdown';
import { Text, Button } from 'react-native-paper';

const Courses = (props: any) => {
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = React.useState(false);
    const [courses, setCourses] = React.useState('');
    const coursesList = [
      {
        label: "Cooking",
        value: "cooking",
      },
      {
        label: "Maths",
        value: "maths",
      },
      {
        label: "Literature",
        value: "literature",
      },
      {
        label: "Physics",
        value: "physics",
      },
      {
        label: "Chemistry",
        value: "chemistry",
      },
    ];

    return (
      <View style={props.style}>
        <View style={{alignSelf: 'center'}}>
          <Image source={require('../../../assets/ubademy-logo.png')}/>
        </View>
        <View style={{paddingTop:hp(4), paddingBottom:hp(3)}}>
          <DropDown
            label={"What are you interested in?"}
            mode={"outlined"}
            visible={showMultiSelectDropDown}
            showDropDown={() => setShowMultiSelectDropDown(true)}
            onDismiss={() => setShowMultiSelectDropDown(false)}
            value={courses}
            setValue={setCourses}
            list={coursesList}
            dropDownStyle={{paddingTop:hp(1)}}
            multiSelect
            
          />
        </View>
        <Button 
          mode='contained'
          style={{marginVertical: hp(1), marginHorizontal: wp(8)}}>
            Next
        </Button>
      </View>
    );
  };
  
export default Courses;
