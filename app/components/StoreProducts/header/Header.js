import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Linking, Alert, Dimensions } from "react-native";
import { colors } from "../../../config/vars";
import RoundedIcons from "./RoundedIcons";
import Input from "./Input";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/Feather";
import { getCartItem, goToScreen } from "../../../config/functions";

const { width, height } = Dimensions.get("window")

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemsCount: 0
    };
  }

  componentDidMount() {
    console.log("this.props.hraj header")
    console.log(this.props.hraj)
    this.getCartCount()
    const navigation = this.props.navigation

    this.focusLister = navigation.addListener("focus", () => {
      this.getCartCount()
    })
  }

  componentWillUnmount() {
    const navigation = this.props.navigation
    navigation.removeListener("focus")
  }

  getCartCount = async () => {
    const cart = await getCartItem(this.props.store.id)
    this.setState({
      cartItemsCount: cart.length
    })
  }

  whatsapp = () => {
    goToScreen("Chat", this.props.navigation, { receiver: this.props.store, type: "store" })
    // const link = "https://wa.me/" + "249920035753"
    // Linking.canOpenURL(link)
    //   .then(supported => {
    //     if (!supported) {
    //       Alert.alert(
    //         'قم بتنزيل تطبيق الواتساب للمراسلة الفورية او بامكانك استحدام حاصية الاتصال المباشر'
    //       );
    //     } else {
    //       return Linking.openURL(link);
    //     }
    //   })
    //   .catch(err => console.error('An error occurred', err));
  }

  render() {
    // console.log("store")
    // console.log(this.props.store)
    return (
      <View
        style={[styles.container]}
      >
        <View style={[styles.headerContainer, { minHeight: 50 }]}>
          <View style={styles.icons}>
            {!this.props.hraj && !this.props.hospital && (
              <>
                <RoundedIcons
                  onPress={() => goToScreen("Cart", this.props.navigation, { store: this.props.store, oneItem: false })}
                  items={this.state.cartItemsCount}
                  type="cart"
                />
                <RoundedIcons
                  onPress={this.props.setFav}
                  type="fav"
                  items={0}
                  fav={this.props.fav}
                />
              </>
            )}

            {this.props.hraj && (
              <RoundedIcons
                onPress={() => goToScreen("Hiraj", this.props.navigation, { store: this.props.store })}
                type="hraj"
                items={0}
                fav={this.props.fav}
              />
            )}

            {this.props.hospital && (
              <>
                <RoundedIcons
                  onPress={() => goToScreen("DoctorAppointments", this.props.navigation, { store: this.props.store })}
                  type="appointment"
                  items={0}
                  fav={this.props.fav}
                />
              </>
            )}
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.hello}> {"مرحبا بك في"} </Text>
            <Text style={[styles.storeTitle, this.props.hospital && { fontSize: 16 }]}>{this.props.hraj && "حراج"} {this.props.store.name} </Text>
          </View>
          {this.props.hospital && (
            <>
              <RoundedIcons
                onPress={this.props.showHospitalProfile}
                type="hospitalProfile"
                items={0}
                fav={this.props.fav}
              />
            </>
          )}
        </View>
        <View style={styles.headerContainer}>
          <Input
            closeSearching={this.props.closeSearching}
            onChangeText={this.props.onChangeText}
            searching={this.props.searching}
            hospital={this.props.hospital}
          />
          {!this.props.hraj && !this.props.hospital && (
            <RoundedIcons onPress={this.whatsapp} items={0} type="chat" />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 155,
    width: width,
    // backgroundColor: 'red',
    alignItems: "center",
    marginTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    width: (width * 90) / 100,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    // backgroundColor: "blue"
    // flexWrap: "wrap-reverse",
  },
  headerTextContainer: {
    height: 70,
    // backgroundColor: 'red',
    // alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  hello: {
    fontFamily: "Tajawal-Regular",
    fontSize: 18,
    color: "grey",
  },
  storeTitle: {
    fontFamily: "Tajawal-Bold",
    flex: 1,
    fontSize: 18,
    maxWidth: width - 90,
    // height: 40,
    // backgroundColor: "red",
    // flexWrap: "wrap",
    color: colors.softBlack,
  },
  icons: {
    flexDirection: "row",
  }
});
