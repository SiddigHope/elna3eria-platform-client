import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../config/vars';
import Icon from "react-native-vector-icons/FontAwesome"
export default class SocialMedia extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.type == "facebook" ? (
                    <Icon name='facebook' size={30} color={colors.softWhite} />
                ) : (
                    <Icon name='google' size={30} color={colors.softWhite} />
                )}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        width: 130,
        height: 60,
        borderRadius: 15
    }
})