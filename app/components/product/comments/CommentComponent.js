import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Pressable, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import elevations from '../../../config/elevations';
import { colors, fonts } from '../../../config/vars';
import Icon2 from "react-native-vector-icons/MaterialIcons";
import moment from 'moment';

const { width, height } = Dimensions.get("window")

export default class CommentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const item = this.props.item
        return (
            <View style={[styles.container, elevations[5]]}>
                <View style={styles.infoContainer}>
                    <View style={[styles.ratingStars, { alignItems: "center" }]} >
                        <View style={[styles.imageContainer, elevations[5]]}>
                            <Image style={styles.image} source={{ uri: item.client.image }} />
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}> {item.client.name} </Text>
                            <Text style={styles.time}> {moment(item.created_at).fromNow()} </Text>
                        </View>
                    </View>

                    <View style={styles.numContainer}>
                        <Text style={styles.price}>{item.comment}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: 100,
        // borderRadius: 20,
        alignSelf: "center",
        backgroundColor: colors.whiteF7,
        // flexDirection: "row-reverse",
        elevation: 5,
        padding: 10
    },
    imageContainer: {
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: colors.mainColor,
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 40,
    },
    infoContainer: {
        flex: 1,
        // backgroundColor: "#e3e3e3",
        marginRight: 10,
    },
    name: {
        flex: 1,
        // backgroundColor: "red",
        fontFamily: fonts.tajawalB,
        fontSize: 12,
        textAlign: "center",
        textAlignVertical: "center",
        color: colors.mainColor,
    },
    nameContainer: {
        marginHorizontal: 10
    },
    time: {
        // backgroundColor: "red",
        fontFamily: fonts.tajawalR,
        fontSize: 10,
        color: colors.grey,
        marginTop: 5,
        textAlign: "right"
    },
    price: {
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        color: colors.ebony,
        textAlign: 'right',
        lineHeight: 18,
    },
    numContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    ratingStars: {
        flexDirection: "row-reverse",
        marginVertical: 10,
    },
})