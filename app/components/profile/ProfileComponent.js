import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../config/vars';
import UserClass from '../../config/authHandler';
import ProfileHeader from './ProfileHeader';
import ListComponent from './ListComponent';
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/SimpleLineIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import elevations from '../../config/elevations';


const { width, height } = Dimensions.get("window")

export default class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
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
            {
                id: 5,
                title: "المتاجر المفضلة",
                onPress: "FavStores",
                icon: <Icon1 name="heart" size={25} color={colors.mainColor} />,
            },
            {
                id: 6,
                title: "المنتحات المفضلة",
                onPress: "FavProducts",
                icon: <Icon1 name="heart-outline" size={25} color={colors.mainColor} />,
            },
            {
                id: 7,
                title: "الحراج",
                onPress: "Hiraj",
                icon: <Icon name="storefront-outline" size={25} color={colors.mainColor} />,
            },
            {
                id: 8,
                title: "تقيماتي",
                onPress: "MyReviews",
                icon: <Icon name="star-face" size={25} color={colors.mainColor} />,
            },
        ]
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = async () => {
        this.setState({
            user: await UserClass.getUser()
        })
    }

    _itemSeparator = () => (
        <View style={[styles.hr, elevations[1]]} />
    )

    _listHeader = () => (
        <View style={{ height: 20 }} />
    )

    _listFooter = () => (
        <View style={{ height: 20 }} />
    )

    _renderItem = (item, index) => (
        <ListComponent item={item} index={index} navigation={this.props.navigation} />
    )

    render() {
        // console.log("this.state.user")
        // console.log(this.state.user)
        return (
            <View style={styles.container}>
                <ProfileHeader user={this.state.user} navigation={this.props.navigation} />
                {/* <View style={[styles.listContainer, elevations[10]]} > */}
                {this.list.map(item => (
                    <>
                        <ListComponent item={item} navigation={this.props.navigation} key={item.id} />
                        <View style={[styles.hr, elevations[1]]} />
                    </>
                ))}
                {/* <FlatList
                        data={this.list}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        // ListHeaderComponent={this._listHeader}
                        style={{ width: "90%" }}
                        contentContainerStyle={{ alignItems: 'center' }}
                        ListFooterComponent={this._listFooter}
                        ItemSeparatorComponent={this._itemSeparator}
                        renderItem={this._renderItem}
                    /> */}
                {/* </View> */}
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
        marginVertical: 10,
    },
    container: {
        flex: 1,
        alignItems: "center",
        // marginTop: 30,
        // justifyContent:  'center',
        width: "90%",
        marginBottom: 20 ,

        // marginBottom: 55
        // backgroundColor: colors.white
    },
    listContainer: {
        paddingVertical: 30,
        borderRadius: 20,
        backgroundColor: colors.white,
        elevation: 10,
        marginVertical: 20,
        width: "100%"
    }
})