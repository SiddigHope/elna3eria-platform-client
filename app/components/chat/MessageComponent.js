import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors, fonts, mainColorWithOpacity } from '../../config/vars';
import moment from 'moment';

export default class MessageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const message = this.props.item.item
        return (
            <View style={[styles.container, message.sender == 1 && {alignSelf: "flex-end", backgroundColor:colors.mainColor}]}>
                <Text style={styles.messageText}>{message.message}</Text>
                <Text style={styles.messageTime}>{moment("2022-05-21T10:58:19.000000Z").fromNow()}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: mainColorWithOpacity(0.7),
        // minHeight: 40,
        padding: 10,
        maxWidth: "70%",
        alignSelf: "flex-start",
        marginHorizontal: 10,
        borderRadius: 15,
    },
    messageText:{
        fontFamily:fonts.tajawalR,
        fontSize: 16,
        color:colors.white,
        lineHeight: 20
    },
    messageTime:{
        fontFamily:fonts.tajawalR,
        fontSize: 10,
        color:colors.softWhite,
        // backgroundColor: "red",
        textAlign: "right"
    }
})
