import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import CartList from '../components/cart/CartList';
import { getCartItem, getCartTotal, goToScreen, removeAllCart, removeItemFromCart } from '../config/functions';
import { colors, fonts } from '../config/vars';
import Icon from "react-native-vector-icons/Ionicons"
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons"
import { StatusBar } from 'expo-status-bar';
import UserClass from '../config/authHandler';
import { checkout } from '../config/apis/posts';
export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            total: 0,
            ordering: false,
            orderPlaced: false
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
        this.setState({
            ordering: true
        })
        const user = await UserClass.getUser()
        console.log(user)

        const details = []

        this.state.items.map(item => {
            var newItem = {
                product_id: item.id,
                quantity: item.quantity
            }
            details.push(newItem)
        })

        const checkoutObject = {
            store_id: this.props.route.params.store.id,
            client_id: user.client.id,
            details,
        }

        const done = await checkout(checkoutObject)
        if (done) {
            removeAllCart(this.props.route.params.store.id)
            this.setState({ orderPlaced: true })
            setTimeout(() => {
                this.setState({
                    ordering: false
                })
            },3000)
        } else {
            this.setState({
                ordering: false
            })
        }

    }

    render() {
        // console.log(this.state.items)
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={colors.white} translucent={false} />
                <Modal
                    transparent={true}
                    onBackdropPress={() => this.setState({ showModal: false })}
                    onSwipeComplete={() => this.setState({ showModal: false })}
                    onRequestClose={() => this.setState({ showModal: false })}
                    visible={this.state.ordering}
                    animationType="fade">
                    <View style={styles.modalContainer}>
                        {/* <View style={styles.modal}> */}
                        {this.state.orderPlaced ? (
                            <Icon2 name="check-circle-outline" size={80} color={colors.softGreen} />
                        ) : (
                            <ActivityIndicator size={80} color={colors.mainColor} />
                        )}
                        {/* </View> */}
                    </View>
                </Modal>
                <View style={styles.header}>
                    <Icon onPress={() => this.props.navigation.goBack()} style={{ flex: 1 }} name="arrow-back-outline" size={35} color={colors.softBlack} />
                    <Text style={styles.title}> {"عربة التسوق"} </Text>
                    <Text style={styles.emptyText}> {""} </Text>
                </View>
                <CartList checkout={this.checkout} deleteItem={this.deleteItem} onPress={this.onCartItemPress} total={this.state.total} items={this.state.items} refreshData={this.getData} navigation={this.props.navigation} />
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
    },
    modalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.blackTransparent,
        alignItems: "center",
        justifyContent: "center"
    },
    // modal: {
    //     backgroundColor: colors.white,
    //     // height: '50%',
    //     width: '100%',
    //     borderTopRightRadius: 30,
    //     borderTopLeftRadius: 30,
    //     paddingTop: 20
    // },
})