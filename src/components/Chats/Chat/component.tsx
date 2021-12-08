import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../../../../Fire';
import { getUserCredentials } from '../../../userCredentials';
import { getUserProfilePicture } from '../../../userProfile';

export const Chat = () => {
  const [messages, setMessages] = useState([] as Array<any>);
  const { email } = getUserCredentials();
  const avatar = getUserProfilePicture();

  useEffect(() => {
    Fire.getMessages(onSend, "unchannelprivado");
    return (() => {
      Fire.off("unchannelprivado")
    })
  }, [])

  const onSend = (message: any) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, message));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => Fire.send(messages, "unchannelprivado")}
      user={{
        _id: email,
        avatar: avatar,
      }}
    />
  )
}
