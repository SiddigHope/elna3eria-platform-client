import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
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
})
