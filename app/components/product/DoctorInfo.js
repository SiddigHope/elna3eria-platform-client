import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, Linking } from 'react-native';
import { colors, fonts } from '../../config/vars';
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Feather";
import OrderButton from './OrderButton';
import DoctorAppointmentComponent from './DoctorAppointmentComponent';
import DoctorAppointmentModal from './DoctorAppointmentModal';
import { setDoctorAppointment } from '../../config/apis/posts';
import { goToScreen } from '../../config/functions';


const { width, height } = Dimensions.get("window")

export default class DoctorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            star1: "star",
            star2: "star",
            star3: "star",
            star4: "star",
            star5: "star",
            showModal: false,
        };
    }

    makeCall = () => {
        goToScreen("Chat", this.props.navigation)
        return
        const link = "tel:" + this.props.doctor.phone
        Linking.openURL(link)
    }

    setAppointment = async (data) => {
        console.log(data)
        // return
        const appointment = await setDoctorAppointment(data)

        if (appointment) {
            console.log("appointment set successfully");
            this.setState({
                showModal: false
            })
        } else {
            console.log("appointment not set");
        }
    }

    render() {
        // const icon = <View style={{ height: 60, width: 60 }} > <Icon name="clipboard-list" size={25} color={colors.mainColor} /> </View>
        const icon = <Icon1 name="clipboard-list" size={40} color={colors.mainColor} />
        const icon2 = <Icon1 name="phone-in-talk" size={20} color={colors.blueLight} />
        const time = this.props.doctor.work_days ? this.props.doctor.work_days[0].from + " - " + this.props.doctor.work_days[0].to : "08:00 - 16:00"
        return (
            <View style={styles.container}>

                <DoctorAppointmentModal
                    doctor={this.props.doctor}
                    showModal={this.state.showModal}
                    hideModal={() => this.setState({ showModal: false })}
                    setAppointment={this.setAppointment}
                />

                <Text style={styles.name}> {this.props.doctor.name} </Text>
                <Text style={styles.major}> {this.props.doctor.professional} </Text>
                <Pressable onPress={this.showReviews} style={[styles.miniRow, { justifyContent: "flex-end" }]}>
                    <Text style={styles.ratingCount}>
                        {20}
                        {" تقييم"}{" "}
                    </Text>
                    <View style={styles.ratingStars}>
                        <Icon name={this.state.star1} color={colors.mainColor} size={30} style={{ marginRight: 5 }} />
                        <Icon name={this.state.star2} color={colors.mainColor} size={30} style={{ marginRight: 5 }} />
                        <Icon name={this.state.star3} color={colors.mainColor} size={30} style={{ marginRight: 5 }} />
                        <Icon name={this.state.star4} color={colors.mainColor} size={30} style={{ marginRight: 5 }} />
                        <Icon name={this.state.star5} color={colors.grey} size={25} style={{ marginRight: 5 }} />
                    </View>
                </Pressable>

                <Text style={styles.desc}> {this.props.doctor.about} </Text>

                <DoctorAppointmentComponent onPress={() => this.setState({ showModal: true })} iconBackground={colors.white} title={"حدد الموعد"} subTitle={time} icon={icon} />

                <DoctorAppointmentComponent onPress={this.makeCall} iconBackground={"#DAD3FD"} title={"تواصل"} subTitle={this.props.doctor.phone} icon={icon2} />

                {/* <OrderButton screen={this.props.screen} type={"toggler"} adding={this.state.adding} added={this.state.added} title={"احجز الأن"} onPress={this.onButtonPress} item={this.props.product} /> */}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        width: (width * 90) / 100,
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor: colors.blackTransparent
    },
    miniRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    ratingStars: {
        flexDirection: "row-reverse",
    },
    ratingCount: {
        color: colors.grey,
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        marginRight: 5,
    },
    name: {
        color: colors.softBlack,
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        marginRight: 5,
        // marginVertical: 10,
    },
    major: {
        color: colors.grey,
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        marginRight: 5,
        marginVertical: 20,
    },
    desc: {
        color: colors.grey,
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        marginRight: 5,
        marginVertical: 20,
        lineHeight: 20,
        textAlign: "right"
    },
})