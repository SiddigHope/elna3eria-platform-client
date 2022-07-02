import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { colors, fonts } from '../../../config/vars';

const { width, height } = Dimensions.get("window")
export default class WorkComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { work } = this.props
        return (
            <TouchableOpacity onPress={() => this.props.onPress(work)} style={styles.container}>
                <Image
                    PlaceholderContent={<ActivityIndicator color={colors.mainColor} size="small" />}
                    source={{ uri: work.attach }}
                    style={styles.image}
                />
                <Text style={styles.title}> {work.title} </Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width: width / 2,
        height: 200,
        backgroundColor: colors.white,
        elevation: 10,
        borderRadius: 10,
        marginVertical: 20
    },
    image: {
        width: "100%",
        height: (200 * 85) / 100,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    title: {
        fontFamily: fonts.tajawalB,
        color: colors.ebony,
        fontSize: 12,
        textAlign: "center",
        height: (200 * 15) / 100,
        textAlignVertical: 'center'
        // backgroundColor: "red"
    }
})