import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, fonts } from '../../config/vars';
import AskMeModal from './AskMeModal';

export default class AskMeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const service = this.props.item.item
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.setService(service)} style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: service.image }} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.title}> {service.title} </Text>
                    <Text style={styles.desc}> {service.description} </Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        // height: 20,
        width: "100%",
        // backgroundColor: colors.borderColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 130,
        height: 130,
        borderRadius: 80,
        backgroundColor: colors.whiteF7,
        elevation: 10,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 80,
    },
    textContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    title: {
        fontFamily: fonts.tajawalB,
        fontSize: 18,
        color: colors.mainColor,
        elevation: 10,
        textAlign: 'center',
        textShadowColor: colors.grey,
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 0.5,
    },
    desc: {
        marginTop: 10,
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        color: colors.black,
        // elevation: 10,
        textAlign: 'center'
    }
})