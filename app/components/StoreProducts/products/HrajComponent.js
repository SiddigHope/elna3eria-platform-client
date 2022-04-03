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

export default class HrajComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let margin = 0;
        if (this.props.item.index % 2 == 0) {
            margin = 10;
        }

        const item = this.props.item.item;
        // console.log(item.images[0])
        return (
            <Pressable
                onPress={() => this.props.goToScreen(this.props.store, item)}
                style={[styles.container, elevations[5], { marginRight: margin }]}
            >
                <Image source={{ uri: item.images.length != 0 ? item.images[0].image : "" }} style={styles.image} />
                <View style={styles.contentContainer}>
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
                </View>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: ((width * 85) / 100) / 2,
        height: 220,
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
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
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
});
