import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { colors, fonts } from "../../../config/vars";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextInputRender from "./TextInputRender";
import { goToScreen, ShowSnackbar } from "../../../config/functions";
import RNPickerSelect from "react-native-picker-select";
import { elevations } from '../../../config/elevations';

const { width, height } = Dimensions.get("window");

export default class ProductForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      namePlaceholder: 'اسم المنتج',
      price: "",
      pricePlaceholder: 'السعر',
      desc: '',
      phonePlaceholder: 'رقم هاتف للتواصل',
      phone: '',
      whatsappPlaceholder: 'رقم هاتف خاص بالواتساب',
      whatsapp: '',
      descPlaceholder: 'اكتب وصف المنتج...',
      category: 1,
      loading: false,
      showSnackbar: false,
      snackbarText: "",
      snackbarBackgroundColor: "",
      item: [],
      subCategory: 0,
      productStatus: ""
    };
  }

  componentDidMount() {
    if (this.props.screen == "edit") {
      this.getData()
    }
  }

  getData = () => {

    // return console.log(this.props.item.category_id)
    this.setState({
      name: this.props.item.title,
      price: String(this.props.item.price),
      desc: this.props.item.description,
      category: this.props.item.main_category,
      subCategory: this.props.item.category_id,
      phone: this.props.item.contact_number,
      productStatus: this.props.item.status,
    });
  }

  submitForm = async () => {
    this.setState({
      loading: true
    })
    const { name, price, desc, category, phone, productStatus, whatsapp, subCategory } = this.state;
    if (name && price && desc && category, phone) {
      // this.setState({
      //   loading: true
      // })
      const data = {
        name,
        category,
        price,
        desc,
        subCategory,
        phone,
        whatsapp,
        productStatus
      }

      // return console.log(data)
      this.props.submitForm(data)
    } else {
      this.setState({
        loading: false,
        snackbarBackgroundColor: colors.danger,
        snackbarText: "عفوا تأكد من صحة البيانات",
        showSnackbar: true,
      });
    }
  };

  render() {
    // console.log("this.props.subCategories")
    // console.log(this.props.subCategories)
    return (
      <KeyboardAvoidingView
        behavior={(Platform.OS === 'ios') ? "padding" : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
        style={styles.container}
      >

        <View style={styles.rowInputs} >
          <TextInputRender
            type="name"
            value={this.state.name}
            placeholder={this.state.namePlaceholder}
            editable={this.props.editable}
            onChangeText={(name) => this.setState({ name })}
          />
        </View>
        <View style={styles.rowInputs}>
          <View style={styles.categoryContainer}>
            <View style={[styles.textInputContainer, elevations[5]]}>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                textInputProps={{ placeholderTextColor: colors.softBlack }}
                placeholder={{ label: "قسم المنتج", value: "0" }}
                style={{
                  inputAndroid: styles.textInput,
                  inputIOS: styles.textInput,
                  placeholder: { color: colors.softBlack },
                }}
                disabled={!this.props.editable}
                value={this.state.category}
                onValueChange={(value) => this.setState({ category: value })}
                items={this.props.categories}
              />
            </View>
          </View>
          <View style={styles.priceContainer}>
            <TextInputRender
              type="price"
              editable={this.props.editable}
              placeholder={this.state.pricePlaceholder}
              value={this.state.price}
              onChangeText={(price) => this.setState({ price })}
            />
          </View>
        </View>
        <View style={styles.rowInputs}>
          <View style={styles.categoryContainer}>
            <View style={[styles.textInputContainer, elevations[5]]}>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                textInputProps={{ placeholderTextColor: colors.softBlack }}
                placeholder={{ label: "القسم الفرعي", value: "0" }}
                style={{
                  inputAndroid: styles.textInput,
                  inputIOS: styles.textInput,
                  placeholder: { color: colors.softBlack },
                }}
                disabled={!this.props.editable}
                value={this.state.subCategory}
                onValueChange={(value) => this.setState({ subCategory: value })}
                items={Object.keys(this.props.subCategories).length != 0 ? this.props.subCategories[this.state.category] : []}
              />
            </View>
          </View>
          <View style={styles.categoryContainer}>
            <View style={[styles.textInputContainer, elevations[5], { marginRight: 5 }]}>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                textInputProps={{ placeholderTextColor: colors.softBlack }}
                placeholder={{ label: "حالة المنتج", value: "0" }}
                style={{
                  inputAndroid: styles.textInput,
                  inputIOS: styles.textInput,
                  placeholder: { color: colors.softBlack },
                }}
                disabled={!this.props.editable}
                value={this.state.productStatus}
                onValueChange={(value) => this.setState({ productStatus: value })}
                items={this.props.productStatus}
              />
            </View>
          </View>
        </View>

        <View style={styles.rowInputs} >
          <TextInputRender
            type="phone"
            value={this.state.phone}
            placeholder={this.state.phonePlaceholder}
            editable={this.props.editable}
            onChangeText={(phone) => this.setState({ phone })}
          />
        </View>


        <View style={styles.rowInputs} >
          <TextInputRender
            type="whatsapp"
            value={this.state.whatsapp}
            placeholder={this.state.whatsappPlaceholder}
            editable={this.props.editable}
            onChangeText={(whatsapp) => this.setState({ whatsapp })}
          />
        </View>

        <TextInputRender
          type="desc"
          value={this.state.desc}
          editable={this.props.editable}
          placeholder={this.state.descPlaceholder}
          onChangeText={(desc) => this.setState({ desc })}
        />
        <Pressable onPress={this.props.editable ? this.submitForm : this.props.makeEditable}>
          <LinearGradient
            colors={[colors.mainColor, colors.mainColor, "#F4C343"]}
            style={[styles.btn, elevations[5]]}
          >
            {this.state.loading ? (
              <ActivityIndicator color={colors.white} size="large" />
            ) : this.props.editable ? (
              <Text style={styles.btnText}> {"تأكيد العملية"} </Text>
            ) : (
              <Text style={styles.btnText}> {"تعديل بيانات المنتج"} </Text>
            )}
          </LinearGradient>
        </Pressable>
        <ShowSnackbar
          backgroundColor={this.state.snackbarBackgroundColor}
          text={this.state.snackbarText}
          show={this.state.showSnackbar}
          closeSnackbar={() => this.setState({ showSnackbar: false })}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    // height: (height),
    // width: (width * 95) / 100,
    paddingHorizontal: 10,
    // backgroundColor: "#e3e3e3",
    // justifyContent: "center",
    // elevation: 5
  },
  textInputContainer: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#FFF",
    elevation: 5,
    marginVertical: 10,
  },
  textInput: {
    height: "100%",
    color: colors.softBlack,
    fontFamily: fonts.tajawalR,
    fontSize: 14,
    textAlign: "center",
  },
  btn: {
    marginVertical: 10,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#FF1D3D",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  btnText: {
    color: colors.white,
    fontFamily: fonts.tajawalR,
    fontSize: 16,
  },
  rowInputs: {
    flexDirection: "row-reverse",
    alignItems: "center",
    // backgroundColor: 'red',
    justifyContent: 'space-between'
  },
  categoryContainer: {
    flex: 0.69,
    // backgroundColor: 'blue'
  },
  priceContainer: {
    flex: 0.3,
    // backgroundColor: 'blue'
  }
});

//#FF1D3D
