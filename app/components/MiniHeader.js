import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import { fonts, colors } from '../config/vars';

export default class MiniHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.header}>
                <Icon onPress={() => this.props.navigation.goBack()} style={{ flex: 0.3 }} name="arrow-back-outline" size={30} color={colors.ebony} />
                <Text style={[styles.title, this.props.right?{textAlign: 'right'}: {}]}> {this.props.title} </Text>
                {this.props.right ? (null) : (
                    <Text style={styles.emptyText}> {""} </Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        height: 70,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    title: {
        flex: 1,
        fontFamily: fonts.tajawalB,
        fontSize: 18,
        textAlign: 'center',
        color: colors.ebony,
        // backgroundColor: "red"
    },
    emptyText: {
        flex: 0.3,
    },
})