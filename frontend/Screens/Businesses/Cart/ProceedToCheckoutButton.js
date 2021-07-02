import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { useSelector } from 'react-redux';
import { selectCartValue } from '../../../Redux/cartSlice';

const ProceedToCheckoutButton = props => {

    const cartValue = useSelector(selectCartValue);

    return (
        <TouchableOpacity style={styles.checkoutBtn} onPress={props.handleGoToCheckout}>
            <Text style={styles.viewCartText}>Proceed To Checkout</Text>
            <Text style={styles.viewCartText}>·</Text>
            <Text style={styles.viewCartText}>{`$${cartValue.toFixed(2)}`}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    checkoutBtn: {
        backgroundColor: "green",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: "100%",
        marginTop: 20
    },
    viewCartText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 10
    }
});

export default ProceedToCheckoutButton;