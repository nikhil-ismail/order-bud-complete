import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import OrdersHome from "../Screens/Orders/OrderHome";
import BusinessPage from "../Screens/Businesses/Business/BusinessPage";
import Receipt from '../Screens/Orders/Receipt';
import RateOrder from '../Screens/Orders/RateOrder';
import AlreadyRated from '../Screens/Orders/AlreadyRated';

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Orders Home'
                component={OrdersHome}
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
                name='Receipt'
                component={Receipt}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Rate Order'
                component={RateOrder}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Already Rated'
                component={AlreadyRated}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function OrdersNavigator() {
    return <MyStack />;
}