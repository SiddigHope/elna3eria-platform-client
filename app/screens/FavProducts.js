import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FavList from '../components/favProducts/FavList';
import MiniHeader from '../components/MiniHeader';
import { getFavProducts } from '../config/apis/gets';
import { goToScreen } from '../config/functions';
import { colors } from '../config/vars';

export default class FavProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }


    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        this.setState({
            products: await getFavProducts()
        })
    }

    goToScreen = (store, product) => {
        // console.log(store)
        goToScreen("ProductDetails", this.props.navigation, { store, product, screen: "favorite" });
    };

    render() {
        const icon = (<Icon name="heart-outline" size={30} color={colors.danger} />)
        return (
            <View style={styles.container}>
                <MiniHeader title={"المنتجات المفضلة"} right={"right"} icon={icon} navigation={this.props.navigation} />
                <FavList products={this.state.products} navigation={this.props.navigation} goToScreen={this.goToScreen} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteF7
    }
})