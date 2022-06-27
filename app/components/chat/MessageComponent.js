import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { colors, fonts, mainColorWithOpacity } from '../../config/vars';
import moment from 'moment';
import { Image } from 'react-native-elements';

export default class MessageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const message = this.props.item.item
        let sender = message.sender_type == "App\\Models\\Client" ? true : false
        // console.log(message.sender_type.splice());
        return (
            <View style={[styles.container, sender && { alignSelf: "flex-end", backgroundColor: colors.grey }]}>
                {message.type == "image" ? (
                    <Image
                        PlaceholderContent={<ActivityIndicator color={colors.mainColor} size="small" />}
                        // resizeMode="contain"
                        source={{ uri: message.message }}
                        style={styles.image}
                    />
                ) : (
                    <Text style={[styles.messageText]}>{message.message}</Text>
                )}
                <Text style={styles.messageTime}>{message.time}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.ebony,
        // minHeight: 40,
        padding: 10,
        maxWidth: "70%",
        alignSelf: "flex-start",
        marginHorizontal: 10,
        borderRadius: 15,
        elevation: 3,
    },
    messageText: {
        fontFamily: fonts.tajawalR,
        fontSize: 16,
        color: colors.white,
        lineHeight: 20
    },
    messageTime: {
        fontFamily: fonts.tajawalR,
        fontSize: 10,
        color: colors.softWhite,
        // backgroundColor: "red",
        textAlign: "right"
    },
    image: {
        height: 250,
        width: 220,
        borderRadius: 20
    }
})
