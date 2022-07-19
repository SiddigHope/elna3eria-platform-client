import React from "react";
import Tabs from "../Tabs";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import Home from "../../screens/Home";
import Categories from "../../screens/Categories";
import StoreProducts from "../../screens/StoreProducts";
import ProductDetails from "../../screens/ProductDetails";
import Signin from '../../screens/Signin';
import Signup from "../../screens/Signup";
import Verification from "../../screens/Verification";
import Cart from "../../screens/Cart";
import OrderDetails from "../../screens/OrderDetails";
import EditProfile from '../../screens/EditProfile';
import Hiraj from '../../screens/Hiraj';
import ProductScreen from '../../components/products/productScreen/ProductScreen';
import AskMe from '../../screens/AskMe';
import AskMeOrders from '../../screens/AskMeOrders';
import DoctorAppointments from '../../screens/DoctorAppointments';
import HospitalProfile from '../../screens/HospitalProfile';
import Chat from '../../screens/Chat';
import DrawerStack from './DrawerStack';
import Profile from "../../screens/Profile";
import FavStores from '../../screens/FavStores';
import FavProducts from '../../screens/FavProducts';
import MyReviews from '../../screens/MyReviews';
// import Hiraj from '../../screens/Hiraj';
const Stack = createStackNavigator();

function AppStack() {
    return (
        <Stack.Navigator
            // initialRouteName={"Chat"}
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Signin"
                component={Signin}
            />
            <Stack.Screen
                name="Tabs"
                component={Tabs}
            />
            <Stack.Screen
                name="HospitalProfile"
                component={HospitalProfile}
            />
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="AskMe"
                component={AskMe}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
            />
            <Stack.Screen
                name="AskMeOrders"
                component={AskMeOrders}
            />
            <Stack.Screen
                name="DoctorAppointments"
                component={DoctorAppointments}
            />
            <Stack.Screen
                name="Categories"
                component={Categories}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
            />
            <Stack.Screen
                name="StoreProducts"
                component={StoreProducts}
            />
            <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
            />
            <Stack.Screen
                name="ProductScreen"
                component={ProductScreen}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
            />
            <Stack.Screen
                name="Verification"
                component={Verification}
            />
            <Stack.Screen
                name="Cart"
                component={Cart}
            />
            <Stack.Screen
                name="OrderDetails"
                component={OrderDetails}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
            />
            <Stack.Screen
                name="FavStores"
                component={FavStores}
            />
            <Stack.Screen
                name="FavProducts"
                component={FavProducts}
            />
            <Stack.Screen
                name="MyReviews"
                component={MyReviews}
            />
            <Stack.Screen
                name="Hiraj"
                component={Hiraj}
            />
        </Stack.Navigator>
    );
}

export default AppStack
