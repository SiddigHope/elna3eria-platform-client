import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/askMe/header/Header";
import { colors } from "../config/vars";
import AskMeComponent from '../components/askMe/AskMeComponent';
import { getServices } from "../config/data";
import AskMeModal from '../components/askMe/AskMeModal';
import { orderService } from "../config/apis/posts";
import { goToScreen } from '../config/functions';

export default class StoreProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            service: {},
            showModal: false
        };
    }

    componentDidMount() {
        this.getServices()
    }

    getServices = async () => {
        this.setState({
            services: await getServices()
        })
    }

    _listHeader = () => (
        <Header
            gotoOrders={() => goToScreen("AskMeOrders", this.props.navigation)}
            navigation={this.props.navigation} />
    );

    _renderItem = (item, index) => (
        <AskMeComponent
            setService={(service) => this.setState({ service, showModal: true })}
            item={item}
            index={index}
            navigation={this.props.navigation}
        />
    );

    _listFooter = () => (
        <View style={{ height: 40 }} />
    );


    _itemSeparator = () => (
        <View style={{ height: 30 }} />
    );

    orderService = async (data) => {
        const { service } = this.state

        const order = await orderService({ ...data, service_id: service.id })
        if (order) {
            this.toggleModal()
            console.log("order placed")
        } else {
            console.log("order not placed")
        }
    }

    toggleModal = () => this.setState({ showModal: !this.state.showModal })

    render() {
        return (
            <View style={styles.container}>

                <AskMeModal
                    orderService={this.orderService}
                    service={this.state.service}
                    showModal={this.state.showModal}
                    toggleModal={this.toggleModal}
                />

                <FlatList
                    data={this.state.services}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={this._listFooter}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={this._itemSeparator}
                    ListHeaderComponent={this._listHeader}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteF7,
    },
});
