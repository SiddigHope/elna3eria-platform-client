import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { addToCart } from "../../config/functions";
import { colors } from '../../config/vars';

export default class OrderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // _addToCart = async () => {
  //   addToCart(this.props.item)
  // }

  render() {
    return (
      <Pressable onPress={this.props.onPress} style={styles.container} >
        {this.props.type == "cart" && this.props.added ? (
          <Icon name="check-circle-outline" size={25} color={colors.white} />
        ) :
          this.props.type == "cart" && this.props.adding ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={styles.btnText}> {this.props.title} </Text>
          )}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainColor,
    width: '80%',
    height: 60,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 10,
    marginBottom: 20,
  },
  btnText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: colors.ebony
  }
})