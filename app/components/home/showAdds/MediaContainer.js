import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import AddMediaComponent from './AddMediaComponent';

export default class MediaContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _renderItem = (item, index) => (
        <AddMediaComponent openModal={this.props.openModal} item={item} index={index} />
    );

    _listFooter = () => <View style={{ height: 20 }} />;

    _listHeader = () => <View style={{ height: 20 }} />;

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    pagingEnabled
                    // ListFooterComponent={this._listFooter}
                    // ListHeaderComponent={this._listHeader}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})
