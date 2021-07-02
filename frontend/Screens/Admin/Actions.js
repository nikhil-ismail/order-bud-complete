import React from "react"
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get("window")

const AdminHome = (props) => {

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.header}>Manage Your Business</Text>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionBox} onPress={() => props.navigation.navigate('Edit Business', { business: props.business })}>
                    <Text style={styles.actionText}>Edit Business</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBox} onPress={() => props.navigation.navigate('Add Product', { business: props.business })}>
                    <Text style={styles.actionText}>Add Product</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBox} onPress={() => props.navigation.navigate('Manage Products', { business: props.business })}>
                    <Text style={styles.actionText}>View Products</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 50
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 5,
        color: "#303030"
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    actionBox: {
        borderColor: "green",
        borderWidth: 1,
        width: width * 0.3,
        height: width * 0.2,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fcfcfc',
        shadowColor: '#a6a6a6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5
    },
    actionText: {
        color: "green",
        textAlign: "center",
        fontSize: 17,
        fontWeight: "bold"
    }
})

export default AdminHome;