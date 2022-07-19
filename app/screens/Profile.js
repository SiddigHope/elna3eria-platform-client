import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, BackHandler } from "react-native";
import MiniHeader from "../components/MiniHeader";
import ProfileComponent from "../components/profile/ProfileComponent";
import Header from "../config/header/Header";
import { colors } from '../config/vars';

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
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.whiteF7} translucent={false} />
        <MiniHeader title="profile" navigation={this.props.navigation} />
        <ProfileComponent navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: colors.whiteF7
  }
})