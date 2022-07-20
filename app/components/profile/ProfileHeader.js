import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors, fonts } from '../../config/vars';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Icon1 from "react-native-vector-icons/Ionicons"
import elevations from '../../config/elevations';
import { goToScreen } from '../../config/functions';

const { width } = Dimensions.get("window")
export default class ProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
    }

    editProfile = () => {
        goToScreen("EditProfile", this.props.navigation, { user: this.props.user.client })
    }

    componentWillReceiveProps(prevProps) {
        if (this.state.user != prevProps.user) {
            this.setState({
                user: prevProps.user
            })
        }
    }

    render() {
        const { user } = this.state
        console.log("user profile header")
        console.log(user)
        if (user.length == 0) {
            return (
                <ActivityIndicator size={72} color={colors.mainColor} />
            )
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()} style={styles.closeDrawer}>
                    <Icon1 name='arrow-forward' size={20} color={colors.white} />
                </TouchableOpacity>
                <View style={[styles.imageBannerContainer, elevations[5]]}>
                    <Image
                        style={styles.imageBanner}
                        source={require("../../../assets/images/5804273.jpg")}
                    />
                </View>
                <View style={[styles.profileContainer, elevations[5]]}>
                    <View style={[styles.imageContainer, elevations[5]]}>
                        <Image
                            style={styles.image}
                            source={user.client.image ? { uri: user.client.image } : require("../../../assets/images/avatar.png")}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>
                            {user.client.name}
                        </Text>
                        <Text style={styles.email}>
                            {user.client.email}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={this.editProfile} style={[styles.logoutBtn, elevations[5]]} >
                        <Icon name="account-cog-outline" size={30} color={colors.ebony} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: (width * 90) / 100,
        height: 250,
        backgroundColor: colors.whiteF7,
        elevation: 5,
        // borderRadius: 10,
        alignItems: 'center',
        // padding: 10,
        marginBottom: 20
    },
    closeDrawer: {
        width: 25,
        height: 25,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.ebony,
        position: "absolute",
        zIndex: 111,
        elevation: 10,
        left: 10,
        top: 10
    },
    imageBannerContainer: {
        height: 150,
        width: (width * 90) / 100,
        // borderRadius: 10,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        backgroundColor: colors.whiteF7,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBanner: {
        height: "100%",
        width: "100%",
        // borderRadius: 10,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
    },
    profileContainer: {
        width: (width * 90) / 100,

        backgroundColor: colors.whiteF7,
        elevation: 5,
        // borderRadius: 10,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20
    },
    imageContainer: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: colors.whiteF7,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 40,
    },

    infoContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    name: {
        flex: 1,
        textAlign: "right",
        textAlignVertical: 'center',
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.ebony,
    },
    email: {
        flex: 1,
        textAlign: "right",
        textAlignVertical: 'top',
        fontFamily: fonts.tajawalR,
        fontSize: 16,
        color: colors.grey,
    },
    logoutBtn: {
        // position: "absolute",
        backgroundColor: colors.whiteF7,
        borderRadius: 30,
        padding: 5,
        elevation: 5,
        // left: -5,
        // top: -10
    }
})