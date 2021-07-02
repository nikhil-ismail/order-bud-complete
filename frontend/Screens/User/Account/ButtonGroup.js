import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonGroup = (props) => {

    return (
        <View style={styles.buttonGroupContainer}>
            <TouchableOpacity
                style={[styles.button, props.page === 'Login' && styles.highlightedContainer]}
                onPress={props.handleTabSwitch}
            >
                <Text style={[styles.buttonGroupText, props.page === 'Login' && styles.highlightedText]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, props.page === 'Register' && styles.highlightedContainer]}
                onPress={props.handleTabSwitch}
            >
                <Text style={[styles.buttonGroupText, props.page === 'Register' && styles.highlightedText]}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonGroupContainer: {
        flexDirection: "row",
        borderColor: "green",
        borderWidth: 2,
        borderRadius: 5,
        width: "100%"
    },
    button: {
        width: "50%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonGroupText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    highlightedContainer: {
        backgroundColor: "green",
    },
    highlightedText: {
        color: "white"
    }
})

export default ButtonGroup;