import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import { useSelector } from "react-redux";
import { selectAddress } from "../../../Redux/orderDetailsSlice";

const AddressCard = (props) => {

    return (
        <SafeAreaView>
            { props.active ?
            <View>
                <View style={styles.cardContainer}>
                    <View style={styles.leftContainer}>
                        <View style={styles.pinIcon}>
                            <Icon name="map-pin" type="font-awesome-5" color="green" size={25} />
                        </View>
                        <View style={styles.addressContainer}>
                            <Text style={styles.addressText1Active}>{props.addressPrimaryText}</Text>
                            <Text style={styles.addressText2Active}>{props.addressSecondaryText}</Text>
                        </View>
                    </View>
                </View>
            </View>
            :
            <TouchableOpacity onPress={() => props.handleAddressToggle(props.addressPlaceId)}>
                <View style={styles.cardContainer}>
                    <View style={styles.leftContainer}>
                        <View style={styles.pinIcon}>
                            <Icon name="map-pin" type="font-awesome-5" color="black" size={25} />
                        </View>
                        <View style={styles.addressContainer}>
                            <Text style={styles.addressText1}>{props.addressPrimaryText}</Text>
                            <Text style={styles.addressText2}>{props.addressSecondaryText}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.deleteIcon} onPress={() => props.handleDeleteAddress(props.addressPlaceId)}>
                        <Icon name="trash-alt" type="font-awesome-5" color="red" size={25} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingVertical: 20,
        marginBottom: 2
    },
    leftContainer: {
        flexDirection: "row"
    },
    addressContainer: {
        flexDirection: "column",
        paddingHorizontal: 40
    },
    addressText1: {
        fontSize: 16,
        fontWeight: "bold",
    },
    addressText2: {
        fontSize: 16,
    },
    addressText1Active: {
        fontSize: 16,
        fontWeight: "bold",
        color: "green"
    },
    addressText2Active: {
        fontSize: 16,
        color: "green"
    },
    pinIcon: {
        marginLeft: 30,
        marginTop: 8
    },
    deleteIcon: {
        marginRight: 40,
        marginTop: 8
    }
})

export default AddressCard;