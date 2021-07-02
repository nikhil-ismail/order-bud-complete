import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';


const AddToCartButton = (props) => {

    return (
        <TouchableOpacity style={styles.addToCart} onPress={props.goToLogin}>
            <Text style={styles.addToCartText}>Login To Add To Cart</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addToCart: {
        backgroundColor: "green",
        width: "90%",
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "center",
    },
    addToCartText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    },
    cartPrice: {
        right: 25,
        position: "absolute",
        paddingVertical: 15,
    }
})

export default AddToCartButton;