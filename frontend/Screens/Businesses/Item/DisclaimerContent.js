import React from 'react'
import { View, StyleSheet, Modal, Dimensions, Text, TouchableOpacity } from 'react-native';

import { useSelector } from 'react-redux';
import { selectCartBusiness } from '../../../Redux/cartSlice'

const { height, width } = Dimensions.get("window");

const Disclaimer = (props) => {
    const cartBusiness = useSelector(selectCartBusiness);

    return (
        <View style={styles.modalCard}>
            <View style={styles.textContainer}>
                <Text style={styles.header}>Create a new cart?</Text>
                <Text style={styles.bodyText}>
                    You already have items from {cartBusiness} in your cart.
                    Would you like to clear you cart and add this item from {props.business} instead?
            </Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => props.handleCloseDisclaimer("cancel")}
                >
                    <Text style={[styles.buttonText, styles.cancelText]}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => props.handleCloseDisclaimer("new")}
                >
                    <Text style={[styles.buttonText, styles.newCartText]}>NEW CART</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalCard: {
        backgroundColor: "white",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        position: "absolute",
        width: 0.8 * width,
        top: height - 0.7 * height,
        left: (width - (0.8 * width)) / 2,
        alignItems: "center",
    },
    textContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
    },
    bodyText: {
        marginTop: 10,
        color: "grey",
        fontSize: 16,
        textAlign: "center"
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        borderTopWidth: 0.25
    },
    button: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    cancelButton: {
        borderRightWidth: 0.25
    },
    buttonText: {
        fontSize: 18
    },
    cancelText: {
        color: "red"
    },
    newCartText: {
        color: "green"
    }
});

export default Disclaimer;