import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, BackHandler, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BannerList from "../components/home/BannerList";
import ProductsList from "../components/discount/products/ProductsList";
// import Header from "../components/discount/header/Header";
import CategoriesList from "../components/discount/categories/CategoriesList";
import { colors, fonts } from "../config/vars";
import { productsSearch } from "../config/data";
import { goToScreen } from "../config/functions";
import { getDiscountedProducts } from "../config/apis/gets";
import Header from "../config/header/Header";

export default class Discount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productsCopy: [],
            searching: false,
            searchText: "",
            loading: false
        };
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this.getData()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.props.navigation.isFocused()) {
            Alert.alert(
                'إنهاء التطبيق',
                'هل حقاً تريد إنهاء التطبيق',
                [
                    {
                        text: 'لا',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'نعم', onPress: () => BackHandler.exitApp() },
                ],
                { cancelable: false },
            );
            return true;
        }
        // return true;  // Do nothing when back button is pressed
    };

    getData = async () => {
        const products = await getDiscountedProducts()
        this.setState({
            products,
            productsCopy: products
        })

        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }

    setStores = (stores) => {
        this.setState({
            stores,
        });
    };

    onChangeText = async (text) => {
        // console.log(text);
        this.setState({
            searchText: text,
            searching: true,
            stores: await productsSearch(this.props.route.params.store.id, text),
        });
    };

    closeSearching = () => {
        this.setState({
            searching: false,
        });
    };

    goToScreen = (store, product) => {
        goToScreen("ProductDetails", this.props.navigation, { store, product, screen: "discount" });
    };

    _listHeader = () => (
        <Header
            // store={this.props.route.params.store}
            navigation={this.props.navigation}
            closeSearching={this.closeSearching}
            searching={this.state.searching}
            onChangeText={this.onChangeText}
        />
    );

    _renderItem = () => (
        <ProductsList
            goToScreen={this.goToScreen}
            products={this.state.products}
            // store={this.props.route.params.store}
            navigation={this.props.navigation}
        />
    );

    _listFooter = () => (
        //this margin:65 is for elevating the elements upper than the bottom tabs because its absolute
        <View style={{ height: 65 }}>

        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <Header screen={"discount"}
                    closeSearching={this.closeSearching}
                    searching={this.state.searching}
                    onChangeText={this.onChangeText}
                />

                <View style={styles.subContainer}>
                    {
                        this.state.loading ? (
                            <ActivityIndicator size={50} color={colors.mainColor} />
                        ) : (
                            <FlatList
                                data={[1]}
                                keyExtractor={(item, index) => index.toString()}
                                ListFooterComponent={this._listFooter}
                                showsVerticalScrollIndicator={false}
                                // ListHeaderComponent={this._listHeader}
                                renderItem={this._renderItem}
                            />
                        )
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.whiteF7,
    },
    subContainer: {
        flex: 1,
        backgroundColor: colors.whiteF7,
        marginTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 10,
        paddingTop: 20,
    }
});
