import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OrdersList from '../components/orders/OrdersList';
import { getOrders } from '../config/apis/gets';
import Header from '../config/header/Header';
import { colors } from '../config/vars';
import { goToScreen } from '../config/functions';

export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        this.setState({
            orders: await getOrders()
        })
    }

    onOrderPressed = (order) => {
        goToScreen("OrderDetails", this.props.navigation, { order })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    screen="orders"
                    title="طلباتي"
                    closeSearching={() => console.log("closing")}
                    searching={false}
                    onChangeText={(text) => console.log(text)}
                />
                <OrdersList onPress={this.onOrderPressed} orders={this.state.orders} navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteF7,
    }
})