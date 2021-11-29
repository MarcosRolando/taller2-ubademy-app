import React from "react";
import { View, ScrollView } from "react-native";
import Exam from "./Exam";

export const ExamCreateUpdateScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView >
        <Exam navigation={navigation}/>
      </ScrollView>
    </View>
  );
}