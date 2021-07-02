import React from "react";
import { StyleSheet, Text } from "react-native";

const ErrorMessage = (props) => {

    return (
        <Text style={styles.error}>{props.error}</Text>
    )
}

const styles = StyleSheet.create({
    error: {
        color: "red",
        fontSize: 16,
        marginTop: 20
    }
})

export default ErrorMessage;