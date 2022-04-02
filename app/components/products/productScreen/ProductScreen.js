import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Modal, Dimensions, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { getCategories } from "../../../config/apis/products/gets";
import { addDiscount, storeProduct, updateProduct } from "../../../config/apis/products/posts";
import { colors, fonts } from "../../../config/vars";
import ImageComponent from "./ImageComponent";
import ProductInfo from "./ProductInfo";
import { goToScreen } from '../../../config/functions';
import TextInputRender from "./TextInputRender";


const { width, height } = Dimensions.get("window")

export default class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: {},
      image: [],
      item: this.props.route.params.screen == "edit" ? this.props.route.params.item : [],
      screen: this.props.route.params.screen,
      editable: this.props.route.params.screen == "edit" ? false : true,
      discountModal: false,
      discount: this.props.route.params.screen == "edit" ? this.props.route.params.item.discount : 0,
      discountPlaceholder: "ادخل نسبة التخفيض",
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const categories = await getCategories()
    const subCategories = {}
    categories.forEach(element => {
      subCategories[element.id] = (element.children.map(child => ({
        value: child.id,
        label: child.name
      })))
    });
    this.setState({
      categories,
      subCategories,
    });
  };

  submitForm = async (data) => {
    const formData = new FormData()

    // if (this.state.image.length == 0) {
    //   // show error note
    //   console.log("this.state.image.length == 0")
    //   return
    // }
    console.log("this.state.image")
    console.log(this.state.image)

    // return

    formData.append("title", data.name)
    formData.append("category_id", data.subCategory)
    formData.append("main_category", data.category)
    formData.append("description", data.desc)
    formData.append("price", data.price)
    formData.append("contact_number", data.phone)
    formData.append("status", data.productStatus)
    if (this.state.image.length != 0) {
      for (const image of this.state.image) {
        formData.append('images[]', image)
      }
      // formData.append('images', this.state.image)
    }


    let stored = undefined
    if (this.state.screen == "edit") {
      stored = await updateProduct(formData, this.state.item.id)
    } else {
      stored = await storeProduct(formData)
    }

    if (stored) {
      goToScreen("Hiraj", this.props.navigation)
    }
  }

  discount = async () => {
    const data = {
      product_id: this.state.item.id,
      discount: this.state.discount,
    }

    // console.log(data)

    const add = await addDiscount(data)

    this.setState({
      discountModal: false
    })
    if (add) {
      console.log("discount added")
    } else {
      console.log("discount not added")
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Modal
          transparent={true}
          onBackdropPress={() => this.setState({ discountModal: false })}
          onSwipeComplete={() => this.setState({ discountModal: false })}
          onRequestClose={() => this.setState({ discountModal: false })}
          visible={this.state.discountModal}
          animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <TextInputRender
                type="discount"
                value={String(this.state.discount)}
                placeholder={this.state.discountPlaceholder}
                editable={this.props.editable}
                onChangeText={(discount) => this.setState({ discount })}
              />
              <TouchableOpacity onPress={this.discount} style={styles.discountBtn} >
                <Text style={styles.discountText}> {"اضافة"} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <StatusBar translucent style="dark" />
        <ImageComponent
          screen={this.state.screen}
          editable={this.state.editable}
          item={this.state.item}
          navigation={this.props.navigation}
          addDiscount={() => this.setState({ discountModal: true })}
          onChange={(image) => this.setState({ image })}
        />
        <ProductInfo
          categories={this.state.categories.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          makeEditable={() => this.setState({ editable: true })}
          editable={this.state.editable}
          item={this.state.item}
          subCategories={this.state.subCategories}
          screen={this.state.screen}
          submitForm={(data) => this.submitForm(data)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalContainer: {
    height,
    width,
    justifyContent: "center",
    backgroundColor: colors.blackTransparent
  },
  modal: {
    height: "20%",
    backgroundColor: colors.whiteF7,
    elevation: 10,
    margin: 20,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    padding: 20
  },
  discountBtn: {
    backgroundColor: colors.softGreen,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4,
    marginRight: 10,
    height: 50,
    elevation: 5,
    borderRadius: 10,
  },
  discountText: {
    fontFamily: fonts.tajawalB,
    fontSize: 12,
    color: colors.white
  }
});
