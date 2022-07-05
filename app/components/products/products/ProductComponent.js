import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Pressable,
    TouchableOpacity,
    Alert
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, fonts } from '../../../config/vars';
import { goToScreen } from '../../../config/functions';
import { deleteProduct } from "../../../config/apis/products/posts";
import { elevations } from '../../../config/elevations';


const { width, height } = Dimensions.get("window");

export default class ProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    deleteItem = async (item) => {

        Alert.alert(
            'حذف المنتج',
            'هل انت متاكد بنأنك تريد حذف هذا المنتج؟',
            [
                {
                    text: 'لا',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'نعم', onPress: () => this.deleteItemConfirm(item.id) },
            ],
            { cancelable: false },
        );
    }

    deleteItemConfirm(id) {
        const deleted = deleteProduct(id)
        if (deleted) {
            this.props.updateData()
            return
        }
        console.log("item not deleted")
    }

    handlePress = () => {
        const {screen, item} = this.props
        if(screen=="pManagement"){
            this.props._productScreen("edit", { item: item })
        }else if(screen == "profile"){
            this.props.goToScreen(item.item)
        }
    }

    render() {
        // let margin = 0;
        // if (this.props.item.index % 2 == 0) {
        //     margin = 10;
        // }

        const item = this.props.item.item;
        // console.log(item.images[0])
        return (
            <View
                style={[styles.container, elevations[5], {  }]}
            >
                {this.props.screen == "pManagement" && (
                    <TouchableOpacity onPress={() => this.deleteItem(item)} style={[styles.deleteIcon, elevations[6]]} >
                        <View>
                            <Icon name="trash-can-outline" size={20} color={colors.danger} />
                        </View>
                    </TouchableOpacity>
                )}
                <Image source={{ uri: item.images.length != 0 ? item.images[0].image : "" }} style={styles.image} />
                <Pressable onPress={this.handlePress} style={styles.contentContainer}>
                    <View style={styles.nameContainer}>
                        <View style={styles.miniRow}>
                            <Text
                                numberOfLines={1}
                                style={[styles.price, { maxWidth: 35 }]}
                            >
                                {item.price}
                            </Text>
                            <Text style={[styles.price]}>{" SR"}</Text>
                        </View>
                        <Text style={styles.title} numberOfLines={1}>
                            {" "}
                            {item.title}{" "}
                        </Text>
                    </View>
                    <View style={[styles.nameContainer, { marginHorizontal: 10, marginTop: 0 }]}>
                        <Text numberOfLines={3} style={styles.desc}>
                            {item.description}
                        </Text>
                    </View>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: ((width * 85) / 100) / 2,
        height: 240,
        backgroundColor: colors.white,
        borderRadius: 10,
        elevation: 5,
    },
    image: {
        width: ((width * 85) / 100) / 2,
        height: 180,
        borderRadius: 10,
    },
    contentContainer: {
        position: "absolute",
        backgroundColor: colors.white,
        height: "35%",
        width: "100%",
        bottom: 0,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    nameContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginTop: 5,
    },
    miniRow: {
        flexDirection: "row",
        // backgroundColor: 'red',
        alignItems: "center",
    },
    title: {
        flex: 1,
        fontFamily: "Tajawal-Bold",
        fontSize: 12,
        color: colors.softBlack,
        // backgroundColor: 'red',
        textAlign: 'right',
    },
    price: {
        fontFamily: "Tajawal-Bold",
        fontSize: 14,
        color: colors.softGreen,
        margin: 0,
    },
    desc: {
        fontFamily: fonts.tajawalR,
        fontSize: 12,
        textAlign: 'right',
        width: "100%"
    },
    deleteIcon: {
        position: "absolute",
        backgroundColor: colors.white,
        height: 30,
        width: 30,
        elevation: 6,
        borderRadius: 15,
        left: 10,
        top: 10,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 11
    }
});
