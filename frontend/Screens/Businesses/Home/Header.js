import React from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { selectAddress, setIsDelivery, selectIsDelivery } from '../../../Redux/orderDetailsSlice';

import { Icon } from 'react-native-elements';

const Header = (props) => {

    const address = useSelector(selectAddress);
    const isDelivery = useSelector(selectIsDelivery);
    const dispatch = useDispatch();

    const handleToggle = (type) => {
        if (type !== isDelivery) {
            dispatch(setIsDelivery(type));
        }
    }

    return (
        <SafeAreaView style={styles.header}>
            <View>
                <View style={styles.pickUpDelivery}>
                    <TouchableOpacity onPress={() => handleToggle(true)}>
                        <Text style={isDelivery ? styles.textSelected : styles.textUnselected}>Deliver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleToggle(false)}>
                        <Text style={!isDelivery ? styles.textSelected : styles.textUnselected}>Pick-Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.address} onPress={() => props.navigation.navigate('Enter Address')}>
                <Text style={styles.addressText}>{address === undefined ? 'Enter Address' : address.mainText}</Text>
                <Icon name="angle-down" type="font-awesome-5" color="green" size={20} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        marginTop: 7.5,
        marginBottom: 7.5
    },
    pickUpDelivery: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginVertical: 10,
        marginLeft: 15
    },
    textSelected: {
        fontWeight: "bold",
        fontSize: 19,
        marginHorizontal: 7.5
    },
    textUnselected: {
        fontWeight: "bold",
        fontSize: 19,
        marginHorizontal: 7.5,
        color: "grey"
    },
    address: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15
    },
    addressText: {
        color: "green",
        fontSize: 19,
        fontWeight: "bold",
        marginHorizontal: 10
    },
})

export default Header;