import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { colors, fonts } from '../../../config/vars';
import WorkComponent from './WorkComponent';

const { width, height } = Dimensions.get("window")

export default class WorkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _itemSeparator = () => (
        <View style={{ width: 10 }} />
    )

    _listHeader = () => (
        <View style={{ width: 20 }} />
    )

    _listFooter = () => (
        <View style={{ width: 20 }} />
    )

    _renderItem = (item, index) => (
        <WorkComponent onPress={this.props.onPress} work={item.item} index={index} />
    )

    render() {
        const { works } = this.props

        if (works && works.length == 0) {
            return <View />
        }
        // console.log(works)
        return (
            <View style={styles.container}>
                <Text style={styles.title}> {"معرض الاعمال : "} </Text>
                <FlatList
                    data={works}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    inverted
                    ListHeaderComponent={this._listHeader}
                    style={{ width, }}
                    // contentContainerStyle={{ alignItems: 'center' }}
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
        // backgroundColor: colors.whiteF7,
        // marginVertical: 20
    },
    title: {
        fontFamily: fonts.tajawalB,
        textAlign: "right",
        alignSelf: "flex-end",
        marginHorizontal: 20
    }
})