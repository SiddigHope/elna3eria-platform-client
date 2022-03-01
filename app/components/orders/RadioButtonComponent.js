import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { colors, fonts } from '../../config/vars';
import elevations from '../../config/elevations';


const RadioButtonComponent = ({ selected, setSelected, item }) => {
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        checkSelected()
    }, [selected])

    const checkSelected = () => {
        if (selected != item.value) {
            setChecked(false)
        } else {
            setChecked(true)
        }
    }
    
    const changeOption = () => {
        setChecked(true)
        setSelected(item.value)
    }

    return (
        <Pressable onPress={changeOption} style={[styles.container, elevations[5], checked ? styles.borderedContainer : {}]}>
            {item.value == "CASH"? (
                <Image source={require("../../../assets/icons/cash-payment.png")} style={styles.image} />
            ) : (
                <Image source={require("../../../assets/icons/pngegg.png")} style={styles.image} />
            )}
            <Text style={styles.text}> {item.label} </Text>
            <Icon name='check-circle' size={20} color={checked ? colors.blueLight : colors.softWhite} />
        </Pressable>
    )
}

export default RadioButtonComponent

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 70,
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 5,
        marginVertical: 10
    },
    borderedContainer: {
        borderWidth: 0.5,
        borderColor: colors.blueLight,
    },
    text: {
        flex: 1,
        marginHorizontal: 10,
        textAlign: 'right',
        fontFamily: fonts.tajawalB,
        fontSize: 14,
    },
    image: {
        height: 40,
        width: 40
    }
})