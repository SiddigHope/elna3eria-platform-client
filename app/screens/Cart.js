import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator, Pressable, Platform } from 'react-native';
import CartList from '../components/cart/CartList';
import { getCartItem, getCartTotal, goToScreen, removeAllCart, removeItemFromCart } from '../config/functions';
import { colors, fonts } from '../config/vars';
import Icon from "react-native-vector-icons/Ionicons"
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons"
import { StatusBar } from 'expo-status-bar';
import UserClass from '../config/authHandler';
import { checkout, onlinePayment } from '../config/apis/posts';
import OrderOptions from '../components/orders/OrderOptions';
import WebView from 'react-native-webview';
import MiniHeader from '../components/MiniHeader';
import GestureRecognizer from 'react-native-swipe-gestures';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            total: 0,
            ordering: false,
            orderPlaced: false,
            showModal: false,
            address: '',
            paying: false,
            payingLink: "",
            paymentMethod: "CASH",
            visible: true,
            pickup: false,
            loading: false
        };
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        if (this.props.route.params.oneItem) {
            // TODO calculating the total plus the delivery fees
            this.setState({
                items: [this.props.route.params.item],
                // total: this.props.route.params.item.total + this.props.route.params.store.delivery_fees,
                total: this.props.route.params.item.total,
            })
            return
        }
        this.setState({
            items: await getCartItem(this.props.route.params.store.id),
            total: await getCartTotal(this.props.route.params.store.id) + this.props.route.params.store.delivery_fees,
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
        // console.log(user)

        const details = []

        this.state.items.map(item => {
            var newItem = {
                product_id: item.id,
                quantity: item.quantity,
                comment: item.order_comment
            }
            details.push(newItem)
        })

        const checkoutObject = {
            store_id: this.props.route.params.store.id,
            client_id: user.client.id,
            address: this.state.address,
            payment_method: this.state.paymentMethod,
            pickup: this.state.pickup,
            details,
        }

        const done = await checkout(checkoutObject)
        if (done) {
            if (this.state.paymentMethod == "ONLINE") {
                console.log("done done done done")
                console.log(done)
                // return
                const toBePayed = await onlinePayment({ order_id: done.id })
                console.log("toBePayed")
                console.log(toBePayed.invoice_link)

                this.setState({
                    payingLink: toBePayed.invoice_link,
                    paying: true,
                    showModal: false
                })
            } else {
                console.log("done done done done")
                console.log(done)
            }

            if (!this.props.route.params.oneItem) {
                removeAllCart(this.props.route.params.store.id)
            }
            this.setState({ orderPlaced: true, ordering: false })
            setTimeout(() => {
                this.setState({
                    // ordering: false,
                    showModal: false,
                    items: [],
                    total: 0
                })
            }, 3000)
        } else {
            this.setState({
                ordering: false
            })
            console.log("order is not done")
        }
    }

    closeModal = () => {
        this.setState({ paying: false })
        // this._onRefresh()
    }

    hideSpinner() {
        this.setState({ visible: false });
    }

    setPickup = (pickup) => {
        this.setState({
            pickup: pickup == 2 ? true : false
        })
    }

    render() {
        // console.log(this.state.items)
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={colors.white} translucent={false} />
                <Modal
                    transparent={true}
                    onBackdropPress={this.closeModal}
                    onSwipeComplete={this.closeModal}
                    onRequestClose={this.closeModal}
                    visible={this.state.paying}
                    animationType="fade">
                    <View style={styles.modalPayContainer}>
                        <StatusBar translucent={false} backgroundColor={colors.myFatoraBlue} style="light" />
                        <View style={[styles.fakeHeader, Platform.OS === "ios" && { height: 80 }]}>
                            <Pressable onPress={this.closeModal} style={styles.closeModal}>
                                <Icon name="close" size={30} color={colors.ebony} />
                            </Pressable>
                        </View>
                        <WebView
                            onLoad={() => this.hideSpinner()}
                            style={{ flex: 1 }}
                            onTouchCancel={this.closeModal}
                            source={{ uri: this.state.payingLink }}
                        />
                        {this.state.visible && (
                            <ActivityIndicator
                                style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
                                size={50}
                                color={colors.myFatoraBlue}
                            />
                        )}
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    onBackdropPress={() => this.setState({ ordering: false })}
                    onSwipeComplete={() => this.setState({ ordering: false })}
                    onRequestClose={() => this.setState({ ordering: false })}
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
                <GestureRecognizer
                    // style={{ flex: 1 }}
                    onSwipeDown={() => this.setState({ showModal: false })}
                >
                    <Modal
                        transparent={true}
                        onBackdropPress={() => this.setState({ showModal: false })}
                        onSwipeComplete={() => this.setState({ showModal: false })}
                        onRequestClose={() => this.setState({ showModal: false })}
                        visible={this.state.showModal}
                        animationType="slide">
                        <View style={styles.modal}>
                            <OrderOptions
                                paymentMethod={this.state.paymentMethod}
                                setPaymentMethod={(paymentMethod) => this.setState({ paymentMethod })}
                                address={this.state.address}
                                setPickup={this.setPickup}
                                loading={this.state.ordering}
                                setAddress={(address) => this.setState({ address })}
                                onCheckout={this.checkout}
                                closeModal={() => this.setState({ showModal: false })}
                            />
                        </View>
                    </Modal>
                </GestureRecognizer>
                <MiniHeader right={"dkj"} title={"عربة التسوق"} navigation={this.props.navigation} />
                <CartList
                    oneItem={this.props.route.params.oneItem}
                    checkout={() => this.setState({ showModal: true })}
                    deleteItem={this.deleteItem} onPress={this.onCartItemPress}
                    total={this.state.total}
                    items={this.state.items}
                    refreshData={this.getData}
                    navigation={this.props.navigation}
                />
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
    fakeHeader: {
        width: "100%",
        height: 50,
        alignItems: "flex-start",
        justifyContent: 'flex-end',
        backgroundColor: colors.myFatoraBlue
    },
    modalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.blackTransparent,
        alignItems: "center",
        justifyContent: "center"
    },
    modal: {
        height: '100%',
        width: '100%',
        // backgroundColor: colors.blackTransparent,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    closeModal: {
        // left: 20,
        // top: 40,
        marginLeft: 20,
        backgroundColor: colors.white,
        // zIndex: 1111,
        elevation: 5,
        borderRadius: 20,
        padding: 5,
        marginBottom: 5

        // alignSelf: 'flex-start',
    },
    modalPayContainer: {
        height: '100%',
        width: '100%',
        // backgroundColor: colors.white,
        // alignItems: "center",
        // justifyContent: "center"
    },
})