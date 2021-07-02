import React, { useState } from "react";
import { TextInput } from "react-native";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import ConfirmPassChangeButton from "./ConfirmPassChangeButton";
import PasswordChangeHeader from "./PasswordChangeHeader";

const { height, width } = Dimensions.get("window");

const PasswordChangeModal = (props) => {

    const handlePasswordChange = () => {
        props.handlePasswordChange(props.oldPassword, props.newPassword, props.newPasswordConfirm);
    }

    return (
        <SafeAreaView>
            <View style={styles.bottomSheet}>
                <PasswordChangeHeader handleEditPassword={props.handleEditPassword} />
                <View style={styles.categoryContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Old Password</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} autoCapitalize='none' secureTextEntry={true} onChangeText={text => props.setOldPassword(text)}></TextInput>
                    </View>
                </View>
                <View style={styles.categoryContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>New Password</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} autoCapitalize='none' secureTextEntry={true} onChangeText={text => props.setNewPassword(text)}></TextInput>
                    </View>
                </View>
                <View style={styles.categoryContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Confirm New Password</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} autoCapitalize='none' secureTextEntry={true} onChangeText={text => props.setNewPasswordConfirm(text)}></TextInput>
                    </View>
                </View>
                <View style={{ alignItems: "center" }}>
                    <ConfirmPassChangeButton handlePasswordChange={handlePasswordChange} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bottomSheet: {
        backgroundColor: 'white',
        padding: 20,
        backgroundColor: "white",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        position: "absolute",
        bottom: 2,
        width: "100%",
        paddingBottom: 100
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
        marginLeft: 5,
    },
    inputContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15
    },
    input: {
        fontSize: 16,
        marginBottom: 15,
        marginLeft: 20,
        paddingTop: 10
    }
})

export default PasswordChangeModal;