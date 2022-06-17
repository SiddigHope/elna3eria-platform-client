import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors } from '../../config/vars';
// import { colors } from '../../config/vars';
import MyReviewsComponent from './MyReviewsComponent';

export default class MyReviewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: this.props.reviews ? this.props.reviews : []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.reviews.length != nextProps.reviews.length) {
            this.setState({
                reviews: nextProps.reviews,
            })
        }
    }

    _itemSeparator = () => (
        <View style={{ height: 20 }} />
    )

    _listHeader = () => (
        <View style={{ height: 20, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
            <View style={{ height: 2, width: 100, backgroundColor: colors.grey, borderRadius: 2, elevation: 2 }} />
        </View>
    )

    _listFooter = () => (
        <View style={{ height: 20 }} />
    )

    _renderItem = (item, index) => (
        <MyReviewsComponent onPress={this.props.onPress} item={item.item} index={index} />
    )


    render() {
        // console.log(this.state.reviews)
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.reviews}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this._listHeader}
                    style={{ width: "100%" }}
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
        width: "100%",
        alignItems: 'center',
    },
})