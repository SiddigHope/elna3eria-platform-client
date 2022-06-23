import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import { colors } from '../../../config/vars';
import { Video, AVPlaybackStatus } from 'expo-av';

const { width, height } = Dimensions.get("window")

export default function AddMediaComponent({ item }) {


    const video = React.useRef(null);
    const media = item.item
    const [status, setStatus] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        _onPlaybackStatusUpdate(status);
    }, [status])

    const _onPlaybackStatusUpdate = playbackStatus => {
        console.log(status)
        if (!playbackStatus.isLoaded) {
            setLoading(true)

            // Update your UI for the unloaded state
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                // Send Expo team the error on Slack or the forums so we can help you debug!
            }
        } else {
            // Update your UI for the loaded state

            if (playbackStatus.isPlaying) {
                setLoading(false)
                // Update your UI for the playing state
            } else {
                // Update your UI for the paused state
            }

            if (playbackStatus.isBuffering) {
                setLoading(true)
                // Update your UI for the buffering state
            }

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                // The player has just finished playing and will stop. Maybe you want to play something else?
            }

        }
    };

    return (
        <View style={styles.container}>
            {media.type == "image" ? (
                <Image
                    // onLoadEnd={this.props.startCount}
                    PlaceholderContent={<ActivityIndicator color={colors.mainColor} size="small" />}
                    resizeMode='contain'
                    style={styles.image}
                    source={{ uri: media.file }}
                />
            ) : (
                <>
                    {loading &&
                        <ActivityIndicator
                            animating
                            color={colors.ebony}
                            size="large"
                            style={{ flex: 1, position: "absolute", top: "40%", left: "45%", zIndex: 11111 }}
                        />
                    }
                    <Video
                        ref={video}
                        style={styles.video}
                        source={{
                            uri: media.file,
                        }}
                        // onFullscreenUpdate={() => { video.current.isMuted = false }}
                        // isMuted
                        onLoad={() => video.current.playAsync()}
                        // useNativeControls
                        resizeMode="contain"
                        // isLooping
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
    },
    image: {
        width: width,
        height: height - 70,
    },
    video: {
        height: height - 70,
        // height: (height * 40) / 100,
        width: width,
    },
})