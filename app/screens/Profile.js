import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, BackHandler } from "react-native";
import MiniHeader from "../components/MiniHeader";
import ProfileComponent from "../components/profile/ProfileComponent";
import Header from "../config/header/Header";
import { colors } from '../config/vars';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import GestureRecognizer from "react-native-swipe-gestures";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
      <GestureRecognizer
        onSwipeRight={() => this.props.navigation.closeDrawer()}
        style={styles.container}
      >
        {/* <View > */}
        <StatusBar backgroundColor={colors.whiteF7} translucent={false} />

        <ProfileComponent navigation={this.props.navigation} />
        {/* </View> */}
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.ebony
  },
})