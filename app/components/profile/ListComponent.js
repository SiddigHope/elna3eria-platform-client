import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import elevations from '../../config/elevations';
import { fonts, colors } from '../../config/vars';
import { goToScreen } from '../../config/functions';

export default class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    goToScreen = () => {
        const item = this.props.item.item
        goToScreen(item.onPress, this.props.navigation)
    }

    render() {
        const item = this.props.item.item
        return (
            <Pressable onPress={this.goToScreen} style={styles.container}>
                {item.icon}
                <Text style={styles.title}> {item.title} </Text>
                <Icon name="chevron-thin-left" size={20} style={{ marginLeft: 10 }} color={colors.grey} />
            </Pressable>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: "100%",
        height: 60,
    },
    title: {
        flex: 1,
        textAlign: 'right',
        textAlignVertical: "center",
        fontFamily: fonts.tajawalR,
        fontSize: 18,
        color: colors.ebony,
        marginHorizontal: 20
    }
})