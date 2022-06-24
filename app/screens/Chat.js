import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ChatComponent from '../components/chat/ChatComponent';
import { colors } from '../config/vars';
import { getDoctorConversation, getStoreConversation } from '../config/apis/gets';
import UserClass from '../config/authHandler';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversation: [],
            user: []
        };
    }

    componentDidMount() {
        this.getConversation()
    }

    getConversation = async () => {
        let conversation = []
        const id = this.props.route.params.receiver.id
        if (this.props.route.params.type == "doctor") {
            conversation = await getDoctorConversation(id)
        } else {
            conversation = await getStoreConversation(id)
        }
        if (conversation) {
            this.setState({
                conversation,
                user: await UserClass.getUser()
            })
        }
    }


    render() {
        console.log(this.props.route.params.receiver)
        return (
            <View style={styles.container} >
                <StatusBar translucent={false} backgroundColor={colors.whiteF7} />
                <ChatComponent
                    type={this.props.route.params.type}
                    receiver={this.props.route.params.receiver}
                    navigation={this.props.navigation}
                    conversation={this.state.conversation}
                    user={this.state.user.client}
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
});
