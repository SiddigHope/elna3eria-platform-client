import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, BackHandler, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BannerList from "../components/home/BannerList";
import StoresList from "../components/home/Stores/StoresList";
import Header from "../components/home/header/Header";
import StoreCategoriesList from "../components/home/StoreCategories/StoreCategorieList";
import { colors } from "../config/vars";
import { getStores, storesSearch, getHrajCategories, getHospitals } from "../config/data";
import { goToScreen } from "../config/functions";
import UserClass from '../config/authHandler';
import { StatusBar } from "expo-status-bar";
import ShowAdds from '../components/home/showAdds/ShowAdds';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      searching: false,
      searchText: "",
      hraj: false,
      hospital: false,
      showAdds: true
    };
  }

  componentDidMount() {
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


  setStores = async (id) => {

    this.setState({
      showAdds: false
    })

    if (id == 1) {
      this.setState({
        stores: await getHrajCategories(),
        hraj: true,
        hospital: false
      });
      return
    }

    if (id == 4) {
      this.setState({
        stores: await getHospitals(),
        hraj: false,
        hospital: true
      });
      return
    }

    if (id == 8) {
      goToScreen("AskMe", this.props.navigation)
      return
    }

    const data = {
      department_id: id,
      long: "15.641026068455744",
      lat: "32.47240696301191"
    }
    // console.log(data)
    this.setState({
      stores: await getStores(data),
      hraj: false,
      hospital: false
    });
  };

  onChangeText = async (text) => {
    // console.log(text);
    // storesSearch(15.641026068455744, 32.47240696301191, text);
    this.setState({
      searchText: text,
      searching: true,
      stores: await storesSearch(15.641026068455744, 32.47240696301191, text),
    });
  };

  closeSearching = () => {
    this.setState({
      searching: false,
    });
  };

  goToScreen = (store) => {
    // console.log(store)
    goToScreen("StoreProducts", this.props.navigation, { store, hraj: this.state.hraj, hospital: this.state.hospital });
  };

  _listHeader = () => (
    <Header
      closeSearching={this.closeSearching}
      showAdds={this.state.showAdds}
      searching={this.state.searching}
      onChangeText={this.onChangeText}
      screen={"home"}
    />
  );

  _renderItem = () => (
    <StoreCategoriesList
      searching={this.state.searching}
      setStores={this.setStores}
      navigation={this.props.navigation}
    />
  );

  _listFooter = () => (
    //this margin:65 is for elevating the elements upper than the bottom tabs because its absolute
    // 
    // TODO show adds is disabled for a short time after backend is done

    <>
      {this.state.showAdds ? (
        <View style={{ marginBottom: 65 }}>
          <ShowAdds navigation={this.props.navigation} />
        </View>
      ) : (
        <StoresList
          goToScreen={this.goToScreen}
          stores={this.state.stores}
          hraj={this.state.hraj}
          navigation={this.props.navigation}
        />
      )}
    </>
  );

  render() {
    // UserClass.logout()
    return (
      <View style={styles.container}>
        <StatusBar translucent={false} style="dark" backgroundColor={colors.whiteF7} />
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
