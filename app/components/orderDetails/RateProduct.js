import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import { colors, fonts } from '../../config/vars';
import Icon2 from "react-native-vector-icons/MaterialIcons";

export default class RateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            star1: "star-outline",
            star2: "star-outline",
            star3: "star-outline",
            star4: "star-outline",
            star5: "star-outline",
            ratingComment: ""
        };
    }

    setRating = (rating) => {
        switch (rating) {
            case 1:
                this.setState({
                    star1: "star",
                    star2: "star-outline",
                    star3: "star-outline",
                    star4: "star-outline",
                    star5: "star-outline",
                })
                break;
            case 2:
                this.setState({
                    star1: "star",
                    star2: "star",
                    star3: "star-outline",
                    star4: "star-outline",
                    star5: "star-outline",
                })
                break;
            case 3:
                this.setState({
                    star1: "star",
                    star2: "star",
                    star3: "star",
                    star4: "star-outline",
                    star5: "star-outline",
                })
                break;
            case 4:
                this.setState({
                    star1: "star",
                    star2: "star",
                    star3: "star",
                    star4: "star",
                    star5: "star-outline",
                })
                break;
            case 5:
                this.setState({
                    star1: "star",
                    star2: "star",
                    star3: "star",
                    star4: "star",
                    star5: "star",
                })
                break;

            default:
                break;
        }
    }

    _itemSeparator = () => (
        <View style={{ height: 20 }} />
    )

    _listHeader = () => (
        <View style={{ height: 20 }} />
    )

    _listFooter = () => (
        <View style={{ height: 80 }} />
    )

    _renderItem = (item, index) => (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer} >
                <Image style={styles.image} source={{ uri: item.item.product.image }} />
            </View>
            <View style={styles.ratingContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={"اكتب تعليقاً"}
                        value={this.state.ratingComment}
                        placeholderTextColor={""}
                        onChangeText={(ratingComment) => this.setState({ ratingComment })}
                    />
                </View>
                <View style={styles.ratingStars}>
                    <Icon2 onPress={() => this.setRating(1)} name={this.state.star1} color={colors.ratingYellow} size={25} />
                    <Icon2 onPress={() => this.setRating(2)} name={this.state.star2} color={colors.ratingYellow} size={25} />
                    <Icon2 onPress={() => this.setRating(3)} name={this.state.star3} color={colors.ratingYellow} size={25} />
                    <Icon2 onPress={() => this.setRating(4)} name={this.state.star4} color={colors.ratingYellow} size={25} />
                    <Icon2 onPress={() => this.setRating(5)} name={this.state.star5} color={colors.ratingYellow} size={25} />
                </View>
            </View>
        </View>
    )


    render() {
        const { order } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.subtitle} > {"رأيك يهمنا ..."} </Text>
                <FlatList
                    data={order.details}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this._listHeader}
                    style={{ width: "100%" }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    ListFooterComponent={this._listFooter}
                    ItemSeparatorComponent={this._itemSeparator}
                    renderItem={this._renderItem} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.softWhite,
        elevation: 10,
        width: "100%",
        alignItems: 'center',
        padding: 20,
        borderRadius: 10
    },
    subtitle: {
        color: colors.white,
        alignSelf: "flex-end",
        fontFamily: fonts.tajawalB,
        // marginBottom: 10
    },
    ratingStars: {
        flexDirection: "row-reverse",
        // marginVertical: 5
    },
    itemContainer: {
        width: "80%",
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: "red"
    },
    imageContainer: {
        height: 80,
        width: 80,
        borderRadius: 10,
        backgroundColor: colors.mainColor,
        elevation: 5,
        // alignSelf: "flex-end"
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    ratingContainer: {
        // flex: 1,
        // justifyContent: 'center',
        marginRight: 10
    },
    textInputContainer: {
        width: "100%",
        height: 60,
        // backgroundColor: colors.white,
        // elevation: 5,
        // borderRadius: 15,
        // marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor
    },
    textInput: {
        width: "100%",
        height: "100%",
        fontFamily: fonts.tajawalR,
        fontSize: 16,
        // paddingHorizontal: 20,
        color: colors.softBlack,
        textAlign: 'right',
    }
})