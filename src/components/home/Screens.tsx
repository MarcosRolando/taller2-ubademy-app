import React from "react";
import { View, ScrollView } from "react-native";
import { Home } from "./Home";

export const HomeScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Home navigation={navigation} />
      </ScrollView>
    </View>
  );
}
