import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../config/vars";

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      store: [],
    };
  }

  componentDidMount() {
    this.setProduct();
  }

  setProduct = () => {
    this.setState({
      product: this.props.route.params.product,
      store: this.props.route.params.store,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> ProductDetails </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
