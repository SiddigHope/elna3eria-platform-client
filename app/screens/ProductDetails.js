import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Modal } from "react-native";
import { colors } from "../config/vars";
import ImageComponent from "../components/product/ImageComponent";
import ProductInfo from "../components/product/ProductInfo";
import ReviewsList from "../components/product/reviews/ReviewsList";

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      store: [],
      loading: false,
      showReviews: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    this.setProduct();
  }

  setProduct = () => {
    this.setState({
      product: this.props.route.params.product,
      store: this.props.route.params.store,
    });

    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)
  };

  render() {
    //   console.log(this.state.product)
    return (
      <View style={styles.container}>
        <StatusBar translucent style="dark" />
        <Modal
          transparent={true}
          onBackdropPress={() => this.setState({ showReviews: false })}
          onSwipeComplete={() => this.setState({ showReviews: false })}
          onRequestClose={() => this.setState({ showReviews: false })}
          visible={this.state.showReviews}
          animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <ReviewsList reviews={this.state.product && this.state.product.reviews} />
            </View>
          </View>
        </Modal>
        {this.state.loading ? (
          <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }} >
            <ActivityIndicator size={50} color={colors.mainColor} />
          </View>
        ) : (
          <>
            <ImageComponent navigation={this.props.navigation} screen={this.props.route.params.screen} image={this.state.product.image} />
            <ProductInfo showReviews={() => this.setState({ showReviews: !this.state.showReviews })} navigation={this.props.navigation} screen={this.props.route.params.screen} store={this.state.store} product={this.state.product} />
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalContainer: {
    height: '100%',
    width: '100%',
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modal: {
    maxHeight: '80%',
    minHeight: '30%',
    width: '100%',
    backgroundColor: colors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    elevation: 10,
  },
});
