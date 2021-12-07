import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../../../../Fire';

export const Chat = () => {
  const [messages, setMessages] = useState([] as Array<any>);

  useEffect(() => {
    Fire.get(onSend);
    return (() => {
      Fire.off()
    })
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={Fire.send}
      user={{
        _id: 1,
      }}
    />
  )
}
