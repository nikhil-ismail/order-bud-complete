import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Home from "../Screens/Businesses/Home/Home";
import BusinessPage from "../Screens/Businesses/Business/BusinessPage";
import Checkout from "../Screens/Businesses/Checkout/Checkout";


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
                name='Business Page'
                component={BusinessPage}
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
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}