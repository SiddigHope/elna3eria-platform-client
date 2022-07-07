import React, { Component } from 'react';
import { View, Text, TextInput, Platform, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import Icon from "react-native-vector-icons/Feather"
import { colors, fonts } from '../../../config/vars';

export default class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
        };
    }

    submitForm = () => {
        this.props.setLoading(true)
        if (this.state.comment) {
            this.props.submitForm(this.state.comment)
        }
        this.setState({ comment: "" })
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios') ? "padding" : null}
                keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
            >
                <View style={styles.container}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder={"اكتب تعليقك هنا..."}
                            value={this.state.comment}
                            multiline
                            style={styles.textInput}
                            placeholderTextColor={colors.grey}
                            onChangeText={(comment) => this.setState({ comment })}
                        />
                    </View>
                    <TouchableOpacity onPress={this.submitForm}>
                        {this.props.loading ? (
                            <ActivityIndicator color={colors.mainColor} size="small" />
                        ) : (
                            <Icon name='send' style={styles.btnIcon} color={colors.grey} size={30} />
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 20,
        width: "100%",
        height: 50,
        flexDirection: "row-reverse",
        alignItems: 'center',
        backgroundColor: colors.softWhite,
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    btnIcon: {
        transform: [{ rotate: '270deg' }]
    },
    textInputContainer: {
        // backgroundColor: "red",
        // flex: 1,
        width: "90%",
        minHeight: 40,
    },
    textInput: {
        // backgroundColor: "black",
        height: "100%",
        textAlignVertical: "center",
        textAlign: "right",
        color: colors.softBlack,
        fontFamily: fonts.tajawalR,
        fontSize: 14,
    }
})
