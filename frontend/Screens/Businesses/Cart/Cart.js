import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import CartHeader from './CartHeader';
import CartItem from './CartItem';
import ProceedToCheckoutButton from './ProceedToCheckoutButton';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

const Cart = props => {

    const cartItems = useSelector(selectCartItems);

    return (
        <View style={styles.bottomSheet}>
            <CartHeader handleShowCartModal={props.handleShowCartModal} />
            <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                    <CartItem item={item} />
                )}
            />
            <View style={{ alignItems: "center" }}>
                <ProceedToCheckoutButton handleGoToCheckout={props.handleGoToCheckout} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    bottomSheet: {
        backgroundColor: 'white',
        padding: 20,
        backgroundColor: "white",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        position: "absolute",
        bottom: 2,
        width: "100%",
        paddingBottom: 40
    }
});

export default Cart;