import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

const deliverPickupSelector = props => {

    return (
        <View style={styles.deliverPickupSelectorContainer}>
            <TouchableOpacity style={styles.deliverContainer}>
                <Text style={styles.deliverPickupText}>Deliver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickupContainer}>
                <Text style={styles.deliverPickupText}>Pickup</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    deliverPickupSelectorContainer: {
        flexDirection: "row",
        paddingVertical: 20,
        paddingHorizontal: 15,
        justifyContent: "center",
        backgroundColor: "white",
        marginBottom: 2.5
    },
    deliverContainer: {
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 7.5,
        paddingHorizontal: 20,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    pickupContainer: {
        backgroundColor: "#d3d3d3",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 7.5,
        paddingHorizontal: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    deliverPickupText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    }
})

export default deliverPickupSelector;