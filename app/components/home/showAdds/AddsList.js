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

const { width, height } = Dimensions.get("window");

export default class AddsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _renderItem = (item, index) => (
        <AddComponent item={item} index={index} />
    );

    _itemSeparator = () => <View style={{ width: 20 }} />;

    _listFooter = () => <View style={{ height: 20 }} />;

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    pagingEnabled
                    ListFooterComponent={this._listFooter}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F6F8",
        // backgroundColor: "red",
    },
});