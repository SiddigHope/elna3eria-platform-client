import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import elevations from "../../../config/elevations";
import { colors } from "../../../config/vars";
import Avatar from "./Avatar";
import Input from "./Input";
import UserClass from '../../../config/authHandler';
import { StatusBar } from 'expo-status-bar';
import BannerList from './BannerList';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = async () => {
    this.setState({
      user: await UserClass.getUser()
    })
  }

  render() {
    return (
      <View style={[styles.container, this.props.searching ? { height: 50 } : Platform.OS == "ios" ? { marginTop: 40 } : {}]}>
        <StatusBar translucent={false} style="dark" backgroundColor={colors.whiteF7} />
        <View style={styles.headerContainer}>
          <Avatar user={this.state.user} />
          <Input closeSearching={this.props.closeSearching} onChangeText={this.props.onChangeText} searching={this.props.searching} />
          <View style={styles.barsContainer}>
            <View style={[styles.bars, elevations[5]]}></View>
            <View style={[styles.bars, elevations[5], { width: "70%" }]}></View>
            <View style={[styles.bars, elevations[5]]}></View>
          </View>
        </View>
        {this.props.searching ? null : (
          <BannerList navigation={this.props.navigation} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 210,
    width: "100%",
    // backgroundColor: 'red',
    alignItems: "center",
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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
  imageBanner: {
    width: "95%",
    marginTop: 15,
    height: 120,
    borderRadius: 10,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
