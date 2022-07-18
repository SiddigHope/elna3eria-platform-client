import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Pressable } from 'react-native';
import { colors, fonts } from '../../config/vars';
import Icon2 from "react-native-vector-icons/MaterialIcons";
import RateProductComponent from './RateProductComponent';
import { rateProduct } from '../../config/apis/posts';

export default class RateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: []
        };
    }

    componentDidMount() {
        // this.setRating(2, 2)
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
            } else {
                rating.push({ id, stars })
                this.setState({
                    rating,
                })
            }
        } else {
            this.setState({
                rating: [{ id, stars }]
            })
        }
    }

    setCommentText = (comment, id) => {
        const { rating } = this.state

        if (rating.length != 0) {
            const item = rating.find((item) => item.id == id)
            if (item) {
                item.comment = comment
                this.setState({
                    rating
                })

                console.log(rating)
            } else {
                rating.push({ id, comment })
                this.setState({
                    rating,
                })
            }
        } else {
            this.setState({
                rating: [{ id, comment }]
            })
        }
    }

    rateProducts = async () => {
        const { rating } = this.state

        if (rating.length == 0) {
            console.log("nothing to rate")
            return
        }

        rating.forEach(async (item) => {
            let data = {
                review: item.comment,
                rating: item.stars
            }
            if (this.props.screen == "hraj") {
                data = {
                    product_id: this.props.order.id,
                    rating: item.stars
                }
            }
            let rated = await rateProduct(data, item.id, this.props.screen)
        })

        this.props.closeModal()

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
        <RateProductComponent screen="product" item={item.item} setRatingStars={this.setRating} setCommentText={this.setCommentText} />
    )


    render() {
        const { order, screen } = this.props

        return (
            <View style={[styles.container]}>
                <Text style={styles.subtitle} > {"رأيك يهمنا ..."} </Text>
                {this.props.screen == "hraj" ? (
                    <RateProductComponent
                        screen="hraj"
                        item={this.props.order}
                        setRatingStars={this.setRating}
                        setCommentText={this.setCommentText}
                    />
                ) : (
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
                )}
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
        backgroundColor: colors.ebony,
        elevation: 10,
        width: "90%",
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