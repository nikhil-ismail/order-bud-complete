import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../Screens/User/User';
import PersonalInformation from '../Screens/User/PersonalInformation/PersonalInformation';
import Addresses from '../Screens/User/Addresses/Addresses';
import EnterAddress from "../Screens/Businesses/Home/EnterAddress";
import AddAddress from '../Screens/User/Addresses/AddAddress';
import Friends from '../Screens/User/Friends/Friends'
import AddFriends from '../Screens/User/Friends/AddFriends';
import FriendsListFriendFeed from "../Screens/User/Friends/FriendsListFriendFeed";
import BusinessPage from "../Screens/Businesses/Business/BusinessPage";
import FriendRequests from '../Screens/User/Friends/FriendRequests';
import MyFriends from '../Screens/User/Friends/MyFriends';
import SearchFriends from '../Screens/User/Friends/SearchFriends';
import FriendsOrdersFriendFeed from '../Screens/Orders/FriendsOrdersFriendFeed';

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
                name="Friends List To Friend Feed"
                component={FriendsListFriendFeed}
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
            <Stack.Screen 
                name="Friend Requests"
                component={FriendRequests}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="My Friends"
                component={MyFriends}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Search Friends"
                component={SearchFriends}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Friends Orders To Friend Feed"
                component={FriendsOrdersFriendFeed}
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