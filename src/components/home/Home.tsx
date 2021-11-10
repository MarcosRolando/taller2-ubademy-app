import React from "react";
import { View } from "react-native";
import Searcher from "./Searcher";

export const Home = (props: any) => {
  return (
    <View style={props.style}>
      <Searcher navigation={props.navigation} />
    </View>
  );
}
