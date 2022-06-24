import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Pressable, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import elevations from '../../config/elevations';
import { colors, fonts } from './../../config/vars';
import Icon2 from "react-native-vector-icons/MaterialIcons";
import moment from 'moment';

const { width, height } = Dimensions.get("window")

export default class MyReviewsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            star1: "star-outline",
            star2: "star-outline",
            star3: "star-outline",
            star4: "star-outline",
            star5: "star-outline",
        };
    }
    componentDidMount() {
        if (this.props.item) {
            this.checkRating(this.props.item.rating)
        }
    }


    checkRating = (rating) => {
        switch (rating) {
            case 1:
                this.setState({
                    star1: "star"
                })
                break;
            case 2:
                this.setState({
                    star1: "star",
                    star2: "star",
                })
                break;
            case 3:
                this.setState({
                    star1: "star",
                    star2: "star",
                    star3: "star",
                })
                break;
            case 4:
                this.setState({
                    star1: "star",
                    star2: "star",
                    star3: "star",
                    star4: "star",
                })
                break;
            case 5:
                this.setState({
                    star1: "star",
                    star2: "star",
                    star3: "star",
                    star4: "star",
                    star5: "star",
                })
                break;

            default:
                break;
        }
    }

    goToDetails = () => {
        const item = this.props.item
        this.props.onPress(item)
    }


    render() {
        const item = this.props.item
        console.log("item")
        console.log(item)
        return (
            <View style={[styles.container, elevations[5]]}>
                <View style={styles.infoContainer}>
                    <View style={[styles.ratingStars, { alignItems: "center" }]} >
                        <Pressable onPress={this.goToDetails} style={[styles.imageContainer, elevations[5]]}>
                            <Image style={styles.image} source={{ uri: item.product.image }} />
                        </Pressable>
                        <View style={styles.textContainer}>
                            <Text style={styles.productName}> {item.product.name} </Text>
                            <Text style={styles.storeName}> {item.product.store.name} </Text>
                        </View>
                    </View>

                    <View style={styles.numContainer}>
                        <Text style={styles.price}>{item.review}</Text>
                        <View style={styles.ratingStars}>
                            <Icon2 name={this.state.star1} color={colors.ratingYellow} size={25} />
                            <Icon2 name={this.state.star2} color={colors.ratingYellow} size={25} />
                            <Icon2 name={this.state.star3} color={colors.ratingYellow} size={25} />
                            <Icon2 name={this.state.star4} color={colors.ratingYellow} size={25} />
                            <Icon2 name={this.state.star5} color={colors.ratingYellow} size={25} />
                        </View>
                    </View>

                    <Text style={styles.time}> {moment(item.created_at).fromNow()} </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        minHeight: 100,
        borderRadius: 20,
        backgroundColor: colors.whiteF7,
        flexDirection: "row-reverse",
        elevation: 5,
        padding: 10
    },
    imageContainer: {
        height: 80,
        width: 80,
        borderRadius: 10,
        backgroundColor: colors.mainColor,
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    infoContainer: {
        flex: 1,
        // backgroundColor: "#e3e3e3",
        marginRight: 10,
    },
    textContainer: {
        marginHorizontal: 10,
        alignItems: 'flex-end'
    },
    productName: {
        // backgroundColor: "red",
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        textAlignVertical: "center",
        color: colors.softBlack,
    },
    storeName: {
        // backgroundColor: "red",
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        textAlignVertical: "center",
        color: colors.grey,
    },
    time: {
        // backgroundColor: "red",
        fontFamily: fonts.tajawalR,
        fontSize: 10,
        color: colors.grey,
    },
    price: {
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        color: colors.ebony,
        textAlign: 'auto',
        lineHeight: 18,
    },
    numContainer: {
        flex: 1,
        // backgroundColor: "blue",
        // justifyContent: "space-between",
        marginHorizontal: 10,
        alignItems: 'center'
    },
    ratingStars: {
        flexDirection: "row-reverse",
        marginVertical: 10
    },
})