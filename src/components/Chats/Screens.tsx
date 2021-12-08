import React from "react";
import { View, ScrollView } from "react-native";
import { Chat } from "./Chat";
import { ChatList } from './ChatList';

export const ChatListScreen = ({ navigation }: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ChatList navigation={navigation} />
      </ScrollView>
    </View>
  );
}

export const ChatScreen = ({ route, navigation }: any) => {
  const { chatId, otherUserEmail } = route.params;

  return (
    <Chat chatId={chatId} otherUserEmail={otherUserEmail} />
  )
}
