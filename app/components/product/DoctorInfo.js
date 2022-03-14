import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, fonts } from '../../config/vars';
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import OrderButton from './OrderButton';
import DoctorAppointmentComponent from './DoctorAppointmentComponent';

export default class DoctorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            star1: "star",
            star2: "star",
            star3: "star",
            star4: "star",
            star5: "star",
        };
    }

    render() {
        // const icon = <View style={{ height: 60, width: 60 }} > <Icon name="clipboard-list" size={25} color={colors.mainColor} /> </View>
        const icon = <Icon1 name="clipboard-list" size={25} color={colors.mainColor} />
        const { product } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.name}> {"د.سخنون ملك الجخنون"} </Text>
                <Text style={styles.major}> {"جراحة القلب و الصدر و الاوعية الدموية"} </Text>
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

                <Text style={styles.desc}> {"جراحة القلب و الصدر و الاوعية الدموية جراحة القلب و الصدر و الاوعية الدموية جراحة القلب و الصدر و الاوعية الدموية"} </Text>

                <DoctorAppointmentComponent title={"حدد الموعد"} subTitle={"788/333/ 332/ 323"} icon={icon} />
              
                <DoctorAppointmentComponent title={"حدد الموعد"} subTitle={"788/333/ 332/ 323"} icon={icon} />

                <OrderButton screen={this.props.screen} type={"toggler"} adding={this.state.adding} added={this.state.added} title={"اطلب الأن"} onPress={this.onButtonPress} item={this.props.product} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        width: "85%",
        alignItems: 'center',
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