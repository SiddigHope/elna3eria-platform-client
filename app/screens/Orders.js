import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../config/header/Header';

export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    closeSearching={() => console.log("closing")}
                    searching={false}
                    onChangeText={(text) => console.log(text)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    }
})