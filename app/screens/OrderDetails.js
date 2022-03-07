import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView, Modal as OModal, Pressable } from 'react-native';
import MiniHeader from '../components/MiniHeader';
import OrderDetailsComponent from '../components/orderDetails/OrderDetailsComponent';
import { getOrder } from '../config/apis/gets';
import { colors } from '../config/vars';
import { WebView } from 'react-native-webview';
import { onlinePayment } from '../config/apis/posts';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Modal from "react-native-modal";
import RateProduct from '../components/orderDetails/RateProduct';
export default class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            order: this.props.route.params.order,
            paying: false,
            payingLink: "",
            rating: false
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
        const { order } = this.state

        const getOrder = await onlinePayment({ order_id: order.id })
        if (getOrder) {
            this.setState({
                payingLink: getOrder.invoice_link,
                paying: true,
            })
        }
    }

    closeModal = () => {
        this.setState({ paying: false, rating: false })
        this._onRefresh()
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
                        <Pressable onPress={this.closeModal} style={styles.closeModal}>
                            <Icon name="close-circle" size={25} color={colors.mainColor} />
                        </Pressable>
                        <WebView
                            style={{ flex: 1 }}
                            onTouchCancel={this.closeModal}
                            source={{ uri: this.state.payingLink }}
                        />
                    </View>
                </OModal>

                <Modal
                    transparent={true}
                    onBackdropPress={() => this.setState({ rating: false })}
                    onSwipeComplete={() => this.setState({ rating: false })}
                    onRequestClose={() => this.setState({ rating: false })}
                    visible={this.state.rating}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight">
                    <View style={styles.modalContainer}>
                        <RateProduct order={this.state.order} />
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
                    <OrderDetailsComponent continuePayment={this.continuePayment} order={this.state.order} />
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
    closeModal: {
        left: 20,
        top: 10,
        position: 'absolute',
        backgroundColor: colors.white,
        zIndex: 1111,
        elevation: 5,
        borderRadius: 20,
        padding: 5
        // alignSelf: 'flex-start',
    },
    modalContainer: {
        height: '100%',
        width: '100%',

        // backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center"
    },
})
