import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OrdersList from '../components/doctorAppointments/OrdersList';
import { getOrders, getAskMeOrders, getMyDoctorAppointments } from '../config/apis/gets';
import Header from '../config/header/Header';
import { colors } from '../config/vars';
import { goToScreen } from '../config/functions';
import { StatusBar } from 'expo-status-bar';
import CatList from '../components/categories-shared/CatList';

export default class DoctorAppointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            appointmentsCopy: [],
            serviceId: -1,
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
        const appointments = await getMyDoctorAppointments()
        this.setState({
            appointments,
            appointmentsCopy: appointments,
        })
    }

    onOrderPressed = (order) => {
        goToScreen("OrderDetails", this.props.navigation, { order })
    }

    render() {
        console.log(this.props.route.params.store)
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.whiteF7} />
                <Header
                    screen="orders"
                    title="حجوزاتي"
                    closeSearching={() => console.log("closing")}
                    searching={false}
                    navigation={this.props.navigation}
                    onChangeText={(text) => console.log(text)}
                />

                <OrdersList
                    onPress={this.onOrderPressed}
                    orders={this.state.appointments}
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