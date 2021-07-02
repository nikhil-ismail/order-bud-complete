import React, { useState } from "react";
import { TextInput } from "react-native";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity, Modal } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import axios from 'axios';
import baseURL from "../../../assets/common/baseUrl";

import PasswordChange from './PasswordChange';


import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../Redux/userSlice";

const { height, width } = Dimensions.get("window");

const UserDetails = (props) => {

    const userDetails = useSelector(selectUserDetails);
    const id = userDetails.id;
    const [passwordChange, setPasswordChange] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleEditPassword = () => {
        setPasswordChange(!passwordChange);
    }

    const handlePasswordChange = (oldPassword, newPassword, newPasswordConfirm) => {
        if (newPassword === newPasswordConfirm) {
            axios.put(`${baseURL}users/changePassword/${id}`, { oldPassword, newPassword })
            .then(response => {
                setPasswordChange(!passwordChange);
            })
            .catch(() => {
                setError('An error occurred while changing your password. Please try again.')
            });
        }
        else {
            setError('Unable to change password. Please try again.');
        }
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
                            <Text style={styles.input}>{userDetails.name}</Text>
                        </View>
                    </View>
                    <View style={styles.categoryContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>Phone Number</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.input}>{userDetails.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.categoryContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>Email</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.input}>{userDetails.email}</Text>
                        </View>
                    </View>
                    <View style={styles.categoryContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>Password</Text>
                            <TouchableOpacity onPress={handleEditPassword}>
                                <Text style={{color: "green", marginRight: 20}}>Change</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.input}>•••••••••</Text>
                        </View>
                    </View>
                </View>
                <Modal
                    visible={passwordChange}
                    animationType='none'
                    transparent={true}
                >
                    <View style={styles.modalBackground} />
                    <PasswordChange
                        handlePasswordChange={handlePasswordChange}
                        handleEditPassword={handleEditPassword}
                        oldPassword={oldPassword}
                        newPassword={newPassword}
                        newPasswordConfirm={newPasswordConfirm}
                        setOldPassword={setOldPassword}
                        setNewPassword={setNewPassword}
                        setNewPasswordConfirm={setNewPasswordConfirm}
                    />
                </Modal>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInput: {
        marginTop: 1
    },
    categoryContainer: {
        marginVertical: 2,
    },
    headerContainer: {
        backgroundColor: "white",
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    header: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 20,
    },
    inputContainer: {
        backgroundColor: "white",
    },
    input: {
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 20
    },
    modalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.66)',
        height: height,
        width: width
    }
})

export default UserDetails;