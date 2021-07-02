import React from "react";
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';

const CartHeader = props => {

    return (
        <View>
            <View style={styles.cartHeaderContainer}>
                <TouchableOpacity style={styles.cartBackBtn} onPress={props.handleShowCartModal}>
                    <Icon name="arrow-left" type="font-awesome-5" color="black" size={17.5} />
                </TouchableOpacity>
                <Text style={styles.yourOrderHeader}>Your Order</Text>
            </View>
            <View style={styles.separator} />
        </View>
    )
}


const styles = StyleSheet.create({
    cartHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    yourOrderHeader: {
        fontSize: 28,
        fontWeight: "bold"
    },
    cartBackBtn: {
        backgroundColor: "white",
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        marginBottom: 15
    },
    separator: {
        backgroundColor: "grey",
        height: 1,
        marginVertical: 15
    }
});

export default CartHeader;