import React from "react";
import { View, ScrollView } from "react-native";
import ExamCreateUpdate from "./ExamCreateUpdate";

export const ExamCreateUpdateScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView >
        <ExamCreateUpdate navigation={navigation}/>
      </ScrollView>
    </View>
  );
}