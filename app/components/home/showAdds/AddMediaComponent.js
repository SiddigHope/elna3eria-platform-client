import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import { colors } from '../../../config/vars';

const { width, height } = Dimensions.get("window")

export default class AddMediaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.navigation = this.props.navigation

    }

    render() {
        const item = this.props.item.item
        // console.log(this.props.item)
        return (
            <View style={styles.container}>
                <Image
                    onLoadEnd={this.props.startCount}
                    PlaceholderContent={<ActivityIndicator color={colors.mainColor} size="small" />}
                    resizeMode='contain'
                    style={styles.image}
                    source={{ uri: item.file }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: width,
        height: height - 70,
    }
})