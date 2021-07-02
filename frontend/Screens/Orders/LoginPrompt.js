import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

const LoginPrompt = (props) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.prompt}>Please Login To Your Account To View Your Orders</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    prompt: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
        paddingHorizontal: 20
    }
})

export default LoginPrompt;