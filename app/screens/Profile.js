import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, BackHandler } from "react-native";
import MiniHeader from "../components/MiniHeader";
import ProfileComponent from "../components/profile/ProfileComponent";
import Header from "../config/header/Header";
import { colors } from '../config/vars';
import { DrawerContentScrollView } from '@react-navigation/drawer';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // const navigation = this.props.navigation
    // navigation.addListener("focus", () => {
    //   this.setState(this.state)
    // })
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  // componentWillUnmount() {
  //   const navigation = this.props.navigation
  //   navigation.removeListener("focus")
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  // }

  handleBackPress = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        'إنهاء التطبيق',
        'هل حقاً تريد إنهاء التطبيق',
        [
          {
            text: 'لا',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'نعم', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false },
      );
      return true;
    }
    // return true;  // Do nothing when back button is pressed
  };


  render() {
    return (
      <DrawerContentScrollView contentContainerStyle={{ alignItems: "center", }} style={styles.container}>
        <StatusBar backgroundColor={colors.whiteF7} translucent={false} />
        <MiniHeader title="profile" navigation={this.props.navigation} />
        {/* <ScrollView> */}
        <ProfileComponent navigation={this.props.navigation} />
        {/* </ScrollView> */}
      </DrawerContentScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,

    // justifyContent: "center",
    backgroundColor: colors.ebony
  }
})