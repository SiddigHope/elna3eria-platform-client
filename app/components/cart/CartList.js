import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fonts } from '../../config/vars';
import CartComponent from './CartComponent';
import { goToScreen, removeItemFromCart } from '../../config/functions';
import elevations from '../../config/elevations';

export default class CartList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            total: this.props.total
        };
    }

    componentDidMount() {
        const navigation = this.props.navigation
        navigation.addListener("focus", () => {
            this.props.refreshData()
        })
    }

    componentWillUnmount() {
        const navigation = this.props.navigation
        navigation.removeListener("focus")
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.items.length != nextProps.items.length) {
            this.setState({
                items: nextProps.items,
                total: nextProps.total
            })
        }
    }

    _itemSeparator = () => (
        <View style={{ height: 10 }} />
    )

    _listHeader = () => (
        <View style={{ height: 20 }} />
    )

    _listFooter = () => (
        <View style={{ height: 120 }} />
    )

    _renderItem = (item, index) => (
        <CartComponent deleteItem={this.props.deleteItem} onPress={this.props.onPress} item={item} index={index} />
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.items}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this._listHeader}
                    style={{ width: "100%" }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    ListFooterComponent={this._listFooter}
                    ItemSeparatorComponent={this._itemSeparator}
                    renderItem={this._renderItem}
                />
                <View style={[styles.checkoutContainer,elevations[10]]}>
                    <Pressable onPress={this.props.checkout} style={[styles.btn,elevations[5]]}>
                        <Icon name="logout" size={20} color={colors.white} />
                        <Text style={styles.btnText}> {"الدفع"} </Text>
                    </Pressable>

                    <Text style={styles.total}> {"SR"} {this.state.total} <Text style={styles.totalText}> {"الاجمالي"} </Text> </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white
    },
    checkoutContainer: {
        backgroundColor: colors.white,
        position: 'absolute',
        bottom: 0,
        width: "100%",
        flexDirection: 'row-reverse',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 10,
        justifyContent: "space-between",
        alignItems: 'center',
        height: 100,
        paddingHorizontal: 20
    },
    btn: {
        backgroundColor: colors.mainColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: 100,
        height: 40,
        borderRadius: 30,
        flexDirection: 'row',
        elevation: 5,
    },
    btnText: {
        fontFamily: fonts.tajawalR,
        color: colors.white,
        fontSize: 16,
    },
    totalText: {
        fontFamily: fonts.tajawalR,
        color: colors.grey,
        fontSize: 14
    },
    total: {
        fontFamily: fonts.tajawalb,
        color: colors.softGreen,
        fontSize: 14
    }
})