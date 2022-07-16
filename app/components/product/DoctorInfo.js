import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, Linking, Modal, ActivityIndicator } from 'react-native';
import { colors, fonts, mainColorWithOpacity } from '../../config/vars';
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Ionicons"
import OrderButton from './OrderButton';
import DoctorAppointmentComponent from './DoctorAppointmentComponent';
import DoctorAppointmentModal from './DoctorAppointmentModal';
import { setDoctorAppointment } from '../../config/apis/posts';
import { goToScreen } from '../../config/functions';
import WorkList from './doctorWork/WorkList';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Image } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


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
            contactModal: false,
            workModal: false,
            work: {},
            adding: false,
            added: false
        };
    }

    makeCall = () => {
        const link = "tel:" + this.props.doctor.phone
        Linking.openURL(link)
        this.showContactOptionToggler()
    }

    openChat = () => {
        goToScreen("Chat", this.props.navigation, { receiver: this.props.doctor, type: "doctor" })
        // this.showContactOptionToggler()
    }

    setAppointment = async (data) => {
        console.log(data)
        // return
        this.setState({ adding: true })
        const appointment = await setDoctorAppointment(data)

        if (appointment) {
            console.log("appointment set successfully");
            setTimeout(() => {
                this.setState({
                    // showModal: false,
                    adding: false,
                    added: true
                })
            }, 2000)
            setTimeout(() => {
                this.setState({
                    showModal: false,
                })
            }, 3000)

        } else {
            console.log("appointment not set");
            this.setState({
                showModal: false,
                adding: false,
            })
        }
    }

    showContactOptionToggler = () => {
        this.setState({
            contactModal: !this.state.contactModal
        })
    }

    onWorkPressed = (work) => {
        console.log(work);
        this.setState({
            work,
            workModal: true
        })
    }

    render() {
        // const icon = <View style={{ height: 60, width: 60 }} > <Icon name="clipboard-list" size={25} color={colors.mainColor} /> </View>
        const icon = <Icon1 name="clipboard-list" size={40} color={colors.mainColor} />
        const icon2 = <Icon1 name="phone-in-talk" size={20} color={colors.blueLight} />
        const icon3 = <Icon2 name="message-circle" size={20} color={colors.white} />
        const time = this.props.doctor.work_days ? this.props.doctor.work_days[0].from + " - " + this.props.doctor.work_days[0].to : "08:00 - 16:00"
        return (
            <View style={styles.container}>

                <GestureRecognizer
                    onSwipeDown={() => this.setState({ workModal: false })}
                >
                    <Modal
                        transparent={true}
                        onBackdropPress={() => this.setState({ workModal: false })}
                        onSwipeComplete={() => this.setState({ workModal: false })}
                        onRequestClose={() => this.setState({ workModal: false })}
                        visible={this.state.workModal}
                        animationType="fade">
                        <View style={styles.modalContainer}>
                            <View style={styles.modal}>
                                {/* <Pressable onPress={() => this.setState({ workModal: false })} style={styles.workModalC} /> */}
                                <Pressable
                                    onPress={() => this.setState({ workModal: false })}
                                    style={styles.topBar}
                                >
                                    <Icon3 name='chevron-down' size={30} color={colors.mainColor} />
                                </Pressable>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View style={styles.workImageContainer} >
                                        <Image
                                            PlaceholderContent={<ActivityIndicator color={colors.mainColor} size="small" />}
                                            source={{ uri: this.state.work.attach }}
                                            style={styles.workImage}
                                        />
                                    </View>

                                    <Text style={styles.workTitle}> {this.state.work.title} </Text>

                                    <Text style={styles.workDescription}> {this.state.work.description} </Text>

                                    <DoctorAppointmentComponent onPress={() => this.setState({ showModal: true })} iconBackground={colors.white} title={"حدد الموعد"} subTitle={time} icon={icon} />

                                    <DoctorAppointmentComponent onPress={this.openChat} iconBackground={mainColorWithOpacity(0.5)} title={"دردشة فورية"} subTitle={"تحدث مع الطبيب مباشرة"} icon={icon3} />

                                    {/* <DoctorAppointmentComponent onPress={this.showContactOptionToggler} iconBackground={"#DAD3FD"} title={"تواصل"} subTitle={this.props.doctor.phone} icon={icon2} /> */}

                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </GestureRecognizer>

                <Modal
                    transparent={true}
                    onBackdropPress={() => this.setState({ contactModal: false })}
                    onSwipeComplete={() => this.setState({ contactModal: false })}
                    onRequestClose={() => this.setState({ contactModal: false })}
                    visible={this.state.contactModal}
                    animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <Pressable onPress={this.showContactOptionToggler} style={styles.closeModal}>
                                <Icon1 name="close-circle" size={25} color={colors.mainColor} />
                            </Pressable>

                            <DoctorAppointmentComponent onPress={this.openChat} iconBackground={mainColorWithOpacity(0.5)} title={"دردشة فورية"} subTitle={"تحدث مع الطبيب مباشرة"} icon={icon3} />

                            <DoctorAppointmentComponent onPress={this.makeCall} iconBackground={"#DAD3FD"} title={"اتصال صوتي"} subTitle={this.props.doctor.phone} icon={icon2} />

                        </View>
                    </View>
                </Modal>

                <DoctorAppointmentModal
                    doctor={this.props.doctor}
                    showModal={this.state.showModal}
                    adding={this.state.adding}
                    added={this.state.added}
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

                <WorkList
                    onPress={this.onWorkPressed}
                    navigation={this.props.navigation}
                    works={this.props.doctor.works}
                />

                <DoctorAppointmentComponent onPress={() => this.setState({ showModal: true })} iconBackground={colors.white} title={"حدد الموعد"} subTitle={time} icon={icon} />

                <DoctorAppointmentComponent onPress={this.openChat} iconBackground={mainColorWithOpacity(0.5)} title={"دردشة فورية"} subTitle={"تحدث مع الطبيب مباشرة"} icon={icon3} />

                {/* <DoctorAppointmentComponent onPress={this.showContactOptionToggler} iconBackground={"#DAD3FD"} title={"تواصل"} subTitle={this.props.doctor.phone} icon={icon2} /> */}

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
        marginBottom: 20,
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
    modalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.blackTransparent2,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    modal: {
        backgroundColor: colors.ebony,
        maxHeight: '90%',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    closeModal: {
        marginLeft: 20,
        alignSelf: 'flex-start',
    },
    workImageContainer: {
        width: (width * 90) / 100,
        height: 300,
        borderRadius: 10,
        elevation: 10
    },
    workImage: {
        width: (width * 90) / 100,
        height: 300,
        borderRadius: 10
    },
    workModalC: {
        height: 2,
        backgroundColor: colors.borderColor,
        marginBottom: 20,
        borderRadius: 10,
        width: "50%",
        alignSelf: 'center'
    },
    workTitle: {
        fontFamily: fonts.tajawalB,
        fontSize: 14,
        textAlign: "right",
        alignSelf: 'flex-end',
        color: colors.softWhite,
        marginVertical: 10,
    },
    workDescription: {
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        textAlign: "right",
        alignSelf: 'flex-end',
        color: colors.softWhite,
        lineHeight: 20,
        marginVertical: 10,
    },
    topBar: {
        width: "50%",
        height: 30,
        alignItems: 'center',
        marginBottom: 10,
        // flexDirection: "row-reverse",
        // backgroundColor: colors.borderColor,
        alignSelf: 'center',
        borderRadius: 10,
    },
})