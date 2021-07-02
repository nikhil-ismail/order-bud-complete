import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import AdminHome from "../Screens/Admin/AdminHome";
import EditBusiness from "../Screens/Admin/EditBusiness";
import AddProduct from "../Screens/Admin/AddProduct";
import EditProduct from "../Screens/Admin/EditProduct";
import ManageProducts from "../Screens/Admin/ManageProducts";
import EnterAddress from "../Screens/Admin/EnterAddress";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Admin Home"
                component={AdminHome}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="Edit Business"
                component={EditBusiness}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="Add Product"
                component={AddProduct}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="Edit Product"
                component={EditProduct}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="Manage Products"
                component={ManageProducts}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="Enter Address"
                component={EnterAddress}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MyStack />
}