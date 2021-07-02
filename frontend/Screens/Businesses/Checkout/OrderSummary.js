import React from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Divider } from 'react-native-elements';

import CartItem from '../Cart/CartItem';

import { useSelector } from 'react-redux';
import { selectCartItems, selectCartValue } from '../../../Redux/cartSlice';

const OrderSummary = props => {

    const cartItems = useSelector(selectCartItems);
    const cartValue = useSelector(selectCartValue);

    return (
        <View style={styles.checkoutContainer}>
            <Text style={styles.yourOrder}>Your Order</Text>
            <View style={styles.orderSummary}>
                <FlatList
                    data={cartItems}
                    renderItem={({ item }) => (
                        <CartItem item={item} />
                    )}
                />
                <Divider style={styles.divider} />
                <View style={styles.priceDetailsContainer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.cartItemText}>Subtotal</Text>
                        <Text style={styles.cartItemText}>${cartValue.toFixed(2)}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.cartItemText}>Tax</Text>
                        <Text style={styles.cartItemText}>${(cartValue * 0.13).toFixed(2)}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.cartItemText}>Total</Text>
                        <Text style={styles.cartItemText}>${(cartValue * 1.13).toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checkoutContainer: {
        backgroundColor: "white",
        marginVertical: 2.5
    },
    yourOrder: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 25,
        marginBottom: 15,
        marginLeft: 15
    },
    orderSummary: {
        paddingHorizontal: 20
    },
    cartItemText: {
        fontSize: 18
    },
    divider: {
        backgroundColor: "grey",
    },
    priceDetailsContainer: {
        marginVertical: 15
    },
    priceContainer: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "white",
        justifyContent: "space-between",
        paddingVertical: 5,
    }
})

export default OrderSummary;