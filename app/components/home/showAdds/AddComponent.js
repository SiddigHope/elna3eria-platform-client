import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';


const { width, height } = Dimensions.get("window");

export default function AddComponent({ item }) {
    const video = React.useRef(null);
    const media = item.item
    const [status, setStatus] = React.useState({});

    return (
        <View style={styles.container}>
            {media.type == "image" ? (
                <Image resizeMode='contain' source={{ uri: media.file }} style={styles.image} />
            ) : (
                <>
                    {/* <View></View> */}
                    <Video
                        ref={video}
                        style={styles.video}
                        source={{
                            uri: media.file,
                        }}
                        onFullscreenUpdate={() => { video.current.isMuted = false }}
                        isMuted
                        onLoad={() => video.current.playAsync()}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        // status={status}
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                    {/* <Button
                        title={status.isPlaying ? 'Pause' : 'Play'}
                        onPress={() =>
                            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                        }
                    /> */}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    video: {
        height: (height * 40) / 100,
        width: width,
    },
    image: {
        height: (height * 40) / 100,
        width: width,
    }
})