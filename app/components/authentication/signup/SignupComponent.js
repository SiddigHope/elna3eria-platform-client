import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Dimensions } from 'react-native';
import { colors, fonts } from '../../../config/vars';
import SocialMedia from './SocialMedia';
import TextInputRender from './TextInputRender';


const { width, height } = Dimensions.get("window")

export default class SignupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            secureTextEntry: true
        };
    }

    _register = async () => {
        const { name, email, password } = this.state

        if (email && password && name) {
            const data = {
                email,
                password,
                name
            }

            this.props.register(data)


        } else {
            this.props._showSnackbar("تأكد من ملئ جمبع الحقول بشكل صحيح", colors.danger)
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={[styles.signinText, { color: colors.grey }]}> {"تسجيل جديد"} </Text>
                <View style={styles.socialMedia}>
                    <SocialMedia type="facebook" navigation={this.props.navigation} />
                    <SocialMedia type="google" navigation={this.props.navigation} />
                </View>
                <Text style={styles.emailOption}> {"او التسجيل بالبريد الالكتروني"} </Text>

                <TextInputRender
                    placeholder="الاسم كاملا"
                    value={this.state.name}
                    secureTextEntry={false}
                    onChange={(name) => this.setState({ name })}
                />

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




                <Pressable onPress={this._register} style={styles.btnContainer}>
                    {this.props.loading ? (
                        <ActivityIndicator color={colors.white} size="large" />
                    ) : (
                        <Text style={styles.btnText}> {"تسجيل"} </Text>
                    )}
                </Pressable>

                <View style={styles.nestedText}>
                    <Text style={styles.parentText}>{"بالضغط على تسجبل أوكد انني قرات ووافقت على"}<Text style={styles.childText}> {"الشروط و الاحكام"} </Text> {"بالاضافة الى"} <Text style={styles.childText}> {"سياسة الخصوصية"} </Text> </Text>
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