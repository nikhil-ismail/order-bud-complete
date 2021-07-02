import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { useSelector } from 'react-redux';

const ConfirmPassChangeButton = props => {

    return (
        <TouchableOpacity style={styles.confirmBtn} onPress={props.handlePasswordChange}>
            <Text style={styles.header}>Confirm Password Change</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    confirmBtn: {
        backgroundColor: "green",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: "100%",
        marginTop: 20
    },
    header: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 10
    }
});

export default ConfirmPassChangeButton;