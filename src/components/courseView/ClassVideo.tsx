import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import { Video } from "expo-av";
import colors from "../../styles/colors";

const ClassVideo = ({uri, title} : any) => {
  const video = React.useRef(null as any);
  const [status, setStatus] = React.useState({} as any);

  function onFullscreenUpdate(fullscreenUpdate: any) {
    switch (fullscreenUpdate.fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT: 
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT: 
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS: 
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS: 
        video.current.stopAsync();
      ;
    }
  }

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
        onPlaybackStatusUpdate={status => {setStatus(() => status)}}
        rate={1.0}
        onFullscreenUpdate={onFullscreenUpdate}
      />

      <List.Item
        title={title}
        left={props => <List.Icon {...props} icon="play"/>}
        onPress={() => {
          video.current.presentFullscreenPlayer();
        }}
        style={{backgroundColor:colors.background}}
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