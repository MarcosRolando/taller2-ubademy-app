import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import { Video, AVPlaybackStatus } from "expo-av";

const CourseList = () => {
  const video = React.useRef(null as any);
  const [status, setStatus] = React.useState({} as any);

  return (
    <View>
        <Video
          ref={video}
          source={{
            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />

      <List.Section>
      <List.Subheader>Some title</List.Subheader>
      <List.Item title="Video" onPress={video.current.presentFullscreenPlayer()} left={() => <List.Icon icon="folder" />} />
      </List.Section>
    </View>
  )
}

export default CourseList;