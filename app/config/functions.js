import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { colors, fonts } from "./vars";
import SnackBar from "react-native-snackbar-component";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const goToScreen = (screen, navigation, props) => {
  let parameters = props ? props : {}

  navigation.navigate(screen, parameters);
};

export function ShowSnackbar({ text, backgroundColor, show, closeSnackbar }) {
  useEffect(() => {
    setTimeout(() => {
      closeSnackbar();
    }, 3000)
  }, [show]);
  return (
    <SnackBar
      visible={show}
      textMessage={text}
      backgroundColor={backgroundColor}
      containerStyle={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
      messageStyle={{ fontFamily: fonts.tajawalR, flex: 1, textAlign: 'right', alignSelf: 'center', }}
    />
  );
}

export const addToCart = async (item, store_id) => {
  const stringCart = await AsyncStorage.getItem("cart" + store_id)
  if (stringCart != null) {
    const jsonCart = JSON.parse(stringCart)
    jsonCart.push(item)
    // console.log(jsonCart)
    // console.log(jsonCart.length)
    AsyncStorage.setItem("cart" + store_id, JSON.stringify(jsonCart))
    console.log("new item has been saved to an existing cart")

  } else {
    const cartArray = [item]
    AsyncStorage.setItem("cart" + store_id, JSON.stringify(cartArray))
    console.log("new item has been saved to new cart instance")
  }
}

export const removeItemFromCart = async (order_id, store_id) => {
  const stringCart = await AsyncStorage.getItem("cart" + store_id)
  if (stringCart != null) {
    console.log(order_id)
    console.log("length of two objects")
    const jsonCart = JSON.parse(stringCart)
    const filteredCart = jsonCart.filter(element => element.order_id != order_id)
    console.log(jsonCart.length + "  " + filteredCart.length)
    AsyncStorage.setItem("cart" + store_id, JSON.stringify(filteredCart))
    console.log("an item has been removed from the cart")
  } else {
    // console.log("item doesn't exist")
    console.log("the cart is empty")
  }
}

export const removeAllCart = async (store_id) => {
  AsyncStorage.removeItem("cart" + store_id)
  return true
}

export const getCartItem = async (store_id) => {
  const stringCart = await AsyncStorage.getItem("cart" + store_id)
  if (stringCart != null) {
    return JSON.parse(stringCart)
  } else {
    // console.log("item doesn't exist")
    console.log("the cart is empty")
    return []
  }
}

export const getCartTotal = async (store_id) => {
  const stringCart = await AsyncStorage.getItem("cart" + store_id)
  if (stringCart != null) {
    const jsonCart = JSON.parse(stringCart)
    let total = 0
    jsonCart.map((item) => {
      total += Number(item.total)
    })
    return total
  } else {
    // console.log("item doesn't exist")
    console.log("the cart is empty")
    return 0
  }
}

export const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}