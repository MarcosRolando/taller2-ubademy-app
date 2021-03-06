import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-paper";
import { TouchableHighlight } from "react-native-gesture-handler";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Fire from "../../../../Fire";
import colors from "../../../styles/colors";
import { CHAT } from "../../../routes";

export const ChatList = ({ navigation }: any) => {
  const [chats, setChats] = React.useState([] as Array<any>);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    Fire.getUserChats(addChat);
    return (() => {
      Fire.chatsOff();
    })
  }, [])

  const addChat = (chat: any) => {
    setChats(previousChats => [chat, ...previousChats]);
  };

  const onChatPress = (chatId: string, otherUserEmail: string) => {
    navigation.navigate(CHAT, { chatId, otherUserEmail })
  }

  if (chats.length === 0) return (
    <View style={{flex: 1}}>
      <Text style={{color: colors.primary, marginTop: hp(5), alignSelf: 'center', fontSize: 20}}>
        No chats here :(
      </Text>
    </View>
  );

  return (
    <View>
      {(chats.length !== 0) ? chats.map(chat => 
        <TouchableHighlight
          key={chat.id}
          onPress={() => onChatPress(chat.chatId, chat.otherUserEmail)} 
          style={{margin: hp(1), borderRadius: 5, 
            minHeight: hp(15), justifyContent: 'center',
            backgroundColor: '#2225'}}
          underlayColor={colors.underlay}
          >
          <View style={{flexDirection: 'row', marginLeft: hp(1)}}>
            <Avatar.Image
              size={wp(20)}
              source={{uri: (chat.otherUserAvatar !== '') ? chat.otherUserAvatar : undefined}}
              />
            <Text style={{color: colors.primary, marginLeft: wp(5), marginTop: hp(2), fontSize: 20}}>
              {chat.otherUserEmail}
            </Text>
          </View>
        </TouchableHighlight>) 
      : <></>}
    </View>
  );
}
