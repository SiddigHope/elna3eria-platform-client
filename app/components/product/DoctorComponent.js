import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions, FlatList } from 'react-native';
import Svg, { Defs, Rect, LinearGradient, RadialGradient, Stop } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../config/vars';
import DoctorInfo from './DoctorInfo';


const { width, height } = Dimensions.get("window")
const FROM_COLOR = '#F5EDE8';
const TO_COLOR = '#EBE7F8';

export default class DoctorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "http://www.jeanlouismedical.com/img/doctor-profile-small.png"
        };
    }

    _itemSeparator = () => (
        <View style={{ height: 10 }} />
    )

    _listHeader = () => (
        <View style={styles.header} >
            <Pressable onPress={() => this.props.navigation.goBack()} style={styles.iconContainer}>
                <Icon name='close' size={25} color={colors.ebony} />
            </Pressable>

            <View style={styles.imageContainer}>
                <Image source={{ uri: this.props.image }} style={styles.image} />
            </View>
        </View>
    )

    _listFooter = () => (
        <View style={{ height: 20 }} />
    )

    _renderItem = (item, index) => (
        <DoctorInfo
            doctor={this.props.product}
            navigation={this.props.navigation}
        />
    )

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.white} />
                <Svg height={height} width={width} style={StyleSheet.absoluteFillObject}>
                    <Defs>
                        <RadialGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <Stop offset="0" stopColor={FROM_COLOR} />
                            <Stop offset="0.5" stopColor={FROM_COLOR} />
                            <Stop offset="1" stopColor={TO_COLOR} />
                        </RadialGradient>
                    </Defs>
                    <Rect width={width} height={height} fill="url(#grad)" />
                </Svg>

                <FlatList
                    data={[1]}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this._listHeader}
                    style={{ width, }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    ListFooterComponent={this._listFooter}
                    ItemSeparatorComponent={this._itemSeparator}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // width,
        // height,
    },
    header: {
        height: (height * 25) / 100,
        width,
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


