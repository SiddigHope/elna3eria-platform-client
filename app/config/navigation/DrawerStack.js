import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import Profile from "../../screens/Profile";
import FavStores from '../../screens/FavStores';
import FavProducts from '../../screens/FavProducts';
import MyReviews from '../../screens/MyReviews';
import Hiraj from '../../screens/Hiraj';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppStack from './AppStack';
import { Dimensions } from 'react-native';

const Drawer = createDrawerNavigator();
const {width} = Dimensions.get("window")
export default function DrawerStack() {
    return (
        <Drawer.Navigator
            drawerContent={props => <Profile {...props} />}
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
                headerShown: false,
                swipeEnabled: false,
                drawerPosition: "right",
                drawerStyle: {
                    backgroundColor: '#c6cbef',
                    width: (width * 90) / 100,
                },
            }}
        >
            <Drawer.Screen
                name="AppStack"
                component={AppStack}
            />
        </Drawer.Navigator>
    );
}
