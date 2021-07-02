import React, { useState } from "react";
import { TextInput } from "react-native";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import axios from 'axios';
import baseURL from "../../../assets/common/baseUrl";

import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from "../../../Redux/userSlice";
import { setUser } from '../../../Redux/userSlice';

import UserDetails from './UserDetails';
import EditUserDetails from './EditUserDetails';
import ErrorMessage from '../Account/ErrorMessage';

const PersonalInformation = (props) => {

    const userDetails = useSelector(selectUserDetails);
    const dispatch = useDispatch();
    const id = userDetails.id;

    const [error, setError] = useState('');
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
    }

    const handleUpdateDetails = (name, phone, email) => {
        axios.put(`${baseURL}users/changeDetails/${id}`, { name, phone, email })
            .then(response => {
                if (response.data.auth) {
                    console.log(response.data)
                    dispatch(setUser(response.data));
                    setEdit(!edit);
                } else {
                    setError('Unable to change personal information. Please try again.');
                }
            })
            .catch(() => {
                setError('An error occurred while changing your personal information. Please try again.')
            });
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Personal Information</Text>
                    <TouchableOpacity style={styles.editIcon} onPress={handleEdit}>
                        <Icon name="pencil-alt" type="font-awesome-5" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                { edit ?
                    <EditUserDetails
                        handleUpdateDetails={handleUpdateDetails}
                        handleEdit={handleEdit}
                    />
                    :
                    <UserDetails />
                }
                {error.length > 0 && <ErrorMessage error={error} />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 26,
        marginLeft: 70,
        fontWeight: "bold"
    },
    editIcon: {
        marginRight: 30
    }
})

export default PersonalInformation;