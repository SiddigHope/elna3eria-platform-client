import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { colors } from '../config/vars';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = () => {
    setTimeout(() => {
      this.props.navigation.navigate("Tabs", {
        navigation: this.props.navigation,
      });
    }, 3000);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={false} backgroundColor={colors.mainColor} style='light' />
        <Text> SplashScreen </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
