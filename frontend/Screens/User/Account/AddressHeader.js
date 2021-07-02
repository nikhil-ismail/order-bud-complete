import React from "react";
import { View, StyleSheet, Text } from "react-native";

const AddressHeader = (props) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Enter An Address For Your Account</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        color: "green",
    }
})

export default AddressHeader;