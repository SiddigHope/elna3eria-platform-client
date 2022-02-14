import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SignupComponent from "../components/authentication/signup/SignupComponent";
import { register } from '../config/apis/authentication';
import UserClass from '../config/authHandler';
import { goToScreen, ShowSnackbar } from '../config/functions';
import { colors } from '../config/vars';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      loading: false,
      backgroundColor: "",
      show: false,
    };
  }

  toggleSnackbar = (text, backgroundColor,) => {
    this.setState({
      text,
      backgroundColor,
      show: true,
      loading: false
    })
  }

  register = async (data) => {
    this.setState({ loading: true })

    const user = await register(data)

    if (user) {
      UserClass.setUser(user)
      this.setState({
        loading: false
      })
      if (user.client.is_verified) {
        goToScreen("Tabs", this.props.navigation)
      } else {
        goToScreen("Verification", this.props.navigation, {email: user.client.email})
      }

    } else {
      this.toggleSnackbar("تأكد من بياناتك فضلك و اعد المحاولة", colors.danger)
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <SignupComponent loading={this.state.loading} _showSnackbar={this.toggleSnackbar} register={this.register} navigation={this.props.navigation} />
        <ShowSnackbar
          show={this.state.show}
          closeSnackbar={() => this.setState({ show: false })}
          text={this.state.text}
          backgroundColor={this.state.backgroundColor}
        />
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  }
})