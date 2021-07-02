import React from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from "react-native";

import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartValue, clearCart, selectCartBusinessAddress, selectCartSize } from '../../../Redux/cartSlice';
import { selectUserDetails } from '../../../Redux/userSlice';
import { selectIsDelivery, selectAddress } from '../../../Redux/orderDetailsSlice';

import axios from 'axios';

import baseURL from "../../../assets/common/baseUrl";

const PurchaseButton = props => {
    
    const dispatch = useDispatch();

    const cartDetails = useSelector(selectCartItems);
    const cartTotalPrice = useSelector(selectCartValue);
    const cartTotalQuantity = useSelector(selectCartSize);
    const userDetails = useSelector(selectUserDetails);
    const orderType = useSelector(selectIsDelivery);
    const orderAddress = useSelector(selectAddress);
    const businessAddress = useSelector(selectCartBusinessAddress);

    const order = {
        business: cartDetails[0].business._id,
        orderItems: cartDetails.map(item => {
            return {
                id: item.id,
                quantity: item.quantity
            }
        }),
        shippingAddress1: orderType ? orderAddress.mainText : businessAddress.mainText,
        phone: userDetails.phone,
        isDelivery: orderType,
        totalPrice: (cartTotalPrice * 1.13).toFixed(2),
        totalQuantity: cartTotalQuantity,
        user: userDetails.id,
    }

    const handlePurchase = () => {
        axios.post(`${baseURL}orders`, { order })
        .then(() => {
            console.log('order successfully purchased')
            props.navigation.navigate('Home');
            dispatch(clearCart());
        })
        .catch(err => {
            console.log('api error call - could not purchase order')
        })
    }

    return (
        <SafeAreaView style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePurchase}>
                <Text style={styles.buttonText}>Purchase</Text> 
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 15,
        alignItems: "center",   
        justifyContent: "center",
        position: "absolute",
        bottom: 5,
        backgroundColor: "white",
        width: "100%",
        paddingVertical: 10
    },
    button: {
        backgroundColor: "green",
        borderRadius: 5,
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: "100%",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    }
})

export default PurchaseButton;