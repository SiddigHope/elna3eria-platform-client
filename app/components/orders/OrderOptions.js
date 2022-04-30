import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import elevations from '../../config/elevations';
import { colors, fonts } from '../../config/vars';
import RadioButtonComponent from './RadioButtonComponent';
import RadioButtonRN from "radio-buttons-react-native";
import Icon1 from "react-native-vector-icons/FontAwesome";

const branch = [
    {
        label: "الدفع كاش عند الاستلام",
        value: "CASH",
    },
    {
        label: "**** **** **** 1234",
        value: "ONLINE",
    },
];

const delivery = [
    {
        label: "توصيل",
        value: "1",
    },
    {
        label: "من المحل",
        value: "2",
    },
];

export default class OrderOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: "1"
        };
    }

    payment = () => {
        const { payment, address } = this.state
        if (address) {
            this.props.setPaymentOptions()
        }
    }

    deliverySelected = (delivery) => {
        // console.log(delivery.value)
        var selected = delivery.value
        this.setState({
            delivery: selected
        })

        this.props.setPickup(selected)
    }

    render() {
        return (
            <View style={[styles.container, elevations[10]]}>
                <Pressable onPress={this.props.closeModal} style={styles.closeModal}>
                    <Icon name="close-circle" size={25} color={colors.mainColor} />
                </Pressable>

                <RadioButtonRN
                    selectedBtn={this.deliverySelected}
                    style={{ flexDirection: "row-reverse", marginBottom: 20, width: '93%', }}
                    boxStyle={styles.boxStyle}
                    textStyle={styles.boxText}
                    initial={Number(this.state.delivery)}
                    data={delivery}
                    icon={<Icon1 name="check-circle" size={25} color={colors.blueLight} />}
                />

                {this.state.delivery == 1 && (
                    <View style={[styles.textContainer, elevations[5]]}>
                        {/* <View style={styles.iconContainer} > */}
                        <Icon name="map-marker-radius" color={colors.blueLight} size={20} />
                        {/* </View> */}
                        <TextInput
                            style={styles.textInput}
                            value={this.props.address}
                            placeholder="ادخل عنوانك للاستلام"
                            placeholderTextColor={colors.grey}
                            onChangeText={(text) => this.props.setAddress(text)}
                        />
                    </View>
                )}



                {branch.map(item => (
                    <RadioButtonComponent key={item.id} item={item} selected={this.props.paymentMethod} setSelected={this.props.setPaymentMethod} />
                ))}

                <Pressable onPress={this.props.onCheckout} style={[styles.btn, elevations[10]]}>
                    <Text style={styles.btnText}> {"دفع"} </Text>
                </Pressable>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingTop: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: colors.white,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    textContainer: {
        paddingHorizontal: 20,
        height: 70,
        width: "90%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.whiteF7,
        elevation: 5,
        borderRadius: 10,
        marginBottom: 20
    },
    textInput: {
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        color: colors.softBlack,
        textAlign: 'right',
        flex: 1,
        marginLeft: 10,
    },
    btn: {
        backgroundColor: colors.mainColor,
        width: '90%',
        height: 60,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        elevation: 10,
        marginVertical: 20,
    },
    btnText: {
        fontFamily: 'Tajawal-Bold',
        fontSize: 16,
        color: colors.white,
    },
    closeModal: {
        left: 20,
        top: 10,
        position: 'absolute',
        // alignSelf: 'flex-start',
    },
    boxStyle: {
        flex: 1,
        height: 50,
        margin: 0,
        borderColor: colors.borderColor,
        backgroundColor: colors.whiteF7,
        flexDirection: "row-reverse",
        // alignItems: 'center',
        borderBottomWidth: 0,
        borderRadius: 10,
        marginBottom: 5,
        elevation: 1,
        borderBottomColor: "#4444",
        marginHorizontal: 5,
    },
    boxText: {
        marginHorizontal: 3,
        fontFamily: fonts.tajawalR,
        // backgroundColor: "red"
    }
})