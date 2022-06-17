import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Button, TouchableOpacity } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { colors, fonts } from '../../../config/vars';
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
        openModal(media)
        // console.log("item.advertisements")
        // console.log()
    }

    return (
        <TouchableOpacity onPress={openAdds} style={[styles.container, { marginRight: item.index % 2 == 0 ? 10 : 0 }]}>
            <Image source={{ uri: media.image }} style={styles.image} />
            <View style={styles.overlayCard}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}> {media.name} </Text>
                    <View style={styles.labelImageContainer}>
                        <Image style={styles.labelImage} source={{ uri: media.image }} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: ((width * 92) / 100) / 2,
        height: 240,
        backgroundColor: colors.white,
        borderRadius: 10,
        elevation: 5,
    },
    overlayCard: {
        position: "absolute",
        width: ((width * 92) / 100) / 2,
        height: 240,
        backgroundColor: colors.blackTransparent2,
        borderRadius: 10,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    labelContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: "wrap-reverse",
        margin: 10
    },
    labelImageContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: colors.mainColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelImage: {
        height: 55,
        width: 55,
        borderRadius: 40,
    },
    label: {
        fontFamily: fonts.tajawalB,
        fontSize: 18,
        color: colors.white,
        marginRight: 5,
    },
    video: {
        height: (height * 40) / 100,
        width: width,
    },
    image: {
        width: ((width * 92) / 100) / 2,
        height: 240,
        borderRadius: 10,
    },
})