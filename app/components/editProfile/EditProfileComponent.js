import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../config/vars';
import ProfileForms from './ProfileForms';
import ProfileImage from './ProfileImage';
import { ScrollView, RefreshControl } from 'react-native';
import { updateUserProfile, getUserProfile, updateUserAvatar } from '../../config/apis/authentication';
import { ActivityIndicator } from 'react-native';

export default class EditProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            refreshing: false,
            user: [],
            updated: false
        };
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = async () => {
        const user = await getUserProfile()
        this.setState({
            user,
        })
        setTimeout(() => {
            this.setState({
                updated: true
            })
        }, 2000)
    }

    submitForm = async (data) => {
        const { user, image } = this.state
        const formData = new FormData()

        if (image.uri) {
            formData.append("image", image)
            updateUserAvatar(formData)
        }

        const stored = await updateUserProfile(data)

        if (stored) {
            this._onRefresh()
            this.props.navigation.goBack()
        }
    }

    _onRefresh = async () => {
        console.log("refreshing***********************************")
        this.setState({ refreshing: true });
        this.getUser()
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 2000)
    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this._onRefresh()}
                        colors={[colors.mainColor, colors.blueLight]}
                        enabled={true}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
                style={styles.container}>
                {this.state.updated ? (
                    <>
                        <ProfileImage onChange={(image) => this.setState({ image })} image={this.state.user.image} />
                        <ProfileForms submitForm={this.submitForm} user={this.state.user} />
                    </>
                ) : (
                    <View style={[{ flex: 1, justifyContent: 'center' }]}>
                        <ActivityIndicator color={colors.mainColor} size={50} />
                    </View>
                )}
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        // alignItems: 'center',
        // justifyContent: 'center'
    }
})