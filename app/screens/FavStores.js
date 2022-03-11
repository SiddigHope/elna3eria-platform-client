import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FavList from '../components/favStores/FavList';
import MiniHeader from '../components/MiniHeader';
import { getFavStores } from '../config/apis/gets';
import { goToScreen } from '../config/functions';
import { colors } from '../config/vars';

export default class FavStores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: []
        };
    }


    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        this.setState({
            stores: await getFavStores()
        })
    }

    goToScreen = (store) => {
        // console.log(store)
        goToScreen("StoreProducts", this.props.navigation, { store });
    };

    render() {
        const icon = (<Icon name="heart" size={30} color={colors.danger} />)
        return (
            <View style={styles.container}>
                <MiniHeader title={"المتاحر المفضلة"} right={"right"} icon={icon} navigation={this.props.navigation} />
                <FavList stores={this.state.stores} navigation={this.props.navigation} goToScreen={this.goToScreen} />
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