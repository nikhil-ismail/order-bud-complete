import React from "react";
import { View, Dimensions, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Icon } from 'react-native-elements';

import CheckoutHeader from './CheckoutHeader';
import OrderLogistics from './OrderLogistics';
import OrderSummary from './OrderSummary';
import PurchaseButton from './PurchaseButton';

var { height, width } = Dimensions.get("window");

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

const Checkout = props => {

    const cartItems = useSelector(selectCartItems);

    if (cartItems.length > 0) {
        return (
            <View style={{ height: height, flex: 1 }}>
                <ScrollView>
                    <CheckoutHeader />
                    <OrderLogistics navigation={props.navigation} />
                    <OrderSummary />
                </ScrollView>
                <PurchaseButton navigation={props.navigation} />
            </View>
        )
    } else {
        return (
            <View style={styles.emptyCartContainer}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => props.navigation.navigate('Home')}>
                    <SafeAreaView style={styles.icon}>
                        <Icon name="times" type="font-awesome-5" color="black" size={26} />
                    </SafeAreaView>
                </TouchableOpacity>
                <View style={styles.emptyCartTextContainer}>
                    <Text style={styles.emptyCartText}>Your cart is empty.</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    emptyCartContainer: {
        height: height,
        alignItems: "center"
    },
    iconContainer: {
        height: 90,
        width: width,
        backgroundColor: "white"
    },
    icon: {
        position: "absolute",
        marginLeft: 20
    },
    emptyCartTextContainer: {
        justifyContent: "center",
        height: height - 90
    },
    emptyCartText: {
        fontSize: 18
    }
})

export default Checkout;