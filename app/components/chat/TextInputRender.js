import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { colors, fonts, mainColorWithOpacity } from '../../config/vars';


const { width, height } = Dimensions.get("window")

export default class TextInputRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textInputCont}>
                    <TextInput
                        textAlign='right'
                        style={styles.textInput}
                        placeholder={"أكتب رسالتك..."}
                        multiline
                        placeholderTextColor={colors.grey}
                        onChangeText={(message) => this.props.textChange(message)}
                    />
                </View>
                <TouchableOpacity style={styles.sendBtnCont} onPress={this.props.submitMessage}>
                    {this.props.loading ? (
                        <ActivityIndicator color={colors.white} size="small" />
                    ) : (
                        <Icon name='send' color={colors.softWhite} size={20} />
                    )}
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width,
        height: 50,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: colors.softWhite,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    textInputCont: {
        flex: 1,
        minHeight: 40,
        maxHeight: 80,
        paddingHorizontal: 20,
        backgroundColor: colors.blackTransparent,
        // width: "90%",
        borderRadius: 20,
        marginRight: 5,
    },
    textInput: {
        fontFamily: fonts.tajawalR,
        fontSize: 16,
        color: colors.ebony,
        lineHeight: 20,
        minHeight: 40,
        maxHeight: 80,
    },
    sendBtnCont: {
        backgroundColor: mainColorWithOpacity(0.6),
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // btnIcon: {
    //     transform: [{ rotate: '43deg' }]
    // },
})