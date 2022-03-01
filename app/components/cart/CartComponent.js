import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Pressable, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import elevations from '../../config/elevations';
import { colors, fonts } from '../../config/vars';


const { width, height } = Dimensions.get("window")

export default class CartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    deleteItem = () => {
        Alert.alert(
            'حذف المنتج',
            'هل انت متاكد بأنك تريد حذف هذا المنتج من السلة؟',
            [
                {
                    text: 'لا',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'نعم', onPress: () => this.props.deleteItem(this.props.item.item.order_id) },
            ],
            { cancelable: false },
        );
    }

    render() {
        const item = this.props.item.item
        // console.log(item)
        return (
            <View style={[styles.container, elevations[5]]}>
                <TouchableOpacity onPress={this.deleteItem} style={[styles.deleteItem, elevations[5]]}>
                    <Icon name="trash-can-outline" size={20} color={colors.danger} />
                </TouchableOpacity>
                <Pressable onPress={() => this.props.onPress(item)} style={[styles.imageContainer, elevations[5]]}>
                    <Image style={styles.image} source={{ uri: item.image }} />
                </Pressable>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}> {item.name} </Text>
                    <View style={styles.numContainer}>
                        <Text style={styles.price}>  {item.price} {"ريال"} </Text>
                        <Text style={styles.quantity}> {"عدد: "} {item.quantity}  </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 100,
        borderRadius: 20,
        backgroundColor: colors.white,
        flexDirection: "row-reverse",
        elevation: 5,
        padding: 10
    },
    imageContainer: {
        height: 80,
        width: 80,
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
        fontSize: 14,
        textAlign: "right",
        textAlignVertical: "center",
        color: colors.softBlack,
    },
    price: {
        fontFamily: fonts.tajawalB,
        fontSize: 14,
        color: colors.softGreen,
    },
    quantity: {
        fontFamily: fonts.tajawalB,
        fontSize: 14,
        color: colors.grey,
    },
    numContainer: {
        flex: 1,
        // backgroundColor: "blue",
        flexDirection: 'row-reverse',
        justifyContent: "space-between",
        marginRight: 30,
        alignItems: 'center'
    },
    deleteItem: {
        height: 30,
        width: 30,
        position: "absolute",
        top: 10,
        right: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        zIndex: 111,
        backgroundColor: colors.white
    }
})