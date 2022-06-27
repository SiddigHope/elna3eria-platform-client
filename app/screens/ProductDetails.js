import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Modal, Dimensions, FlatList } from "react-native";
import { colors } from "../config/vars";
import ImageComponent from "../components/product/ImageComponent";
import ProductInfo from "../components/product/ProductInfo";
import ReviewsList from "../components/product/reviews/ReviewsList";
import { checkInFav, deleteFavProduct, setFavProduct } from '../config/apis/posts';
import { GestureDetector } from "react-native-gesture-handler";
import GestureRecognizer from "react-native-swipe-gestures";
import DoctorComponent from "../components/product/DoctorComponent";
import HrajProductInfo from '../components/product/HrajProductInfo';
import CommentsList from '../components/product/comments/CommentsList';


const { width, height } = Dimensions.get("window")

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      store: [],
      loading: false,
      showReviews: false,
      fav: false,
      hraj: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    this.setProduct();
  }

  setProduct = async () => {
    const data = {
      favorite_id: this.props.route.params.product.id,
      type: "product"
    }
    this.setState({
      product: this.props.route.params.product,
      store: this.props.route.params.store,
      hraj: this.props.route.params.hraj,
      fav: await checkInFav(data),
    });

    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)
  };

  setFav = async () => {
    if (this.state.fav) {
      this.deleteFav()
      return
    }

    this.setState({
      fav: true
    })
    const success = await setFavProduct(this.state.product.id)
  }

  deleteFav = async () => {
    // console.log("sdkjfksjd")
    this.setState({
      fav: false
    })
    const success = await deleteFavProduct(this.state.product.id)
  }


  _listFooter = () => (
    <CommentsList productId={this.state.product.id} />
  )

  _listHeader = () => (
    <ImageComponent
      setFav={this.setFav}
      fav={this.state.fav}
      navigation={this.props.navigation}
      hraj={this.props.route.params.hraj}
      screen={this.props.route.params.screen}
      image={this.state.product.images}
      product={this.state.product}
    />
  )

  _renderItem = (item, index) => (
    <HrajProductInfo
      showReviews={() => this.setState({ showReviews: !this.state.showReviews })}
      navigation={this.props.navigation}
      screen={this.props.route.params.screen}
      store={this.state.store}
      product={this.state.product}
    />
  )


  render() {
    console.log("this.state.product")
    console.log(this.state.product)
    return (
      <View style={styles.container}>
        <StatusBar translucent style="dark" />
        <GestureRecognizer
          // style={{ flex: 1 }}
          onSwipeDown={() => this.setState({ showReviews: false })}
        >
          <Modal
            transparent={true}
            onBackdropPress={() => this.setState({ showReviews: false })}
            onSwipeComplete={() => this.setState({ showReviews: false })}
            onRequestClose={() => this.setState({ showReviews: false })}
            visible={this.state.showReviews}
            animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <ReviewsList
                  closeModal={() => this.setState({ showReviews: false })}
                  reviews={this.state.product && this.state.product.reviews}
                />
              </View>
            </View>
          </Modal>
        </GestureRecognizer>
        {this.state.loading ? (
          <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }} >
            <ActivityIndicator size={50} color={colors.mainColor} />
          </View>
        ) : this.props.route.params.hraj ? (
          <>
            <FlatList
              data={[1]}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              // keyboardShouldPersistTaps={false}
              ListHeaderComponent={this._listHeader}
              // ListFooterComponent={this._listFooter}
              renderItem={this._renderItem}
            />
          </>
        ) : this.props.route.params.hospital ? (
          <DoctorComponent
            setFav={this.setFav}
            fav={this.state.fav}
            navigation={this.props.navigation}
            hraj={this.props.route.params.hraj}
            screen={this.props.route.params.screen}
            image={this.state.product.image}
            product={this.state.product}
          />
        ) : (
          <>
            <ImageComponent
              setFav={this.setFav}
              fav={this.state.fav}
              navigation={this.props.navigation}
              hraj={this.props.route.params.hraj}
              screen={this.props.route.params.screen}
              image={this.state.product.image}
            />
            <ProductInfo
              showReviews={() => this.setState({ showReviews: !this.state.showReviews })}
              navigation={this.props.navigation}
              screen={this.props.route.params.screen}
              store={this.state.store}
              product={this.state.product}
            />
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
