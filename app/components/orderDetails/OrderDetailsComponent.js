import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import elevations from '../../config/elevations';
import { colors, fonts } from '../../config/vars';
import OrderFollowUp from './OrderFollowUp';


const { width, height } = Dimensions.get("window")

export const Hr = ({ props }) => (
    <View style={[styles.hr, props, elevations[1]]} />
)

export const Header = ({ order }) => (
    <>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: order.store.image }} />
        </View>
        <Text style={styles.storeName}> {order.store.name} </Text>
        <Hr props={{ top: -20, width: 100 }} />
    </>
)
export default class OrderDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        // console.log("this.props.order")
        // console.log(this.props.order)
        const order = this.props.order
        let online_paid = true
        if (order.payment_method == "ONLINE") {
            if (!order.online_paid_status) {
                online_paid = false
            }
        }
        return (
            <View style={styles.container}>
                <View style={styles.storeInfo}>
                    <View style={[styles.imageContainer, elevations[5]]}>
                        <Image style={styles.image} source={{ uri: this.props.order.store.image }} />
                    </View>
                    <Text style={styles.storeName}> {this.props.order.store.name} </Text>
                    <Hr props={{ top: -20, width: 100 }} />

                    <Text style={styles.label}> {"رقم الطلب"} </Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.orderId}> {this.props.order.id} </Text>
                        <Text style={styles.orderId}> {this.props.order.time} {"الوقت"} </Text>
                    </View>

                    <Hr props={{ marginTop: 5, marginBottom: 30 }} />

                    <Text style={styles.label}> {"موقع التسليم"} </Text>
                    <View style={styles.rowContainer}>
                        <View>
                            {/* <Text style={styles.address}> {"امدرمان - امبدة حارة  14"} </Text> */}
                            <Text style={styles.orderId}> {this.props.order.address} </Text>
                        </View>
                        <View style={styles.iconContainer} >
                            <Icon name="map-marker-radius" color={colors.blueLight} size={20} />
                        </View>
                    </View>

                    <Hr props={{ marginTop: 5, marginBottom: 30 }} />

                    <Text style={styles.label}> {"طريقة الدفع"} </Text>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.orderId, { fontSize: 14, textAlign: 'center', textAlignVertical: 'center' }]}> {"***** **** ****"} {"9232"} </Text>
                        <View style={[styles.iconContainer, { width: 40, height: 40 }]} >
                            <Image source={require("../../../assets/icons/pngegg.png")} style={{ width: 30, height: 30 }} />
                        </View>
                    </View>

                    <Hr props={{ marginTop: 5, marginBottom: 30 }} />

                    {online_paid ? (
                        <OrderFollowUp order={this.props.order} />
                    ) : (
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={this.props.continuePayment} style={styles.btn}>
                                {this.props.completing ? (
                                    <ActivityIndicator size="small" color={colors.white} />
                                ) : (
                                    <Text style={styles.btnText}> {"اكمل عملية الدفع"} </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    hr: {
        height: 0.5,
        width: "100%",
        backgroundColor: "#DFEAED",
        elevation: 1
    },
    container: {
        flex: 1,
        marginTop: 35,
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        minHeight: height
    },
    storeInfo: {
        alignItems: 'center',
        flex: 1,
    },
    imageContainer: {
        // position: "absolute",
        top: -30,
        // alignSelf: 'center',
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: colors.softWhite,
        elevation: 5,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 60
    },
    storeName: {
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.softBlack,
        top: -20
    },
    label: {
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        alignSelf: "flex-end",
        color: colors.softBlack,
        marginBottom: 5
    },
    rowContainer: {
        width: '100%',
        // backgroundColor: 'red',
        flexDirection: "row-reverse",
        justifyContent: "space-between"
    },
    orderId: {
        fontFamily: fonts.tajawalR,
        fontSize: 12,
        color: colors.grey,
        marginBottom: 5
    },
    address: {
        fontFamily: fonts.tajawalB,
        fontSize: 12,
        color: colors.grey,
        marginBottom: 5
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 5,
        backgroundColor: colors.softWhite,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        // backgroundColor: "red",
        flex: 0.4,
        width: "100%",
        justifyContent: "flex-end"
    },
    btn: {
        backgroundColor: colors.softBlue,
        justifyContent: 'center',
        width: "100%",
        height: 50,
        alignItems: 'center',
        borderRadius: 10,
        // marginTop: 50
    },
    btnText: {
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.softBlack
    }
})

