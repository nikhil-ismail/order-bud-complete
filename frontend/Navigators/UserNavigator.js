import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../Screens/User/User';
import PersonalInformation from '../Screens/User/PersonalInformation/PersonalInformation';
import Addresses from '../Screens/User/Addresses/Addresses';
import EnterAddress from "../Screens/Businesses/Home/EnterAddress";
import AddAddress from '../Screens/User/Addresses/AddAddress';
import Friends from '../Screens/User/Friends/Friends'
import AddFriends from '../Screens/User/Friends/AddFriends';
import FriendFeed from "../Screens/User/Friends/FriendFeed";
import BusinessPage from "../Screens/Businesses/Business/BusinessPage";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="User"
                component={Profile}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Personal Information"
                component={PersonalInformation}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Addresses"
                component={Addresses}
                options={{
                    headerShown: false
                }}
            /> 
            <Stack.Screen 
                name="Enter Address"
                component={EnterAddress}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Add Address"
                component={AddAddress}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Friends"
                component={Friends}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Add Friends"
                component={AddFriends}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Friend Feed"
                component={FriendFeed}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Business Page"
                component={BusinessPage}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />
}