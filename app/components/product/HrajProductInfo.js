import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    Modal,
    ScrollView,
    Image,
    Pressable,
    Linking,
    TouchableOpacity
} from "react-native";
import { colors, fonts } from "../../config/vars";
import OrderButton from "./OrderButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from 'react-native-vector-icons/Ionicons';

import { addToCart, removeItemFromCart } from "../../config/functions";
import elevations from "../../config/elevations";

const { width, height } = Dimensions.get("window");

export default class HrajProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            productCount: 1,
            orderText: '',
            edit: false,
            adding: false,
            added: false,
            discount: false,
        };
    }

    componentDidMount() {
        if (this.props.screen == "discount") {
            this.setState({
                discount: true
            })
        }
        if (this.props.product.rating) {
            this.checkRating(this.props.product.rating.average)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.product.order_id) {
            this.setState({
                productCount: nextProps.product.quantity,
                orderText: nextProps.product.order_comment,
                edit: true
            })
        }
    }

    whatsapp = () => {
        const link = "https://wa.me/249920035753"
        Linking.canOpenURL(link)
            .then(supported => {
                if (!supported) {
                    Alert.alert(
                        'قم بتنزيل تطبيق الواتساب للمراسلة الفورية او بامكانك استحدام حاصية الاتصال المباشر'
                    );
                } else {
                    return Linking.openURL(link);
                }
            })
            .catch(err => console.error('An error occurred', err));

    }


    phoneCall = () => {
        const link = "tel:" + this.props.product.contact_number
        Linking.openURL(link)
    }

    render() {
        const { product } = this.props
        let price = product.price
        if (this.state.discount) {
            let discountValue = (product.price * product.discount) / 100
            price -= discountValue
        }

        return (
            <View style={[styles.container, elevations[10]]}>
                <View style={styles.infoContainer}>
                    <View style={styles.headerInfo}>
                        <View style={styles.miniRow}>
                            <Text style={styles.price}>
                                {"SR"} {price}
                            </Text>
                            {this.state.discount && (
                                <View style={styles.discountContainer}>
                                    <Text style={styles.discountPrice}>
                                        {"SR"} {this.props.product.price}
                                    </Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.name}> {this.props.product.title} </Text>
                    </View>
                    <ScrollView>
                        <Text style={styles.desc}> {this.props.product.description} </Text>
                        <View style={styles.miniRow}>
                            <TouchableOpacity onPress={this.whatsapp} style={[styles.iconContainer, elevations[5], { marginLeft: 10, marginRight: 5 }]}>
                                <Icon3 name="chatbox-ellipses" size={20} color={colors.mainColor} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.phoneCall} style={[styles.iconContainer, elevations[5]]}>
                                <Icon2 name="phone-in-talk" size={20} color={colors.mainColor} />
                            </TouchableOpacity>
                        </View>
                        {/* <OrderButton screen={this.props.screen} type={"toggler"} adding={this.state.adding} added={this.state.added} title={"اطلب الأن"} onPress={this.onButtonPress} item={this.props.product} /> */}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width,
        // borderTopLeftRadius: 80,
        height: (height * 50) / 100,
        backgroundColor: colors.white,
        bottom: 0,
        elevation: 10,
        padding: 20,
        paddingTop: 50,
    },
    name: {
        fontFamily: "Tajawal-Bold",
        fontSize: 20,
        color: colors.softBlack,
    },
    price: {
        fontFamily: "Tajawal-Bold",
        color: colors.softGreen,
        fontSize: 24,
        textAlign: "right",
        marginBottom: 10,
    },
    desc: {
        fontFamily: "Tajawal-Regular",
        fontSize: 18,
        textAlign: "right",
        color: colors.softBlack,
        marginVertical: 10,
    },
    qtyContainer: {
        flex: 1,
        alignItems: "center",
        // backgroundColor: 'blue',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    qtyText: {
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        color: colors.grey,
        textAlign: "right"
    },
    iconContainer: {
        backgroundColor: colors.whiteF7,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        margin: 20,
        borderRadius: 50
    },
    infoContainer: {
        // backgroundColor: "#e3e3e3",
        // flex: 1,
    },
    headerInfo: {
        // backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    miniRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
