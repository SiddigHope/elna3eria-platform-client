import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { colors } from '../../config/vars';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import TextInputRender from './TextInputRender';

const {width, height} = Dimensions.get("window")

const messages = [
    {
        sender: 1,
        message: "this is just a test message sender version"
    },
    {
        sender: 2,
        message: "this is just a test message receiver version kjlkj qw kjwlkjqwe kjwelkwqje lkwqjelkqjwe ls;dlkflskfl;dskfldskf ldk;lsakdlsak fd skfldskfldskf skfdslkfldskf sdlkf;ldskf;ldsfk"
    }
]

export default class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    writeMessage = (message) => {
        this.setState({
            message,
        })
    }


    submitMessage = async () => {
        const { message } = this.state

        console.log(message)
    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/icons/chatBackground.png')} style={styles.container}>
                <ChatHeader
                    navigation={this.props.navigation}
                />
                <MessageList messages={messages} />
                <TextInputRender
                    message={this.state.message}
                    textChange={this.writeMessage}
                    submitMessage={this.submitMessage}
                />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width,
        // height,
        backgroundColor: colors.whiteF7
    }
})
