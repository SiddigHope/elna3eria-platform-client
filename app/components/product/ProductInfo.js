import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal,
  ScrollView,
  Image,
  Pressable
} from "react-native";
import { colors, fonts } from "../../config/vars";
import OrderButton from "./OrderButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { addToCart, removeItemFromCart } from "../../config/functions";

const { width, height } = Dimensions.get("window");

export default class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      productCount: 1,
      orderText: '',
      edit: false,
      adding: false,
      added: false
    };
    this.addToCart = this.addToCart.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product.order_id) {
      this.setState({
        productCount: nextProps.product.quantity,
        orderText: nextProps.product.order_comment,
        edit: true
      })
    }
  }

  onButtonPress = async () => {
    console.log("button pressed")
    this.setState({ showModal: !this.state.showModal })
  }

  deleteItem() {
    removeItemFromCart(this.props.product.order_id, this.props.store.id)
  }

  addToCart() {
    if (this.state.productCount == 0) return
    this.setState({
      adding: true
    })
    if (this.state.edit) {
      this.deleteItem()
    }
    const item = this.props.product
    const total = item.price * this.state.productCount
    const order_id = Date.now()
    if (this.state.edit) {

      item.order_id = order_id
      item.order_comment = this.state.orderText
      item.quantity = this.state.productCount
      item.total = total
      addToCart(item, this.props.store.id)
      this.setState({
        adding: false,
        added: true
      })
      if (this.state.edit) {
      }
      return
    }
    const added = addToCart({ ...item, order_id, quantity: this.state.productCount, total, order_comment: this.state.orderText }, this.props.store.id)
    this.setState({
      adding: false,
      added: true
    })
  }

  buyNow() {
    console.log("buy now button pressed")
  }

  alterCount(type) {
    if (type == "minus") {
      if (this.state.productCount == 0) return
      this.setState((prev) => ({
        productCount: prev.productCount - 1
      }))
    } else {
      this.setState((prev) => ({
        productCount: prev.productCount + 1
      }))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          onBackdropPress={() => this.setState({ showModal: false })}
          onSwipeComplete={() => this.setState({ showModal: false })}
          onRequestClose={() => this.setState({ showModal: false })}
          visible={this.state.showModal}
          animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Pressable onPress={this.onButtonPress} style={styles.closeModal}>
                <Icon2 name="close-circle" size={25} color={colors.mainColor} />
              </Pressable>
              <View style={styles.modalProductContainer}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{ uri: this.props.product.image }} />
                </View>
                <View style={styles.productDetails}>
                  <Text style={styles.productName}> {this.props.product.name} </Text>
                  <View style={styles.qtyContainer}>
                    <Text style={styles.qtyText}> {"????????????"} </Text>
                    <View style={styles.qtyCalculator}>
                      <Pressable style={{ justifyContent: "center" }} onPress={() => this.alterCount("minus")}>
                        <Icon2 name="minus" size={25} color={colors.softBlack} />
                      </Pressable>
                      <View style={styles.counterContainer}>
                        <Text style={styles.counter}> {this.state.productCount} </Text>
                      </View>
                      <Pressable style={{ justifyContent: "center" }} onPress={() => this.alterCount("plus")}>
                        <Icon2 name="plus" size={25} color={colors.softBlack} />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.modalButtons}>
                <View style={{ flex: 1 }}>
                  <OrderButton type={"cart"} adding={this.state.adding} added={this.state.added} title={"?????????? ??????????"} onPress={this.addToCart} />
                </View>
                <View style={{ flex: 1 }}>
                  <OrderButton type={"buy"} adding={this.state.adding} added={this.state.added} title={"?????????? ????????"} onPress={this.buyNow} />
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.infoContainer}>
          <View style={styles.headerInfo}>
            <View style={styles.miniRow}>
              <Icon name="star" color={colors.ratingYellow} size={35} />
              <Text style={styles.ratingText}>
                {"("}
                {this.props.product.rating}
                {")"}
              </Text>
            </View>
            <Text style={styles.name}> {this.props.product.name} </Text>
          </View>
          <ScrollView>
            <Text style={styles.price}>
              {" "}
              {"SR"} {this.props.product.price}{" "}
            </Text>
            <View style={[styles.miniRow, { justifyContent: "flex-end" }]}>
              <Text style={styles.ratingCount}>
                {" "}
                {"6 people ratted this item"}{" "}
              </Text>
              <View style={styles.ratingStars}>
                <Icon name="star" color={colors.ratingYellow} size={25} />
                <Icon name="star" color={colors.ratingYellow} size={25} />
                <Icon name="star" color={colors.ratingYellow} size={25} />
                <Icon name="star" color={colors.ratingYellow} size={25} />
                <Icon name="star" color={colors.ratingYellow} size={25} />
              </View>
            </View>
            <Text style={styles.desc}> {this.props.product.description} </Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                value={this.state.orderText}
                placeholder={"?????? ???????????? ???????? ??????..."}
                placeholderTextColor="#515C6F"
                onChangeText={(orderText) => this.setState({ orderText })}
              />
            </View>
            <OrderButton type={"toggler"} adding={this.state.adding} added={this.state.added} title={"???????? ????????"} onPress={this.onButtonPress} item={this.props.product} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    borderTopLeftRadius: 80,
    height: (height * 60) / 100,
    backgroundColor: colors.white,
    bottom: 0,
    elevation: 10,
    padding: 20,
    paddingTop: 50,
  },
  infoContainer: {
    // backgroundColor: "#e3e3e3",
    flex: 1,
  },
  headerInfo: {
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontFamily: "Tajawal-Bold",
    fontSize: 20,
    color: colors.softBlack,
  },
  ratingText: {
    fontFamily: "Tajawal-Bold",
    color: "grey",
    fontSize: 18,
    marginLeft: 5,
  },
  miniRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontFamily: "Tajawal-Bold",
    color: colors.softGreen,
    fontSize: 24,
    textAlign: "right",
    marginBottom: 10,
  },
  ratingStars: {
    flexDirection: "row",
  },
  ratingCount: {
    color: "grey",
    fontFamily: "Tajawal-Regular",
    fontSize: 16,
    marginRight: 5,
  },
  desc: {
    fontFamily: "Tajawal-Regular",
    fontSize: 18,
    textAlign: "right",
    color: colors.softBlack,
    marginVertical: 10,
  },
  textInputContainer: {
    backgroundColor: "#F0F1F3",
    width: "100%",
    alignSelf: "center",
    borderRadius: 20,
    minHeight: 100,
    marginBottom: 10,
  },
  textInput: {
    width: "100%",
    height: 100,
    textAlign: "right",
    color: "#515C6F",
    padding: 20,
    fontSize: 14,
    fontFamily: "Tajawal-Regular",
    textAlignVertical: "top",
    // backgroundColor: "red",
  },
  modalContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.blackTransparent,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  modal: {
    backgroundColor: colors.white,
    // height: '50%',
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 20
  },
  modalProductContainer: {
    // backgroundColor: '#e3e3e3',
    margin: 20,
    marginTop: 0,
    flexDirection: 'row-reverse',
    // jus: "center"
  },
  imageContainer: {
    // backgroundColor: 'red',
    width: 80,
    height: 80,
    borderRadius: 40,
    elevation: 5
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  productDetails: {
    // backgroundColor: 'red',
    flex: 1,
    marginRight: 10,
  },
  productName: {
    flex: 1,
    fontFamily: fonts.tajawalB,
    fontSize: 16,
    textAlign: 'right',
    color: colors.softBlack,
    // backgroundColor: 'red',
    textAlignVertical: "bottom"
  },
  qtyContainer: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: 'blue',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  qtyCalculator: {
    // backgroundColor: '#FFF',
    flexDirection: 'row',
    width: 100,
    justifyContent: "space-between"
  },
  counter: {
    fontFamily: fonts.tajawalR,
    fontSize: 14,
    color: colors.ebony,
  },
  counterContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 30,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.softWhite
  },
  qtyText: {
    fontFamily: fonts.tajawalR,
    fontSize: 14,
    color: colors.grey,
    textAlign: "right"
  },
  modalButtons: {
    flexDirection: 'row',
  },
  closeModal: {
    marginLeft: 20,
    alignSelf: 'flex-start',
  }
});
