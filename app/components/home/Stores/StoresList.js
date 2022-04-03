import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import StoreComponent from "./StoreComponent";
import { colors } from "../../../config/vars";
import elevations from "../../../config/elevations";

const { width, height } = Dimensions.get("window");

export default class StoresList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = (item, index) => (
    <StoreComponent
      goToScreen={this.props.goToScreen}
      item={item}
      hraj={this.props.hraj}
      index={index}
    />
  );

  _itemSeparator = () => <View style={{ height: 15 }} />;

  _listFooter = () => <View style={{ height: 20 }} />;

  _listHeader = () => (
    <View style={{ width: "100%", alignItems: "flex-end", height: 60 }}>
      <View style={styles.titleContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.subTitle}>
            {" "}
            {this.props.stores.length}
            {"متجر"}{" "}
          </Text>
          <Text style={styles.title}> {"المتاجر :"} </Text>
        </View>
        <View style={[styles.titleUnderline, elevations[5]]} />
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.stores}
          numColumns={2}
          ListHeaderComponent={this._listHeader}
          showsVerticalScrollIndicator={false}
          style={{ width: "95%", alignItems: "flex-end" }}
          contentContainerStyle={{ alignItems: "center" }}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this._itemSeparator}
          ListFooterComponent={this._listFooter}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginBottom: 65,
    flex: 1,
    width: "100%",
    // backgroundColor: 'blue',
    alignItems: "center",
    // alignSelf: "center",
  },
  titleContainer: {
    // marginHorizontal: 20,
    alignItems: "flex-end",
    marginBottom: 20,
    width: "40%",
  },
  title: {
    fontFamily: "Tajawal-Bold",
    fontSize: 18,
    color: colors.softBlack,
  },
  subTitle: {
    fontFamily: "Tajawal-Regular",
    fontSize: 16,
    color: "grey",
  },
  titleUnderline: {
    height: 5,
    borderRadius: 10,
    backgroundColor: colors.mainColor,
    width: "100%",
    elevation: 5,
  },
});
