import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CartList from '../components/cart/CartList';
import { getCartItem, getCartTotal, goToScreen, removeItemFromCart } from '../config/functions';
import { colors, fonts } from '../config/vars';
import Icon from "react-native-vector-icons/Ionicons"
import { StatusBar } from 'expo-status-bar';
import UserClass from '../config/authHandler';
export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            total: 0
        };
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        this.setState({
            items: await getCartItem(this.props.route.params.store.id),
            total: await getCartTotal(this.props.route.params.store.id),
        })
    }

    onCartItemPress = (product) => {
        const params = {
            product,
            store: this.props.route.params.store
        }
        goToScreen("ProductDetails", this.props.navigation, params)
    }

    deleteItem = (order_id) => {
        removeItemFromCart(order_id, this.props.route.params.store.id)
        this.getData()
    }

    checkout = async () => {
        const user = await UserClass.getUser()
        console.log(user)

        // const checkoutObject = {

        // }
    }

    render() {
        // console.log(this.state.items)
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={colors.white} translucent={false} />
                <View style={styles.header}>
                    <Icon onPress={() => this.props.navigation.goBack()} style={{ flex: 1 }} name="arrow-back-outline" size={35} color={colors.softBlack} />
                    <Text style={styles.title}> {"عربة التسوق"} </Text>
                    <Text style={styles.emptyText}> {""} </Text>
                </View>
                <CartList deleteItem={this.deleteItem} onPress={this.onCartItemPress} total={this.state.total} items={this.state.items} refreshData={this.getData} navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        width: "100%",
        flexDirection: 'row',
        height: 70,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    title: {
        flex: 1,
        fontFamily: fonts.tajawalB,
        fontSize: 18,
        color: colors.softBlack
    },
    emptyText: {
        flex: 1,
    }
})