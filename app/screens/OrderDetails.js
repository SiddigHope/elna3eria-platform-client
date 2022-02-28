import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView, Modal } from 'react-native';
import MiniHeader from '../components/MiniHeader';
import OrderDetailsComponent from '../components/orderDetails/OrderDetailsComponent';
import { getOrder } from '../config/apis/gets';
import { colors } from '../config/vars';
import { WebView } from 'react-native-webview';
import { onlinePayment } from '../config/apis/posts';

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            order: this.props.route.params.order,
            paying: false,
            payingLink: ""
        };
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
        this.setState({ paying: false })
        this._onRefresh()
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.mainColor} style="light" />
                <MiniHeader navigation={this.props.navigation} title={"تفاصيل الطلب"} />
                <Modal
                    transparent={true}
                    onBackdropPress={this.closeModal}
                    onSwipeComplete={this.closeModal}
                    onRequestClose={this.closeModal}
                    visible={this.state.paying}
                    animationType="fade">
                    {/* <View style={styles.modalContainer}> */}
                    <WebView
                        style={styles.container}
                        onTouchCancel={this.closeModal}
                        source={{ uri: this.state.payingLink }}
                    />
                    {/* </View> */}
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
    }
})
