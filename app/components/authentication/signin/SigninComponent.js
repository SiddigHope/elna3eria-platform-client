import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { colors, fonts } from '../../../config/vars';
import SocialMedia from './SocialMedia';
import TextInputRender from './TextInputRender';
import { goToScreen } from '../../../config/functions';
import elevations from '../../../config/elevations';

export default class SigninComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            secureTextEntry: true
        };
    }

    _login = async () => {
        const { email, password } = this.state

        if (email && password) {
            const data = {
                email,
                password
            }

            this.props.login(data)


        } else {
            this.props._showSnackbar("تأكد من ملئ جمبع الحقول بشكل صحيح", colors.danger)
        }
    }

    goToSignup = () => {
        goToScreen("Signup", this.props.navigation)
    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.signinText}> {"تسجيل الدخول"} </Text>
                {/* <Text style={[styles.signinText, { color: colors.grey }]}> {"حسابك"} </Text> */}
                <View style={styles.socialMedia}>
                    <SocialMedia type="facebook" navigation={this.props.navigation} />
                    <SocialMedia type="google" navigation={this.props.navigation} />
                </View>
                <Text style={styles.emailOption}> {"او تسجيل الدخول بالبريد الالكتروني"} </Text>

                <TextInputRender
                    placeholder="email@example.com"
                    value={this.state.email}
                    secureTextEntry={false}
                    onChange={(email) => this.setState({ email })}
                />

                <TextInputRender
                    placeholder="كلمة المرور"
                    value={this.state.password}
                    showPassword={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })}
                    secureTextEntry={this.state.secureTextEntry}
                    onChange={(password) => this.setState({ password })}
                />

                <Pressable onPress={this._login} style={[styles.btnContainer, elevations[10]]}>
                    {this.props.loading ? (
                        <ActivityIndicator color={colors.white} size="large" />
                    ) : (
                        <Text style={styles.btnText}> {"تسجيل الدخول"} </Text>
                    )}
                </Pressable>

                <View style={styles.nestedText}>
                    <Text style={styles.parentText}>{"بالضغط على تسجبل الدخول أوكد انني قرات ووافقت على"}<Text style={styles.childText}> {"الشروط و الاحكام"} </Text> {"بالاضافة الى"} <Text style={styles.childText}> {"سياسة الخصوصية"} </Text> </Text>
                </View>
                <Text style={styles.signupText}> {"ليس لديك حساب؟"} <Text onPress={this.goToSignup} style={styles.signupLink}> {"انشاء حساب حديد"} </Text> </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        // backgroundColor: colors.white,
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
        marginVertical: 40,
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
        textAlign:"right"
        // backgroundColor: "red"
    },
    childText: {
        fontFamily: fonts.tajawalB,
        fontSize: 12,
        color: colors.softBlack,
        textDecorationLine: 'underline'
    },
    signupText: {
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        color: colors.grey,
    },
    signupLink: {
        fontFamily: fonts.tajawalB,
        fontSize: 14,
        color: colors.mainColor,
        textDecorationLine: 'underline'
    },

})