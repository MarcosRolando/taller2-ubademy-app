import React, { useEffect, useRef } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

const ClassVideo = () => {
  const video = React.useRef(null as any);
  const [status, setStatus] = React.useState({} as any);




  return (
  <View>
       <View style={styles.container}>

      
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

        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
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