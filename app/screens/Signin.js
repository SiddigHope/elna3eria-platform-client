import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SigninComponent from "../components/authentication/signin/SigninComponent";
import { login } from '../config/apis/authentication';
import UserClass from '../config/authHandler';
import { goToScreen, ShowSnackbar } from '../config/functions';
import { colors } from '../config/vars';

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      loading: false,
      backgroundColor: "",
      show: false,
    };
  }

  componentDidMount() {
    this.checkUser();
  }
  componentDidUpdate() {
    this.checkUser();
  }

  checkUser = async () => {
    // UserClass.logout()
    const check = await UserClass.isAuthenticated()
    if (check) {
      goToScreen("Tabs", this.props.navigation)
    }
  }

  toggleSnackbar = (text, backgroundColor,) => {
    this.setState({
      text,
      backgroundColor,
      show: true,
      loading: false
    })
  }

  login = async (data) => {
    this.setState({ loading: true })

    const user = await login(data)

    if (user) {
      UserClass.setUser(user)
      this.setState({
        loading: false
      })

      if (user.client.is_verified) {
        goToScreen("Tabs", this.props.navigation)
      } else {
        goToScreen("Verification", this.props.navigation, { email: user.client.email })
      }

    } else {
      this.toggleSnackbar("تأكد من بياناتك فضلك و اعد المحاولة", colors.danger)
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
        <SigninComponent loading={this.state.loading} _showSnackbar={this.toggleSnackbar} login={this.login} navigation={this.props.navigation} />
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
    height: '100%',
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  }
})