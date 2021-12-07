import React from "react";
import { View, ScrollView } from "react-native";
import { ChatList } from './ChatList';

export const ChatListScreen = ({navigation}: any) => {
  return (
    <ChatList navigation={navigation} />
  );
}
