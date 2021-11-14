import React, { useEffect, useRef } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

const ClassVideo = ({uri, title} : any) => {
  const video = React.useRef(null as any);
  const [status, setStatus] = React.useState({} as any);

  return (
  <View>
       <View style={styles.container}>

        <Video
          ref={video}
          source={{
            uri: uri,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />

        <Button
          title={title}
          onPress={() =>
            video.current.presentFullscreenPlayer()
          }
        />
       </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClassVideo;