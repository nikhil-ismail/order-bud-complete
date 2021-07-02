import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Home from "../Screens/Businesses/Home/Home";
import BusinessPage from "../Screens/Businesses/Business/BusinessPage";
import Checkout from "../Screens/Businesses/Checkout/Checkout";
import LoginRegister from '../Screens/User/Account/LoginRegister';
import SearchResults from '../Screens/Businesses/Search/SearchResults';
import CategoryFilterResults from "../Screens/Businesses/Search/CategoryFilterResults";
import EnterAddress from "../Screens/Businesses/Home/EnterAddress";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Search Results'
                component={SearchResults}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Business Page'
                component={BusinessPage}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Category Filter Results'
                component={CategoryFilterResults}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Checkout'
                component={Checkout}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Login'
                component={LoginRegister}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Enter Address'
                component={EnterAddress}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}