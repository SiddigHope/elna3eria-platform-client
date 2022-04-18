import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, Image, TextInput } from 'react-native';
import { colors, fonts } from '../../config/vars';
import GestureRecognizer from "react-native-swipe-gestures";
import { elevations } from '../../config/elevations';
import OrderButton from '../product/OrderButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class AskMeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desc: "",
            phone: 0
        };
    }

    orderService = () => {
        const { desc, phone } = this.state
        if (desc, phone) {
            const data = {
                description: desc,
                contact_number: phone,
            }
            this.props.orderService(data)
        }
    }

    render() {
        const service = this.props.service
        console.log("service")
        console.log(service)
        return (
            <GestureRecognizer
                onSwipeDown={this.props.toggleModal}
            >
                <Modal
                    transparent={true}
                    onBackdropPress={this.props.toggleModal}
                    onSwipeComplete={this.props.toggleModal}
                    onRequestClose={this.props.toggleModal}
                    visible={this.props.showModal}
                    animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <View style={styles.topBar} />

                            <KeyboardAwareScrollView>
                                <View style={styles.contentContainer}>
                                    <View style={styles.container}>
                                        <View style={styles.imageContainer}>
                                            <Image style={styles.image} source={{ uri: service.image }} />
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.title}> {service.title} </Text>
                                            <Text style={styles.desc}> {service.description} </Text>
                                        </View>
                                    </View>

                                    <View style={[styles.textInputContainer, { borderRadius: 10, marginBottom: 0, }]}>
                                        <TextInput
                                            keyboardType='phone-pad'
                                            style={[styles.textInput, { height: 50, padding: 10 }]}
                                            value={this.state.phone}
                                            placeholder={"رقم هاتف للتواصل"}
                                            placeholderTextColor="#515C6F"
                                            onChangeText={(phone) => this.setState({ phone })}
                                        />
                                    </View>
                                    <View style={styles.textInputContainer}>
                                        <TextInput
                                            style={styles.textInput}
                                            value={this.state.desc}
                                            multiline
                                            placeholder={"أكتب تفاصيل الخدمة المطلوبة هنا..."}
                                            placeholderTextColor="#515C6F"
                                            onChangeText={(desc) => this.setState({ desc })}
                                        />
                                    </View>
                                </View>
                            </KeyboardAwareScrollView>

                            <OrderButton width={"90%"} type={"toggler"} title={"أرسل طلبك"} onPress={this.orderService} item={this.props.doctor} />

                        </View>
                    </View>
                </Modal>
            </GestureRecognizer>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        // height: 20,
        width: "100%",
        flexDirection: 'row-reverse',
        // backgroundColor: colors.borderColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        borderBottomColor: colors.borderColor,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: colors.whiteF7,
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 80,
    },
    textContainer: {
        flex: 1,
        // backgroundColor: "red",
        alignItems: 'flex-end',
    },
    title: {
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.mainColor,
        elevation: 10,
        textAlign: 'right',
        marginRight: 5,
    },
    desc: {
        // marginTop: 5,
        fontFamily: fonts.tajawalR,
        fontSize: 12,
        color: colors.grey,
        // elevation: 10,
        lineHeight: 20,
        textAlign: 'right',
        marginRight: 10,
    },
    modalContainer: {
        height: '100%',
        width: '100%',
        // backgroundColor: colors.blackTransparent,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    modal: {
        backgroundColor: colors.white,
        minHeight: '60%',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingTop: 20,
        elevation: 10,
    },
    topBar: {
        width: "50%",
        height: 2,
        backgroundColor: colors.borderColor,
        alignSelf: 'center',
        borderRadius: 10,
    },
    contentContainer: {
        // backgroundColor: "red",
        flex: 1,
        marginVertical: 20,
        width: "90%",
        alignSelf: 'center',
        justifyContent: 'center'
    },
    textInputContainer: {
        backgroundColor: "#F0F1F3",
        width: "100%",
        alignSelf: "center",
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 20
    },
    textInput: {
        width: "100%",
        height: 150,
        textAlign: "right",
        color: "#515C6F",
        padding: 20,
        fontSize: 14,
        fontFamily: "Tajawal-Regular",
        textAlignVertical: "top",
        // backgroundColor: "red",
    },
})