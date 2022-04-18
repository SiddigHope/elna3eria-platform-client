import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Linking, Alert } from "react-native";
import { colors } from "../../../config/vars";
import { elevations } from '../../../config/elevations';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemsCount: 0
    };
  }

  render() {
    return (
      <View
        style={[styles.container]}
      >
        <View style={styles.headerContainer}>
          <View style={styles.icons}>
            <View style={styles.barsContainer}>
              <View style={[styles.bars, elevations[5]]}></View>
              <View style={[styles.bars, elevations[5], { width: "70%", alignSelf: "flex-start" }]}></View>
              <View style={[styles.bars, elevations[5]]}></View>
            </View>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.hello}> {"مرحبا"} </Text>
            <Text style={styles.storeTitle}> {"خدمة امرني"} </Text>
          </View>
        </View>
        <View style={styles.headerContainer}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
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
    // alignSelf: "flex-end",
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
  icons: {
    flexDirection: "row",
  },
  barsContainer: {
    height: 25,
    width: 25,
    // backgroundColor: 'red',
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bars: {
    width: "100%",
    height: 5,
    backgroundColor: colors.mainColor,
    borderRadius: 20,
    elevation: 5,
  },
});
