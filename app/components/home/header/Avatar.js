import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import elevations from "../../../config/elevations";
import { colors } from '../../../config/vars';

export default class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <View style={[styles.container, elevations[5]]}>
        <Image style={styles.image} source={{ uri: this.props.user && this.props.user.client.image }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: colors.whiteF7
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20
  }
})