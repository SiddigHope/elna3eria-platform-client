import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { colors, fonts } from '../../config/vars';
import GestureRecognizer from "react-native-swipe-gestures";
import RNPickerSelect from "react-native-picker-select";
import { elevations } from '../../config/elevations';
import OrderButton from './OrderButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Pressable } from 'react-native';


const sourceMoment = moment.unix(1636797600);
// const sourceDate = sourceMoment.local().toDate();
const sourceDate = new Date();

export default class DoctorAppointmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: 0,
            hour: 0,
            showDay: false,
            showTime: false,
        };
    }

    onButtonPress = () => {

    }

    onTimeChange = (event, newTime) => {
        console.log("newTime")
        console.log(newTime)
        this.setState({
            showDay: false,
            showTime: false,
            hour: moment(newTime).format("LT")
        })
    };

    onDateChange = (event, newDate) => {
        console.log("newDate")
        console.log(newDate)
        this.setState({
            showDay: false,
            showTime: false,
            day: moment(newDate).format("L")
        })
    };

    render() {
        // console.log(new Date())
        const offset = new Date().getTimezoneOffset() * +1;
        // console.log(offset)
        return (
            <GestureRecognizer
                // style={{ flex: 1 }}
                onSwipeDown={this.props.hideModal}
            >
                <Modal
                    transparent={true}
                    onBackdropPress={this.props.hideModal}
                    onSwipeComplete={this.props.hideModal}
                    onRequestClose={this.props.hideModal}
                    visible={this.props.showModal}
                    animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <View style={styles.topBar} />

                            <View style={styles.contentContainer}>
                                <Text style={styles.label} > {"الأيام التي يعمل فيها الطبيب"} </Text>
                                <Pressable onPress={() => this.setState({ showDay: true })} style={[styles.textInputContainer, elevations[5]]}>

                                    <Text style={styles.textInput} > {this.state.day == 0 ? "اختر اليوم" : this.state.day} </Text>

                                </Pressable>

                                {this.state.showDay && (
                                    <DateTimePicker
                                        mode="date"
                                        value={sourceDate}
                                        // timeZoneOffsetInMinutes={offset}
                                        style={{ width: 300, opacity: 1, height: 30, marginTop: 50 }}
                                        onChange={this.onDateChange}
                                    // minuteInterval={interval}
                                    />
                                )}

                                {/* {this.state.day != 0 && ( */}
                                <>

                                    {/* <Text style={[styles.label, { textAlign: 'center', lineHeight: 20 }]} > {"يعمل الطبيب في هذا اليوم من الساعة " + "this.state.chosenDay[0].from" + " الى الساعة " + "this.state.chosenDay[0].to"} </Text> */}
                                    <Pressable onPress={() => this.setState({ showTime: true })} style={[styles.textInputContainer, elevations[5]]}>

                                        <Text style={styles.textInput} > {this.state.hour == 0 ? "اختر الساعة" : this.state.hour} </Text>

                                    </Pressable>
                                </>
                                {/* )} */}

                                {this.state.showTime && (
                                    <DateTimePicker
                                        mode="time"
                                        value={sourceDate}
                                        style={{ width: 300, opacity: 1, height: 30, marginTop: 50 }}
                                        onChange={this.onTimeChange}
                                        is24Hour
                                    // timeZoneOffsetInMinutes={offset}
                                    // minuteInterval={interval}
                                    />
                                )}
                            </View>
                            <OrderButton width={"90%"} type={"toggler"} title={"احجز الأن"} onPress={this.onButtonPress} item={this.props.doctor} />

                        </View>
                    </View>
                </Modal>
            </GestureRecognizer>
        );
    }
}


const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
        width: '100%',
        // backgroundColor: colors.blackTransparent,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    modal: {
        backgroundColor: colors.whiteF7,
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
    label: {
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        color: colors.ebony,
        textAlign: 'center'
    },
    textInputContainer: {
        height: 60,
        borderRadius: 10,
        backgroundColor: colors.borderColor,
        elevation: 5,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        // height: "100%",
        color: colors.ebony,
        fontFamily: fonts.tajawalR,
        fontSize: 16,
        textAlign: "center",
    },
})