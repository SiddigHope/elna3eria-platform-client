import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fonts } from '../../config/vars';
import RadioButtonComponent from './RadioButtonComponent';


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

export default class OrderOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    payment = () => {
        const { payment, address } = this.state
        if (address) {
            this.props.setPaymentOptions()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Pressable onPress={this.props.closeModal} style={styles.closeModal}>
                    <Icon name="close-circle" size={25} color={colors.mainColor} />
                </Pressable>
                <View style={styles.textContainer}>
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

                {branch.map(item => (
                    <RadioButtonComponent item={item} selected={this.props.paymentMethod} setSelected={this.props.setPaymentMethod} />
                ))}

                <Pressable onPress={this.props.onCheckout} style={styles.btn}>
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
    }
})