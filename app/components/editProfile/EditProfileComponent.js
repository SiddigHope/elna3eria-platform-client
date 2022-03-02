import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../config/vars';
import ProfileForms from './ProfileForms';
import ProfileImage from './ProfileImage';
import { ScrollView, RefreshControl } from 'react-native';
import { updateUserProfile, getUserProfile } from '../../config/apis/authentication';

export default class EditProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            refreshing: false,
            user: [],
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
    }

    submitForm = async (data) => {
        const { user } = this.state
        const formData = new FormData()

        if (!this.state.image) {
            // show error note
            return
        }
        // // console.log(data.location)
        // // return

        // formData.append("name", data.name)
        // // if (data.email != user.email) {
        // formData.append("email", data.email.toLowerCase())
        // // }
        // // if (data.phone != user.phone) {
        // formData.append("phone", data.phone)
        // // }
        // formData.append("location", data.location)
        // // if (this.state.image.uri) {
        // //     formData.append("image", this.state.image)
        // // }

        const stored = await updateUserProfile(data)

        if (stored) {
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
                <ProfileImage onChange={(image) => this.setState({ image })} image={this.state.user.image} />
                <ProfileForms submitForm={this.submitForm} user={this.state.user} />
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