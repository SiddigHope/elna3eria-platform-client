import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../config/vars";
import ImageComponent from "../components/product/ImageComponent";
import ProductInfo from "../components/product/ProductInfo";

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
    //   console.log(this.state.product)
    return (
      <View style={styles.container}>
        <StatusBar translucent={false} backgroundColor={colors.white} style="dark" />
        <ImageComponent image={this.state.product.image} />
        <ProductInfo store={this.state.store} product={this.state.product} />
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
