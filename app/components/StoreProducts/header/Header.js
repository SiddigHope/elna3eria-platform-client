import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../../config/vars";
import RoundedIcons from "./RoundedIcons";
import Input from "./Input";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/Feather";
import { getCartItem, goToScreen } from "../../../config/functions";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemsCount: 0
    };
  }

  componentDidMount() {
    // console.log(this.props.store)
    this.getCartCount()
    const navigation = this.props.navigation

    this.focusLister = navigation.addListener("focus", () => {
      this.getCartCount()
    })
  }

  componentWillUnmount() {
    const navigation = this.props.navigation
    navigation.removeListener("focus")
  }

  getCartCount = async () => {
    const cart = await getCartItem(this.props.store.id)
    this.setState({
      cartItemsCount: cart.length
    })
  }

  render() {
    return (
      <View
        style={[styles.container]}
      >
        <View style={styles.headerContainer}>
          <RoundedIcons onPress={() => goToScreen("Cart", this.props.navigation, { store: this.props.store })} items={this.state.cartItemsCount} type="cart" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.hello}> {"مرحبا بك في"} </Text>
            <Text style={styles.storeTitle}> {this.props.store.name} </Text>
          </View>
        </View>
        <View style={styles.headerContainer}>
          <Input
            closeSearching={this.props.closeSearching}
            onChangeText={this.props.onChangeText}
            searching={this.props.searching}
          />
          <RoundedIcons onPress={() => console.log("chat icon pressed")} items={0} type="chat" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 155,
    width: "100%",
    // backgroundColor: 'red',
    alignItems: "center",
    marginTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerTextContainer: {
    // height: 25,
    // backgroundColor: 'red',
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  hello: {
    fontFamily: "Tajawal-Regular",
    fontSize: 18,
    color: "grey",
  },
  storeTitle: {
    fontFamily: "Tajawal-Bold",
    fontSize: 18,
    color: colors.softBlack,
  },
});
