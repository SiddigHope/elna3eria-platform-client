import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fonts, colors } from '../../config/vars';

export default class DoctorAppointmentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
                <View style={{ height: 40, width: 40, borderRadius: 10, backgroundColor: this.props.iconBackground, justifyContent: 'center', alignItems: 'center' }}>
                    {this.props.icon}
                </View>
                <View style={styles.infoCont} >
                    <Text style={styles.title}> {this.props.title} </Text>
                    <Text style={styles.subTitle}> {this.props.subTitle} </Text>
                </View>
                <Icon name='ios-chevron-back-outline' color={colors.blueLight} size={25} />
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: 80,
        width: "100%",
        flexDirection: 'row-reverse',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 15,
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    infoCont: {
        flex: 1,
        marginHorizontal: 10,
    },
    title: {
        fontFamily: fonts.tajawalB,
        color: colors.softBlack,
        fontSize: 16,
        textAlign: "right",
    },
    subTitle: {
        fontFamily: fonts.tajawalR,
        color: colors.grey,
        fontSize: 14,
        textAlign: "right"
    }
})