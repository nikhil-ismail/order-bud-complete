import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../Redux/userSlice";

const EditUserDetails = (props) => {
    const userDetails = useSelector(selectUserDetails);

    const [name, setName] = useState(userDetails.name);
    const [phone, setPhone] = useState(userDetails.phone);
    const [email, setEmail] = useState(userDetails.email);

    const handleUpdateDetails = () => {
        props.handleUpdateDetails(name, phone, email);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.textInput}>
                    <View style={styles.categoryContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>Name</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder={userDetails.name} style={styles.input} onChangeText={text => setName(text)}></TextInput>
                        </View>
                    </View>
                    <View style={styles.categoryContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>Phone Number</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder={userDetails.phone} style={styles.input} onChangeText={text => setPhone(text)}></TextInput>
                        </View>
                    </View>
                    <View style={styles.categoryContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>Email</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder={userDetails.email} style={styles.input} onChangeText={text => setEmail(text)}></TextInput>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => props.handleEdit()}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.updateBtn} onPress={() => handleUpdateDetails()}>
                        <Text style={styles.updateText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInput: {
        marginTop: 1
    },
    categoryContainer: {
        marginVertical: 2
    },
    headerContainer: {
        backgroundColor: "white",
        paddingVertical: 15,
    },
    header: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 20
    },
    inputContainer: {
        backgroundColor: "white",
    },
    input: {
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 20
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    cancelBtn: {
        backgroundColor: "green",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "35%",
        marginTop: 25,
        marginLeft: 50,
        marginRight: 20
    },
    cancelText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
    },
    updateBtn: {
        backgroundColor: "green",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "35%",
        marginTop: 25
    },
    updateText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
    },
})

export default EditUserDetails;