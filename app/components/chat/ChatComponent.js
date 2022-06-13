import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/vars';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import TextInputRender from './TextInputRender';


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
            <View style={styles.container}>
                <ChatHeader
                    navigation={this.props.navigation}
                />
                <MessageList messages={messages} />
                <TextInputRender
                    message={this.state.message}
                    textChange={this.writeMessage}
                    submitMessage={this.submitMessage}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteF7
    }
})
