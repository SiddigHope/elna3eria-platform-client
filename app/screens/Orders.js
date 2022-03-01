import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OrdersList from '../components/orders/OrdersList';
import { getOrders } from '../config/apis/gets';
import Header from '../config/header/Header';
import { colors } from '../config/vars';
import { goToScreen } from '../config/functions';
import { StatusBar } from 'expo-status-bar';
import CatList from '../components/categories-shared/CatList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const statusCodes = [
    {
        code: 0,
        name: "طلب جديد",
        icon: <Icon name='moon-new' size={20} color={colors.mainColor} />
    },
    {
        code: 1,
        name: "يتم التحضير",
        icon: <Icon name='electron-framework' size={20} color={colors.ratingYellow} />
    },
    {
        code: 2,
        name: "في طريق التوصيل",
        icon: <Icon name='truck-delivery-outline' size={20} color={colors.softBlue} />
    },
    {
        code: 3,
        name: "تم التسليم",
        icon: <Icon name='check-circle-outline' size={20} color={colors.success} />
    },
    {
        code: 4,
        name: "ملغي",
        icon: <Icon name='power' size={20} color={colors.danger} />
    }
]

export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            ordersCopy: [],
            status: -1
        };
    }

    componentDidMount() {
        this.getData()
        const navigation = this.props.navigation
        navigation.addListener("focus", () => {
            if (this.state.status != -1) {
                this.filterOrders(this.state.status)
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
        const orders = await getOrders()
        this.setState({
            orders,
            ordersCopy: orders
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
                    closeSearching={() => console.log("closing")}
                    searching={false}
                    onChangeText={(text) => console.log(text)}
                />
                <CatList selected={this.state.status} changeSelected={this.filterOrders} data={statusCodes} />

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