import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Pressable } from 'react-native';
import { colors, fonts } from '../../config/vars';
import Icon2 from "react-native-vector-icons/MaterialIcons";
import RateProductComponent from './RateProductComponent';

export default class RateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: [{ id: 2, comment: "this is a comment" }]
        };
    }

    componentDidMount() {
        this.setRating(2, 2)
    }


    setRating = (stars, id) => {
        const { rating } = this.state

        if (rating.length != 0) {
            const item = rating.find((item) => item.id == id)
            if (item) {
                item.stars = stars
                this.setState({
                    rating
                })

                console.log(rating)
            }
        } else {
            this.setState({
                rating: [{ id, stars }]
            })
        }
    }

    setCommentText = (text, id) => {
        const { rating } = this.state

        if (rating.length != 0) {
            const item = rating.find((item) => item.id == id)
            if (item) {
                item.comment = text
                this.setState({
                    rating
                })

                console.log(rating)
            }
        } else {
            this.setState({
                rating: [{ id, comment }]
            })
        }
    }

    rateProducts = (text, id) => {
        const { rating } = this.state

        if (rating.length != 0) {
            const item = rating.find((item) => item.id == id)
            if (item) {
                item.comment = text
                this.setState({
                    rating
                })

                console.log(rating)
            }
        } else {
            this.setState({
                rating: [{ id, comment }]
            })
        }
    }




    _itemSeparator = () => (
        <View style={{ height: 20 }} />
    )

    _listHeader = () => (
        <View style={{ height: 20 }} />
    )

    _listFooter = () => (
        <View style={{ height: 50 }} />
    )

    _renderItem = (item, index) => (
        <RateProductComponent item={item.item} setRatingStars={this.setRating} setCommentText={this.setCommentText} />
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
                    renderItem={this._renderItem}
                />
                <View style={styles.btnContainer}>
                    <Pressable onPress={this.rateProducts} style={styles.btn} >
                        <Text style={styles.btnText} > {"تقييم الأن"} </Text>
                    </Pressable>
                    <Pressable onPress={this.props.closeModal} style={styles.btn} >
                        <Text style={[styles.btnText, { color: colors.grey, fontFamily: fonts.tajawalR }]} > {"ليس الان"} </Text>
                    </Pressable>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.softWhite,
        elevation: 10,
        width: "100%",
        // alignItems: 'center',
        // alignSelf: 'center',
        padding: 20,
        borderRadius: 10,
        // borderWidth: 1,
        // borderColor: colors.softBlue,
    },
    subtitle: {
        color: colors.white,
        alignSelf: "flex-end",
        fontFamily: fonts.tajawalB,
        // marginBottom: 10
    },
    btnContainer: {
        // backgroundColor: "red",
        justifyContent: "space-around",
        flexDirection: "row-reverse",
    },
    // btn:{
    //     backgroundColor: colors.
    // }
    btnText: {
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.ratingYellow,
        // marginHorizontal: 10
    }
})