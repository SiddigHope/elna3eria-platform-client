import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import MiniHeader from '../components/MiniHeader';
import { colors } from '../config/vars';

export default class HospitalProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const hospital = this.props.route.params.store
        console.log(hospital)
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <MiniHeader right={"d"} title={hospital.name} navigation={this.props.navigation} />
                </View>
                <View style={styles.banner}>
                    <Image source={{ uri: hospital.image }} style={styles.bannerImage} />
                </View>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteF7,
    },
    header: {
        position: "absolute",
    },
    banner: {
        width: "100%",
        height: 200,
    },
    bannerImage: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.softWhite
    }
})
