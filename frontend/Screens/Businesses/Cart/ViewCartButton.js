import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Modal } from "react-native";
import { Icon } from 'react-native-elements';

import Cart from "./Cart";

import { useSelector } from 'react-redux';
import { selectCartValue, selectCartSize } from '../../../Redux/cartSlice';

const { height, width } = Dimensions.get("window");

const ViewCartButton = props => {
    const [showCart, setShowCart] = useState(false);

    const cartValue = useSelector(selectCartValue);
    const cartSize = useSelector(selectCartSize);

    const handleShowCartModal = () => {
        setShowCart(!showCart);
    }

    const handleGoToCheckout = () => {
        setShowCart(!showCart);
        props.navigation.navigate('Checkout');
    }

    return (
        <View>
            <TouchableOpacity style={styles.viewCart} onPress={handleShowCartModal}>
                <View style={styles.cartIcon}>
                    <Icon name="shopping-cart" type="font-awesome-5" color="white" size={22} />
                    <View style={styles.cartNumItemsContainer}>
                        <Text style={styles.cartNumItems}>{cartSize}</Text>
                    </View>
                </View>
                <Text style={styles.viewCartText}>View Cart</Text>
                <Text style={styles.viewCartText}>{`$${cartValue.toFixed(2)}`}</Text>
            </TouchableOpacity>
            <Modal
                visible={showCart}
                animationType='none'
                transparent={true}
            >
                <View style={styles.modalBackground} />
                <Cart
                    handleShowCartModal={handleShowCartModal}
                    handleGoToCheckout={handleGoToCheckout}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    viewCart: {
        backgroundColor: "green",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: "75%",
        left: (width - width * 0.75) / 2,
        position: "absolute",
        bottom: 15
    },
    viewCartText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 10
    },
    cartNumItems: {
        color: "green",
        fontWeight: "bold",
    },
    cartIcon: {
        flexDirection: "row"
    },
    cartNumItemsContainer: {
        backgroundColor: "white",
        height: 20,
        width: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -5,
        marginLeft: -6
    },
    modalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.66)',
        height: height,
        width: width
    }
});

export default ViewCartButton;