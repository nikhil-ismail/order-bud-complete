import React, { useState, useCallback } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';

import baseURL from "../../../assets/common/baseUrl";

import { useSelector, useDispatch } from "react-redux";
import { selectUserDetails } from "../../../Redux/userSlice";
import { selectAddress, setAddress } from "../../../Redux/orderDetailsSlice";

import AddressCard from "./AddressCard";

const Addresses = (props) => {
    const userDetails = useSelector(selectUserDetails);
    const dispatch = useDispatch();
    const id = userDetails.id;

    const activeAddress = useSelector(selectAddress);

    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState('');
    const [addressUpdated, setAddressUpdated] = useState(false);

    const handleAddressToggle = (newActiveAddressPlaceId) => {
        axios.put(`${baseURL}users/changeActiveAddress/${id}`, {
            activeAddressPlaceId: activeAddress.placeId,
            newActiveAddressPlaceId: newActiveAddressPlaceId
        })
        .then(response => {
            for (let i = 0; i < response.data.user.address.length; i++) {
                if (response.data.user.address[i].active === true) {
                    dispatch(setAddress(response.data.user.address[i]));
                }
            }
            setAddresses(response.data.user.address);
        })
        .catch(() => {
            setError('Error - could not change your address!')
        });
    }

    const handleDeleteAddress = (addressPlaceId) => {
        axios.put(`${baseURL}users/deleteAddress/${id}`, {
            addressPlaceId: addressPlaceId
        })
        .then(response => {
            setAddresses(response.data.user.address);
        })
        .catch(() => {
            setError('Error - could not delete this address!')
        });
    }

    useFocusEffect(
        useCallback(() => {
          axios.get(`${baseURL}users/addresses/${id}`)
            .then((res) => {
              setAddresses(res.data.address);
            })
            .catch((error) => {
              setError('Api call error - addresses')
            })
    
          return () => {
            setAddresses([]);
          };
        }, [])
      )

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Manage Addresses</Text>
                </View>
                <TouchableOpacity style={styles.addContainer} onPress={() => props.navigation.navigate('Add Address')}>
                    <View style={styles.addIcon}>
                        <Icon name="plus" type="font-awesome-5" color="black" size={25} />
                    </View>
                    <Text style={styles.addAddressText}>Add New Address</Text>
                </TouchableOpacity>
                {addresses.map(address => {
                  return (
                    <AddressCard
                    addressPrimaryText={address.addressPrimaryText}
                    addressSecondaryText={address.addressSecondaryText}
                    active={address.active}
                    addressPlaceId={address.addressPlaceId}
                    handleAddressToggle={handleAddressToggle}
                    handleDeleteAddress={handleDeleteAddress}
                    />
                  )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 26,
        fontWeight: "bold"
    },
    addContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 20,
        marginBottom: 3    
    },
    addIcon: {
        marginLeft: 30,
        marginTop: 8
    },
    addAddressText: {
        fontSize: 16,
        paddingHorizontal: 30,
        marginTop: 12,
        color: "green",
        fontWeight: "bold"
    },
})

export default Addresses;