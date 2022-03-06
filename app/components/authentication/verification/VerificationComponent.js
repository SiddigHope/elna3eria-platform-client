import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Dimensions } from 'react-native';
import elevations from '../../../config/elevations';
import { colors, fonts } from '../../../config/vars';
import TextInputRender from './TextInputRender';


const { width, height } = Dimensions.get("window")

export default class SignupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            secureTextEntry: true,
            color: colors.softBlack
        };
    }

    _verify = async () => {
        const { code } = this.state

        if (code) {
            const data = {
                code,
            }

            this.props.verify(data)


        } else {
            this.props._showSnackbar("تأكد من ملئ جمبع الحقول بشكل صحيح", colors.danger)
        }
    }

    render() {
        return (
            <View style={styles.container} >

                <Text style={styles.emailOption}> {"تم ارسال رمز التحقق على الايميل"} </Text>
                <Text style={[styles.signinText, { color: colors.grey }]}> {this.props.email.toLowerCase()} </Text>

                <TextInputRender
                    placeholder="ادخل رمز التحقق"
                    value={this.state.code}
                    secureTextEntry={false}
                    onChange={(code) => this.setState({ code })}
                />


                <Pressable onPress={this._verify} style={[styles.btnContainer, elevations[10]]}>
                    {this.props.loading ? (
                        <ActivityIndicator color={colors.white} size="large" />
                    ) : (
                        <Text style={styles.btnText}> {"تحقق"} </Text>
                    )}
                </Pressable>

                {!this.props.resent && (
                    <Text onPress={() => {
                        this.setState({
                            color: colors.blueLight
                        })
                        this.props.resend()
                    }} style={[styles.resend, { color: this.state.color }]}> {"اعادة ارسال"} </Text>
                )}

                <View style={styles.nestedText}>
                    <Text style={styles.parentText}>{"بالضغط على تحقق أوكد انني قرات ووافقت على"}<Text style={styles.childText}> {"الشروط و الاحكام"} </Text> {"بالاضافة الى"} <Text style={styles.childText}> {"سياسة الخصوصية"} </Text> </Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        // backgroundColor: colors.white,
        height: height,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signinText: {
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.softBlack,
        marginVertical: 10
    },
    socialMedia: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 30,
    },
    emailOption: {
        fontFamily: fonts.tajawalR,
        color: colors.grey
    },
    btnContainer: {
        backgroundColor: colors.mainColor,
        width: "100%",
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        marginTop: 20,
    },
    btnText: {
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.white
    },
    nestedText: {
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 10
    },
    parentText: {
        fontFamily: fonts.tajawalR,
        fontSize: 12,
        color: colors.grey,
        lineHeight: 30,
        // backgroundColor: "red"
    },
    childText: {
        fontFamily: fonts.tajawalB,
        fontSize: 12,
        color: colors.softBlack,
        textDecorationLine: 'underline'
    },
    resend: {
        fontFamily: fonts.tajawalR,
        fontSize: 16,
        color: colors.softBlack,
        // backgroundColor: 'red',
        alignSelf: "flex-end",
        textDecorationLine: 'underline',
        marginTop: 10
    },
})