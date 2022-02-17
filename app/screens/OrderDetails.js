import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MiniHeader from '../components/MiniHeader';
import OrderDetailsComponent from '../components/orderDetails/OrderDetailsComponent';
import { colors } from '../config/vars';

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.mainColor} style="light" />
                <MiniHeader navigation={this.props.navigation} title={"تفاصيل الطلب"} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <OrderDetailsComponent order={this.props.route.params.order} />
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
