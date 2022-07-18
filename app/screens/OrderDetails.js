import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView, Modal as OModal, Pressable, Dimensions, ActivityIndicator, Platform } from 'react-native';
import MiniHeader from '../components/MiniHeader';
import OrderDetailsComponent from '../components/orderDetails/OrderDetailsComponent';
import { getOrder } from '../config/apis/gets';
import { colors } from '../config/vars';
import { WebView } from 'react-native-webview';
import { checkout, onlinePayment } from '../config/apis/posts';
import Icon from "react-native-vector-icons/Ionicons"
import Modal from "react-native-modal";
import RateProduct from '../components/orderDetails/RateProduct';

const { width, height } = Dimensions.get("window")

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            order: this.props.route.params.order,
            paying: false,
            payingLink: "",
            rating: false,
            completing: false,
            visible: true
        };
    }

    componentDidMount() {
        const order = this.props.route.params.order
        if (order) {
            // console.log("*******************order******************88")
            // console.log(order)
            if (order.status.code == 4) {
                this.setState({
                    rating: true
                })
            }
        }
    }

    _onRefresh = async () => {
        console.log("refreshing***********************************")
        this.setState({ refreshing: true });
        const order = await getOrder(this.state.order.id)
        this.setState({
            order,
        })
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 2000)
    }

    continuePayment = async () => {
        let { order } = this.state
        const getOrder = await onlinePayment({ order_id: order.id })
        if (getOrder) {
            this.setState({
                payingLink: getOrder.invoice_link,
                completing: true
            })
            setTimeout(() => {
                this.setState({
                    paying: true,
                    completing: false
                })
            }, 1000)
        }
    }

    closeModal = () => {
        this.setState({ paying: false, rating: false })
        this._onRefresh()
    }


    hideSpinner() {
        this.setState({ visible: false });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.mainColor} style="light" />
                <MiniHeader navigation={this.props.navigation} title={"تفاصيل الطلب"} />
                <OModal
                    transparent={true}
                    onBackdropPress={this.closeModal}
                    onSwipeComplete={this.closeModal}
                    onRequestClose={this.closeModal}
                    visible={this.state.paying}
                    animationType="fade">
                    <View style={styles.modalContainer}>
                        <StatusBar translucent={false} backgroundColor={colors.myFatoraBlue} style="light" />

                        <View style={[styles.fakeHeader, Platform.OS === "ios" && { height: 80 }]}>
                            <Pressable onPress={this.closeModal} style={styles.closeModal}>
                                <Icon name="close" size={25} color={colors.ebony} />
                            </Pressable>
                        </View>
                        <WebView
                            onLoad={() => this.hideSpinner()}
                            style={{ width, height, backgroundColor: colors.white }}
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
                </OModal>

                <Modal
                    transparent={true}
                    onBackdropPress={this.closeModal}
                    onSwipeComplete={this.closeModal}
                    onRequestClose={this.closeModal}
                    visible={this.state.rating}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight">
                    <View style={styles.modalContainer}>
                        <RateProduct
                            screen={"order"}
                            order={this.state.order}
                            closeModal={this.closeModal}
                        />
                    </View>
                </Modal>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._onRefresh()}
                            colors={[colors.mainColor, colors.blueLight]}
                            enabled={true}
                        />
                    }
                    showsVerticalScrollIndicator={false}>
                    <OrderDetailsComponent
                        navigation={this.props.navigation}
                        openRating={() => this.setState({ rating: true })}
                        completing={this.state.completing}
                        continuePayment={this.continuePayment}
                        order={this.state.order}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainColor
    },
    fakeHeader: {
        width: "100%",
        height: 50,
        alignItems: "flex-start",
        justifyContent: 'flex-end',
        backgroundColor: colors.myFatoraBlue
    },
    closeModal: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        backgroundColor: colors.white,
        elevation: 5,
        borderRadius: 20,
        marginBottom: 5
    },
    modalContainer: {
        height: '100%',
        width: '100%',
        // backgroundColor: colors.blackTransparent2,
        alignItems: "center",
        justifyContent: "center"
    },
})
