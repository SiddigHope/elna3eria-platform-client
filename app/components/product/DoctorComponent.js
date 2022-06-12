import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import Svg, { Defs, Rect, LinearGradient, RadialGradient, Stop } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../config/vars';
import DoctorInfo from './DoctorInfo';


const FROM_COLOR = '#F5EDE8';
const TO_COLOR = '#EBE7F8';

export default class DoctorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "http://www.jeanlouismedical.com/img/doctor-profile-small.png"
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.white} />
                <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                    <Defs>
                        <RadialGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <Stop offset="0" stopColor={FROM_COLOR} />
                            <Stop offset="0.5" stopColor={FROM_COLOR} />
                            <Stop offset="1" stopColor={TO_COLOR} />
                        </RadialGradient>
                    </Defs>
                    <Rect width="100%" height="100%" fill="url(#grad)" />
                </Svg>

                <View style={styles.header} >
                    <Pressable onPress={() => this.props.navigation.goBack()} style={styles.iconContainer}>
                        <Icon name='ios-chevron-back-outline' size={30} color={colors.ebony} />
                    </Pressable>

                    <View style={styles.imageContainer}>
                        <Image source={{ uri: this.props.image }} style={styles.image} />
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
                    <DoctorInfo
                        doctor={this.props.product}
                        navigation={this.props.navigation}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        height: "30%",
        width: "100%",
        backgroundColor: colors.white,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 10,
        // alignItems: 'center',
        padding: 30,
    },
    iconContainer: {
        backgroundColor: colors.white,
        elevation: 5,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    imageContainer: {
        position: "absolute",
        bottom: -40,
        // paddingTop: 10,
        height: 150,
        width: 120,
        alignSelf: 'center',
        backgroundColor: colors.white,
        borderRadius: 20,
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 20
    },
})


