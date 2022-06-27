import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../config/vars';


export default function AudioMessage({ message }) {
    const [sound, setSound] = React.useState(null);
    const { audioObj, setAudioObj } = React.useState(null)

    async function playSound() {
        console.log('Loading Sound');
        if (sound === null || sound.isFinished) {
            const audio = Audio.Sound
            const { sound } = await audio.createAsync(
                { uri: message.message }, { shouldPlay: true }
            );
            setSound(sound);

            setAudioObj(audio);

            console.log('Playing Sound');
            await sound.playAsync();
            return
        }

        if (sound.isLoaded && sound.isPlaying) {
            audioObj.setStatusAsync({ shouldPlay: false })
            return
        }
    }

    React.useEffect(() => {
        console.log(message)
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <TouchableOpacity onPress={playSound} style={styles.playBtn}>
            <Icon name="play" color={colors.mainColor} size={30} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    playBtn: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
})