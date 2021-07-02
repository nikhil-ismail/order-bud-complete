import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';


const AddToCartButton = (props) => {

    const price = props.price.$numberDecimal ? props.price.$numberDecimal : props.price;

    return (
        <TouchableOpacity style={styles.addToCart} onPress={props.handlePress}>
            {
                props.cartType === "Update"
                ?
                <Text style={styles.addToCartText}>Update Cart</Text>
                :
                <Text style={styles.addToCartText}>Add To Cart</Text>
            }
            <View style={styles.cartPrice}>
                <Text style={styles.addToCartText}>{`$${(price * props.quantity).toFixed(2)}`}</Text>
            </View>
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