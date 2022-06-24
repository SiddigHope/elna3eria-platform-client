import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../config/vars';
import { StatusBar } from 'expo-status-bar';
import MiniHeader from '../components/MiniHeader';
import { getMyReviews } from '../config/apis/gets';
import MyReviewsList from '../components/myreviews/MyreviewsList';
import { goToScreen } from '../config/functions';

export default class MyReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        };
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        const reviews = await getMyReviews()
        this.setState({
            reviews,
        })
    }

    goToDetails = item => {
        goToScreen(
            "ProductDetails",
            this.props.navigation,
            { product: item.product, store: item.store, hraj: false, screen: "favorite" }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.whiteF7} />
                <MiniHeader title={"تقييماتي"} right={"dslk"} navigation={this.props.navigation} />
                <MyReviewsList onPress={this.goToDetails} reviews={this.state.reviews} navigation={this.props.navigation} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.whiteF7
    }
})