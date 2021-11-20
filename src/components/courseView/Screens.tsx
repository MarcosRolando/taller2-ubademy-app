import React from 'react';
import { ScrollView, View } from 'react-native';
import styles from '../../styling/styles';
import Course from './Course'

export const CourseScreen = ({navigation}: any) => {
    return (
      <View>
        <ScrollView>
          <Course />
        </ScrollView>
      </View>
    );
}
