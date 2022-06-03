import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import AddsList from './AddsList';
import { colors, fonts } from '../../../config/vars';
import GestureRecognizer from 'react-native-swipe-gestures';
import { StatusBar } from 'expo-status-bar';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import MediaContainer from './MediaContainer';
import { ProgressBar } from 'react-native-paper';
import Dots from 'react-native-dots-pagination';
import { getAdvertisements } from '../../../config/data';
// const data = [
//     // {
//     //     id: "1",
//     //     type: "image",
//     //     file: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH5Q09fKQOrDsbGZ5jjuHlxTsLmVY2xsc-7A&usqp=CAU",
//     // },
//     // {
//     //     id: "2",
//     //     type: "video",
//     //     file: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
//     //     // file: "https://www.youtube.com/watch?v=l9Ny3CrYYWk",
//     // },
//     {
//         id: "3",
//         type: "image",
//         file: "https://inteng-storage.s3.amazonaws.com/img/iea/lV6DYQWrwx/sizes/car-names_md.jpg",
//     },
//     // {
//     //     id: "4",
//     //     type: "image",
//     //     file: "https://blog.hubspot.com/hubfs/%5BAgency_Post%5D/Blog_Images/brand-names-different-countries.png",
//     // },
//     {
//         id: "5",
//         type: "image",
//         file: "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg",
//     },
//     {
//         id: "6",
//         type: "image",
//         file: "https://www.ubuy.com.tr/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNjExbk4yMitEakwuX0FDX1NMMTAwMF8uanBn.jpg",
//     },
//     // {
//     //     id: "5",
//     //     type: "video",
//     //     file: "https://www.youtube.com/watch?v=9em32dDnTck",
//     // }
// ]


export default class ShowAdds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            progress: Number("0." + 6),
            showAdds: false,
            active: 0,
            advertisements: [],
            dotsCount: 0
        };
    }

    componentDidMount() {
        this.getData()
    }

    startProgress = () => {
        const secs = 30000
        // console.log()
        setInterval(() => {

        }, secs)
        return (val - 0) / (1 - 0)
    }

    getData = async () => {
        const data = await getAdvertisements()
        this.setState({
            data,
        })
    }

    openModal = (advertisements) => {
        // console.log("open modal")
        // console.log(advertisements)
        this.setState({ showAdds: true, advertisements: advertisements ? advertisements : [], dotsCount: advertisements ? advertisements.advertisements.length : 0 })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} style="light" backgroundColor={colors.softBlack} />
                <GestureRecognizer
                    // style={{ flex: 1 }}
                    onSwipeDown={() => this.setState({ showAdds: false })}
                >
                    <Modal
                        transparent={true}
                        onBackdropPress={() => this.setState({ showAdds: false })}
                        onSwipeComplete={() => this.setState({ showAdds: false })}
                        onRequestClose={() => this.setState({ showAdds: false })}
                        visible={this.state.showAdds}
                        animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.modal}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>{this.state.advertisements.name}</Text>
                                    <TouchableOpacity onPress={() => this.setState({ showAdds: false })} style={styles.closeContainer}>
                                        <Icon name="close-circle-outline" color={colors.mainColor} size={30} />
                                    </TouchableOpacity>
                                </View>
                                <ProgressBar progress={this.state.progress} color={colors.mainColor} />
                                <MediaContainer
                                    setActive={(active) => this.setState({ active })}
                                    data={this.state.advertisements.advertisements}
                                    navigation={this.props.navigation}
                                />
                                <View style={styles.dotsPaging}>
                                    <Dots
                                        activeColor={colors.mainColor}
                                        passiveColor={"rgba(255, 130, 66,0.5)"}
                                        length={this.state.dotsCount}
                                        active={this.state.active}
                                        activeDotHeight={20}
                                        activeDotWidth={25}
                                        passiveDotHeight={15}
                                        passiveDotWidth={15}
                                        marginHorizontal={5}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </GestureRecognizer>
                <AddsList openModal={this.openModal} data={this.state.data} navigation={this.props.navigation} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteF7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        height: '100%',
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    modal: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.softBlack,
        // borderTopRightRadius: 30,
        // borderTopLeftRadius: 30,
        elevation: 10,
    },
    modalHeader: {
        height: 70,
        backgroundColor: colors.softBlack,
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 20
    },
    modalTitle: {
        color: colors.softWhite,
        fontSize: 16,
        fontFamily: fonts.tajawalB
    },
    dotsPaging: {
        // backgroundColor: "red",
        position: "absolute",
        bottom: 50,
        width: "100%",
    }
})