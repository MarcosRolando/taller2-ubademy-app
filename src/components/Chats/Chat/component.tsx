import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../../../../Fire';
import { getUserCredentials } from '../../../userCredentials';
import { getUserProfilePicture } from '../../../userProfile';
import { Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../styles/colors';
import { sendMessageNotification } from '../../../scripts/chats';

export const Chat = ({ chatId, otherUserEmail }: any) => {
  const [messages, setMessages] = useState([] as Array<any>);
  const { email } = getUserCredentials();
  const avatar = getUserProfilePicture();

  useEffect(() => {
    Fire.getMessages(onSend, chatId);
    return (() => {
      Fire.chatOff(chatId);
    })
  }, [])

  const onSend = (message: any) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, message));
  };

  return (
    <>
      <View style={{margin: hp(1), backgroundColor: '#2225', borderRadius: 5}}>
        <Text style={{color: colors.primary, fontSize: 20, alignSelf: 'center'}}>
          {otherUserEmail}
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages) => {
          Fire.sendMessages(messages, chatId);
          sendMessageNotification(otherUserEmail, messages[0].text);
        }}
        user={{
          _id: email,
          avatar: avatar,
        }}
      />
    </>
  )
}
