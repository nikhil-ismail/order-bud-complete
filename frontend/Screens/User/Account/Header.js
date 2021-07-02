import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Header = (props) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Welcome To OrderBud</Text>
            <Text style={styles.subHeader}>Discover Small Businesses Near You.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 20,
        paddingHorizontal: 20
    },
    header: {
        fontSize: 36,
        fontWeight: "bold",
        color: "green",
    },
    subHeader: {
        color: "grey",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10
    }
})

export default Header;