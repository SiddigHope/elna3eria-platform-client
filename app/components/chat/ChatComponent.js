import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { colors } from '../../config/vars';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import TextInputRender from './TextInputRender';
import Pusher from 'pusher-js/react-native';
import Echo from 'laravel-echo';
import { sendChatMessage } from '../../config/apis/posts';

const { width, height } = Dimensions.get("window")

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
            message: '',
            messages: [],
            conversation: [],
            user: {},
            loading: false
        };
        this.echo = new Echo({
            broadcaster: 'pusher',
            // host: 'http://na3eria.sudahex.com',
            client: undefined,
            key: "7e3f6fc1daa17a226792",
            cluster: "eu",
            // encrypted: true,
            forceTLS: true,
            disableStats: true
        });
    }

    componentDidMount() {
        const { user, conversation } = this.props
        this.setState({
            conversation,
            messages: conversation.messages,
            user,
        })
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        // if (nextProps.conversation.messages.length != this.state.messages.length) {
        this.setState({
            messages: nextProps.conversation.messages,
            user: nextProps.user,
            conversation: nextProps.conversation
        });
        this.listenToChannel(nextProps.conversation, nextProps.conversation.messages)

        // }
    }

    listenToChannel = async (conversation) => {
        console.log("conversation should start listening")
        console.log(conversation.id)

        this.echo.channel('conversation.' + conversation.id)
            .listen('MessageSent', event => {
                const { messages } = this.state
                console.log("event")
                console.log(event)
                // console.log("messages")
                // console.log(messages)
                messages.unshift(event.message)
                this.setState({ messages })
            })
    }

    writeMessage = (message) => {
        this.setState({
            message,
        })
    }


    submitMessage = async () => {
        const { message, loading } = this.state
        if (loading) return
        if (message != '') {
            this.setState({ loading: true })
            const data = {
                conversation_id: this.state.conversation.id,
                message: message,
                sender_id: this.state.user.id
            }
            const messageSent = await sendChatMessage(data)
            if (messageSent) {
                console.log("message sent successfully")
                this.setState({ message: "", loading: false })
                return
            }
            this.setState({ loading: false })
            console.log("message not send")
            return
        }
        console.log("the message is empty")
    }

    render() {
        // console.log(this.state.messages && this.state.messages.length)
        return (
            <ImageBackground source={require('../../../assets/icons/chatBackground.png')} style={styles.container}>
                <ChatHeader
                    client={this.props.doctor}
                    navigation={this.props.navigation}
                />
                <MessageList user={this.props.user} messages={this.state.messages} />
                <TextInputRender
                    loading={this.state.loading}
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
