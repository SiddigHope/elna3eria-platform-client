import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import elevations from '../../../config/elevations';
import { colors } from '../../../config/vars';
import { Image } from 'react-native-elements';

const { width, height } = Dimensions.get("window")

export default class BannerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        // console.log(this.props.item)
        return (
            <View style={styles.container}>
                <View style={[styles.imageBanner, elevations[10]]}>
                    <Image
                        PlaceholderContent={<ActivityIndicator color={colors.mainColor} size="small" />}
                        style={styles.image}
                        source={{ uri: this.props.item.item.file }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        alignItems: 'center',
    },
    imageBanner: {
        width: (width * 95) / 100,
        marginTop: 15,
        height: 120,
        borderRadius: 10,
        elevation: 10,
        backgroundColor: colors.white
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
})