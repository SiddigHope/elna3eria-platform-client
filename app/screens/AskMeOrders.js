import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OrdersList from '../components/askMeOrders/OrdersList';
import { getOrders, getAskMeOrders } from '../config/apis/gets';
import Header from '../config/header/Header';
import { colors } from '../config/vars';
import { goToScreen } from '../config/functions';
import { StatusBar } from 'expo-status-bar';
import CatList from '../components/categories-shared/CatList';
import { getServices } from '../config/data';

export default class AskMeOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            ordersCopy: [],
            serviceId: -1,
            catList: [],
        };
    }

    componentDidMount() {
        this.getData()
        const navigation = this.props.navigation
        navigation.addListener("focus", () => {
            if (this.state.serviceId != -1) {
                this.filterOrders(this.state.serviceId)
            } else {
                this.getData()
            }
        })
    }

    componentWillUnmount() {
        const navigation = this.props.navigation
        navigation.removeListener("focus")
    }


    getData = async () => {
        const orders = await getAskMeOrders()
        const catList = await getServices()
        this.setState({
            catList,
            orders,
            ordersCopy: orders,
        })
    }

    filterOrders = async (status) => {
        // console.log(this.state.orders)
        this.setState({
            orders: this.state.ordersCopy.filter((order) => order.status.code == status + 1),
            status,
        })
    }

    onOrderPressed = (order) => {
        goToScreen("OrderDetails", this.props.navigation, { order })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.whiteF7} />
                <Header
                    screen="orders"
                    title="طلباتي"
                    navigation={this.props.navigation}
                    closeSearching={() => console.log("closing")}
                    searching={false}
                    onChangeText={(text) => console.log(text)}
                />
                <CatList
                    selected={this.state.serviceId}
                    changeSelected={this.filterOrders}
                    data={this.state.catList}
                />

                <OrdersList
                    onPress={this.onOrderPressed}
                    orders={this.state.orders}
                    navigation={this.props.navigation}
                />
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