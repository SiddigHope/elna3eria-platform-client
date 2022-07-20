import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { colors, fonts } from '../../config/vars';
import UserClass from '../../config/authHandler';
import ProfileHeader from './ProfileHeader';
import ListComponent from './ListComponent';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from "react-native-vector-icons/SimpleLineIcons";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import Icon5 from "react-native-vector-icons/AntDesign";
import elevations from '../../config/elevations';
import { goToScreen } from '../../config/functions';


const { width, height } = Dimensions.get("window")

export default class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
        };
        this.list = [
            {
                id: 1,
                title: "المتاجر المفضلة",
                onPress: "FavStores",
                icon: <Icon1 name="heart" size={25} color={colors.mainColor} />,
            },
            {
                id: 2,
                title: "المنتحات المفضلة",
                onPress: "FavProducts",
                icon: <Icon1 name="heart-outline" size={25} color={colors.mainColor} />,
            },
            {
                id: 3,
                title: "الحراج",
                onPress: "Hiraj",
                icon: <Icon name="storefront-outline" size={25} color={colors.mainColor} />,
            },
            {
                id: 4,
                title: "تقيماتي",
                onPress: "MyReviews",
                icon: <Icon name="star-face" size={25} color={colors.mainColor} />,
            },
        ],
            this.footerList = [
                {
                    id: 1,
                    title: "عن التطبيق",
                    onPress: "FavStores",
                    icon: <Icon1 name="ios-information-circle-sharp" size={25} color={colors.mainColor} />,
                },
                {
                    id: 2,
                    title: "الدعم الفني",
                    onPress: "FavProducts",
                    icon: <Icon4 name="contact-support" size={25} color={colors.mainColor} />,
                },
                {
                    id: 3,
                    title: "تسجيل خروج",
                    onPress: "Signin",
                    icon: <Icon4 name="logout" size={25} color={colors.mainColor} />,
                },
            ]
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = async () => {

        // console.log("user class")
        // console.log(await UserClass.getUser());
        this.setState({
            user: await UserClass.getUser(),
        })
    }

    goToScreen = (item) => {
        if (item == "Signin") {
            UserClass.logout()
            goToScreen(item, this.props.navigation)
            return
        }
        goToScreen(item, this.props.navigation)
    }

    _itemSeparator = () => (
        <View style={[styles.hr, elevations[1]]} />
    )

    _listHeader = () => (
        <View style={{ height: 20 }} />
    )

    _listFooter = () => (
        <View style={styles.footerContainer}>
            <TouchableOpacity onPress={() => this.goToScreen(this.footerList[1].onPress)} style={styles.footerItemContainer}>
                {this.footerList[1].icon}
                <Text style={styles.title}> {this.footerList[1].title} </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.goToScreen(this.footerList[0].onPress)} style={styles.footerItemContainer}>
                {this.footerList[0].icon}
                <Text style={styles.title}> {this.footerList[0].title} </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.goToScreen(this.footerList[2].onPress)} style={styles.footerItemContainer}>
                {this.footerList[2].icon}
                <Text style={styles.title}> {this.footerList[2].title} </Text>
            </TouchableOpacity>
        </View>
    )

    _renderItem = (item, index) => (
        <ListComponent item={item.item} index={index} navigation={this.props.navigation} />
    )

    render() {
        return (
            <View style={styles.container}>
                <ProfileHeader user={this.state.user} navigation={this.props.navigation} />
                <FlatList
                    data={this.list}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ width: "90%" }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    ListFooterComponent={this._listFooter}
                    ItemSeparatorComponent={this._itemSeparator}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    hr: {
        height: 0.5,
        width: 170,
        alignSelf: 'center',
        backgroundColor: colors.grey,
        elevation: 1,
        marginVertical: 5,
    },
    container: {
        flex: 1,
        alignItems: "center",
        width: "90%",
    },
    listContainer: {
        paddingVertical: 30,
        borderRadius: 20,
        backgroundColor: colors.white,
        elevation: 10,
        marginVertical: 20,
        width: "100%"
    },
    footerContainer: {
        paddingTop: 30,
        borderRadius: 20,
        // backgroundColor: colors.black,
        marginTop: 40,
        marginBottom: 20,
        width: "100%",
        borderTopColor: colors.white,
        borderTopWidth: 0.5
    },
    footerItemContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: "100%",
        height: 60,
        elevation: 5,
    },
    title: {
        flex: 1,
        textAlign: 'right',
        textAlignVertical: "center",
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        color: colors.white,
        marginHorizontal: 20
    }
})