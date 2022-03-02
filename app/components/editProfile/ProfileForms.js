import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../config/vars';
import TextInputRender from './TextInputRender';

export default class ProfileForms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            block: "",
            address: "",
            street: "",
            phone: "",
            namePlaceholder: "ادخل اسمك كاملا من فضلك",
            emailPlaceholder: "الايميل الخاص بك",
            blockPlaceholder: " تفاصيل المنطقة",
            addressPlaceholder: "العنوان",
            streetPlaceholder: "تفاصيل الشارع",
            phonePlaceholder: "رقم الهاتف الخاص بك"
        };
    }

    componentDidMount() {
        this.getUser()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.name != this.state.name) {
            this.setState({
                name: nextProps.user.name,
                email: nextProps.user.email,
                block: nextProps.user.location ? nextProps.user.location[0].block : "",
                address: nextProps.user.location ? nextProps.user.location[0].address : "",
                street: nextProps.user.location ? nextProps.user.location[0].street : "",
                phone: nextProps.user.phone
            })
        }
    }

    getUser = () => {
        const { user } = this.props
        this.setState({
            name: user.name,
            email: user.email,
            block: user.location ? user.location[0].block : "",
            address: user.location ? user.location[0].address : "",
            street: user.location ? user.location[0].street : "",
            phone: user.phone
        })
    }

    submitForm = () => {
        const { name, email, phone, address, block, street } = this.state

        if (name, email) {
            const data = {
                name,
                phone,
                email,
                location: [{
                    address,
                    block,
                    street
                }]
            }
            this.props.submitForm(data)
        } else {
            this.setState({
                loading: false,
                snackbarBackgroundColor: colors.danger,
                snackbarText: "عفوا تأكد من صحة البيانات",
                showSnackbar: true,
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label} > {"الإسم"} </Text>
                <TextInputRender
                    type={"name"}
                    placeholder={this.state.namePlaceholder}
                    value={this.state.name}
                    onChange={(name) => this.setState({ name })}
                />

                <Text style={styles.label} > {"رقم الهاتف"} </Text>
                <TextInputRender
                    type={"phone"}
                    placeholder={this.state.phonePlaceholder}
                    value={this.state.phone}
                    onChange={(phone) => this.setState({ phone })}
                />

                <Text style={styles.label} > {"الإيميل"} </Text>
                <TextInputRender
                    type={"email"}
                    placeholder={this.state.emailPlaceholder}
                    value={this.state.email}
                    onChange={(email) => this.setState({ email })}
                />

                <Text style={styles.label} > {"السكن"} </Text>
                <TextInputRender
                    type={"address"}
                    placeholder={this.state.addressPlaceholder}
                    value={this.state.address}
                    onChange={(address) => this.setState({ address })}
                />

                <TextInputRender
                    type={"block"}
                    placeholder={this.state.blockPlaceholder}
                    value={this.state.block}
                    onChange={(block) => this.setState({ block })}
                />

                <TextInputRender
                    type={"street"}
                    placeholder={this.state.streetPlaceholder}
                    value={this.state.street}
                    onChange={(street) => this.setState({ street })}
                />

                <TouchableOpacity onPress={this.submitForm} style={styles.btn}>
                    <Text style={styles.btnText}> {"حفط البيانات"} </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    label: {
        fontFamily: fonts.tajawalB,
        fontSize: 14,
        textAlign: "right",
        color: colors.ebony
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: colors.mainColor,
        borderRadius: 10,
        elevation: 10,
        marginVertical: 20
    },
    btnText: {
        fontFamily: fonts.tajawalB,
        color: colors.white,
        fontSize: 16,
        letterSpacing: 2
    }
})