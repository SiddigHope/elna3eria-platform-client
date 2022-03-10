import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../config/vars";
import MiniHeader from "../MiniHeader";

const { width, height } = Dimensions.get('window')

export default class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <MiniHeader title={""} backgroundColor={colors.white} navigation={this.props.navigation} />
        </View>
        <Image source={{ uri: this.props.image }} style={styles.image} />
        <TouchableOpacity onPress={this.props.setFav} style={[styles.favCont]}>
          <Icon name={this.props.fav ? "heart" : "heart-outline"} size={30} color={colors.danger} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height: (height * 55) / 100,
    backgroundColor: colors.mainColor
  },
  image: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: "absolute",
    top: 20,
    right: 0,
    left: 0,
    // zIndex: 11111111
  },
  favCont: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: colors.whiteF7,
    padding: 5,
    borderRadius: 60,
    elevation: 5,
    // left: 0,
    // zIndex: 11111111
  },
})
