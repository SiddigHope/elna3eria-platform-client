import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../config/vars';
import GestureRecognizer from "react-native-swipe-gestures";
import RNPickerSelect from "react-native-picker-select";
import { elevations } from '../../config/elevations';
import OrderButton from './OrderButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Pressable } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"


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
            doctorTimeTable: true
        };
    }

    onButtonPress = () => {
        const { day, hour } = this.state
        if (day != 0 && hour != 0) {
            const data = {
                doctor_id: this.props.doctor.id,
                date: String(day),
                time: String(hour),
            }

            this.props.setAppointment(data)
        } else {
            console.log("day & hour not specified")
        }
    }

    onTimeChange = (event, newTime) => {
        console.log("newTime")
        console.log(newTime)
        this.setState({
            showDay: false,
            showTime: false,
            hour: moment(newTime, "h:mm:ss A").format("HH:mm")
        })
    };

    onDateChange = (event, newDate) => {
        console.log("newDate")
        console.log(newDate)
        this.setState({
            showDay: false,
            showTime: false,
            day: moment(newDate).format("YYYY-MM-DD")
        })
    };

    toggleTimeTable = () => {
        console.log("indie");
        this.setState((state) => ({
            doctorTimeTable: !state.doctorTimeTable
        }))
    }

    render() {
        // console.log(this.props.doctor)
        const { doctor } = this.props
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

                            {this.state.doctorTimeTable ? (
                                <>
                                    <View style={styles.contentContainer}>

                                        <Text style={styles.label} > {"الأيام التي يعمل فيها الطبيب"} </Text>

                                        {doctor.work_days && doctor.work_days.map(work_day => (
                                            <View key={work_day.day.id} style={styles.rowContent}>
                                                <Text style={styles.day} > {work_day.day.locale} </Text>
                                                <Text style={styles.time} > {work_day.from + " - " + work_day.to} </Text>
                                            </View>
                                        ))}
                                        <TouchableOpacity onPress={this.toggleTimeTable} style={styles.goToAppointment}>
                                            <Icon name="arrow-forward-outline" size={25} color={colors.mainColor} />
                                        </TouchableOpacity>
                                    </View>

                                </>
                            ) : (
                                <>

                                    <View style={styles.contentContainer}>
                                        <Pressable onPress={this.toggleTimeTable} style={styles.closeModal}>
                                            <Icon name="arrow-back-outline" size={25} color={colors.mainColor} />
                                        </Pressable>
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
                                        <OrderButton width={"100%"} type={"toggler"} title={"احجز الأن"} onPress={this.onButtonPress} item={this.props.doctor} />
                                    </View>

                                </>
                            )}
                        </View>
                    </View>
                </Modal >
            </GestureRecognizer >
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
    closeModal: {
        left: 20,
        top: 10,
        position: 'absolute',
        // backgroundColor: colors.white,
        // zIndex: 1111,
        // elevation: 5,
        borderRadius: 20,
        padding: 5
        // alignSelf: 'flex-start',
    },
    rowContent: {
        flexDirection: 'row-reverse',
        backgroundColor: colors.borderColor,
        justifyContent: "space-between",
        alignItems: 'center',
        marginVertical: 5,
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    day: {
        fontFamily: fonts.tajawalR,
        fontSize: 16
    },
    time: {
        fontFamily: fonts.tajawalR,
        fontSize: 16
    },
    goToAppointment: {
        backgroundColor: colors.white,
        elevation: 5,
        height: 40,
        width: 40,
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
})