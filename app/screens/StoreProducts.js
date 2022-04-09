import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BannerList from "../components/home/BannerList";
import ProductsList from "../components/StoreProducts/products/ProductsList";
import Header from "../components/StoreProducts/header/Header";
import CategoriesList from "../components/StoreProducts/categories/CategoriesList";
import { colors } from "../config/vars";
import { productsSearch } from "../config/data";
import { goToScreen } from "../config/functions";
import { setFavStore, checkInFav, deleteFavStore } from "../config/apis/posts";

export default class StoreProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      searching: false,
      searchText: "",
      fav: false
    };
  }

  componentDidMount() {
    this.checkInFav()
  }

  checkInFav = async () => {
    const data = {
      favorite_id: this.props.route.params.store.id,
      type: "store"
    }
    this.setState({
      fav: await checkInFav(data)
    })
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
    goToScreen("ProductDetails", this.props.navigation, { store, product, screen: "storeProducts", hraj: this.props.route.params.hraj, hospital: this.props.route.params.hospital });
  };

  setFav = async () => {
    // console.log("sdkjfksjd")
    if (this.state.fav) {
      this.deleteFav()
      return
    }

    this.setState({
      fav: true
    })
    const success = await setFavStore(this.props.route.params.store.id)
  }

  deleteFav = async () => {
    // console.log("sdkjfksjd")
    this.setState({
      fav: false
    })
    const success = await deleteFavStore(this.props.route.params.store.id)
  }

  _listHeader = () => (
    <Header
      store={this.props.route.params.store}
      navigation={this.props.navigation}
      hraj={this.props.route.params.hraj}
      hospital={this.props.route.params.hospital}
      closeSearching={this.closeSearching}
      searching={this.state.searching}
      onChangeText={this.onChangeText}
      fav={this.state.fav}
      setFav={this.setFav}
    />
  );

  _renderItem = () => (
    <CategoriesList
      store={this.props.route.params.store}
      searching={this.state.searching}
      hraj={this.props.route.params.hraj}
      hospital={this.props.route.params.hospital}
      setStores={this.setStores}
      navigation={this.props.navigation}
    />
  );

  _listFooter = () => (
    //this margin:65 is for elevating the elements upper than the bottom tabs because its absolute
    <View style={{ marginBottom: 65 }}>
      <ProductsList
        goToScreen={this.goToScreen}
        hraj={this.props.route.params.hraj}
        hospital={this.props.route.params.hospital}
        stores={this.state.stores}
        store={this.props.route.params.store}
        navigation={this.props.navigation}
      />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[1]}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this._listFooter}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this._listHeader}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteF7,
  },
});
