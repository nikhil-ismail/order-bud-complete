import React from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useSelector } from 'react-redux';
import { selectAddress } from '../../../Redux/orderDetailsSlice';

const AddAddress = (props) => {
    const address = useSelector(selectAddress);

    return (
        <View style={styles.bodyContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    onFocus={() => props.navigation.navigate('Enter Address')}
                    placeholder="Enter Address"
                    value={address && address.fullAddress}
                />
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => props.handleAddAddress()}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButtonContainer} onPress={() => props.goBack()}>
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bodyContainer: {
        width: "100%",
    },
    inputContainer: {
        width: "100%",
        marginVertical: 30
    },
    textInput: {
        marginVertical: 10,
        height: 50,
        borderRadius: 5,
        borderColor: "#e6e6e6",
        borderWidth: 2,
        width: "100%",
        paddingHorizontal: 20,
        fontSize: 18
    },
    focusInputStyle: {
        borderColor: "green",
        borderWidth: 2
    },
    buttonContainer: {
        backgroundColor: "green",
        padding: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    backButtonContainer: {
        borderColor: "green",
        borderWidth: 1,
        padding: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 10
    },
    backButtonText: {
        color: "green",
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default AddAddress;