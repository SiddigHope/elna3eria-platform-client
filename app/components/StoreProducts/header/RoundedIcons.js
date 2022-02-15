import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, fonts } from "../../../config/vars";

export default class RoundedIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Pressable onPress={this.props.onPress} style={styles.container}>
        {this.props.items != 0 && (
          <View style={styles.numContainer}>
            <Text style={styles.numText}>{this.props.items}</Text>
          </View>
        )}
        {this.props.type == "cart" ? (
          <>
            <Icon1 name={"cart-outline"} size={25} color={colors.ebony} />
          </>
        ) : (
          <Icon name={"md-chatbox-ellipses"} size={25} color={colors.ebony} />
        )}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderRadius: 15,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainColor,
  },
  numContainer: {
    position: 'absolute',
    backgroundColor: colors.white,
    height: 20,
    width: 20,
    borderRadius: 10,
    elevation: 5,
    top: -5,
    right: -5,
    justifyContent: "center",
    alignItems: "center"
  },
  numText: {
    fontFamily: fonts.tajawalR,
    fontSize: 14,
    color: colors.softBlack
  }
});
