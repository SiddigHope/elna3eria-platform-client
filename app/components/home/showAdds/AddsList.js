import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AddComponent from "./AddComponent";
import { colors } from '../../../config/vars';

const { width, height } = Dimensions.get("window");

export default class AddsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _renderItem = (item, index) => (
        <AddComponent openModal={this.props.openModal} item={item} index={index} />
    );

    _itemSeparator = () => <View style={{ height: 15 }} />;

    _listFooter = () => <View style={{ height: 20 }} />;

    _listHeader = () => <View style={{ height: 20 }} />;

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    style={{ width: "95%" }}
                    ItemSeparatorComponent={this._itemSeparator}
                    contentContainerStyle={{alignItems: 'flex-end'}}
                    ListFooterComponent={this._listFooter}
                    ListHeaderComponent={this._listHeader}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        alignItems: 'center',
        backgroundColor: colors.whiteF7,
        // backgroundColor: "red",
    },
});