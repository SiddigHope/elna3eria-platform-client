import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Button, TouchableOpacity } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { colors } from '../../../config/vars';
import { goToScreen } from '../../../config/functions';


const { width, height } = Dimensions.get("window");

export default function AddComponent({ item, openModal }) {
    const video = React.useRef(null);
    const media = item.item
    const [status, setStatus] = React.useState({});

    // let margin = 0;
    // if (this.props.item.index % 2 == 0) {
    //     margin = 10;
    // }

    const openAdds = () => {
        openModal(item)
    }

    return (
        <TouchableOpacity onPress={openAdds} style={[styles.container, { marginRight: item.index % 2 == 0 ? 10 : 0 }]}>
            {media.type == "image" ? (
                <Image source={{ uri: media.file }} style={styles.image} />
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
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: ((width * 92) / 100) / 2,
        height: 220,
        backgroundColor: colors.white,
        borderRadius: 10,
        elevation: 5,
    },
    video: {
        height: (height * 40) / 100,
        width: width,
    },
    image: {
        width: ((width * 92) / 100) / 2,
        height: 220,
        borderRadius: 10,
    },
})