import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import elevations from "../../../config/elevations";
import { colors, fonts } from "../../../config/vars";

export default class RoundedIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type, fav } = this.props
    return (
      <TouchableOpacity onPress={this.props.onPress} style={[styles.container, elevations[5], type == "fav" || type == "appointment" || type=="hraj" ? { backgroundColor: colors.white, marginHorizontal: 10 }: {}]}>
        {this.props.items != 0 && (
          <View style={[styles.numContainer, elevations[5]]}>
            <Text style={styles.numText}>{this.props.items}</Text>
          </View>
        )}
        {type == "cart" ? (
          <>
            <Icon1 name={"cart-outline"} size={25} color={colors.ebony} />
          </>
        ) : type == "fav" ? (
          <Icon1 name={fav ? "heart" : "heart-outline"} size={25} color={colors.danger} />
        ) : type == "appointment" ? (
          <Icon1 name={"bookmark-multiple-outline"} size={25} color={colors.mainColor} />
        ): type == "hraj" ? (
          <Icon2 name={"handbag"} size={25} color={colors.mainColor} />
        ) : type == "hospitalProfile" ? (
          <Icon1 name={"information-outline"} size={25} color={colors.white} />
        ): (
          <Icon name={"md-chatbox-ellipses"} size={25} color={colors.ebony} />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
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
