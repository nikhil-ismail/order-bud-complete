import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Address from './Address';

import { useSelector } from 'react-redux';
import { selectIsDelivery } from '../../../Redux/orderDetailsSlice';


const OrderLogistics = props => {

    const isDelivery = useSelector(selectIsDelivery);

    return (
        <View style={styles.checkoutContainer}>
            <Text style={styles.header}>{isDelivery ? 'Delivery Details' : 'Pickup Details'}</Text>
            <Address navigation={props.navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    checkoutContainer: {
        backgroundColor: "white",
        marginVertical: 2.5
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 25,
        marginBottom: 15,
        marginLeft: 15
    }
})

export default OrderLogistics;