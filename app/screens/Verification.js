import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import VerificationComponent from "../components/authentication/verification/VerificationComponent";
import { verify, resendCode } from '../config/apis/authentication';
import { goToScreen, ShowSnackbar } from '../config/functions';
import { colors } from '../config/vars';

export default class Verification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            loading: false,
            backgroundColor: "",
            show: false,
            resent: false
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

    verify = async (data) => {
        this.setState({ loading: true })

        const verified = await verify(data)

        if (verified) {
            this.setState({
                loading: false
            })
            goToScreen("Tabs", this.props.navigation)
        } else {
            this.toggleSnackbar("تأكد من صحة الرمز و اعد المحاولة", colors.danger)
        }
    }

    resend = async () => {
        const resend = await resendCode()
        if (resend) {
            this.setState({
                resent: true
            })

            setTimeout(() => {
                this.setState({resent: false})
            } , 50000)
        } else {
            this.toggleSnackbar("من فضلك اعد المحاولة", colors.danger)
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <VerificationComponent resend={this.resend} resent={this.state.resent} email={this.props.route.params.email} loading={this.state.loading} _showSnackbar={this.toggleSnackbar} verify={this.verify} navigation={this.props.navigation} />
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