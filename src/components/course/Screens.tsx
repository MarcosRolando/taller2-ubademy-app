import React from 'react';
import { ScrollView, View } from 'react-native';
import CreateCourse from './CreateCourse';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const CreateCourseScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateCourse style={styles.screen} />
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    marginTop: hp(5),
    marginHorizontal: wp(15),
  },
});
