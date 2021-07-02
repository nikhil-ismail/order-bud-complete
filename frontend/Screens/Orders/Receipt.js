import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

import ReceiptHeader from './ReceiptHeader';
import ReceiptItem from "./ReceiptItem";

const { width, height } = Dimensions.get('window')

const Receipt = props => {

    const { order, ordersCount } = props.route.params;

    const rated = order.rated;

    return (
        <View style={{flex: 1}}>
            <View style={{backgroundColor: "white", flexDirection: "row", paddingTop: 25, paddingBottom: 15}}>
                <TouchableOpacity style={{marginTop: 30, marginLeft: 30}} onPress={() => props.navigation.navigate('Orders Home')}>
                    <Icon name="arrow-left" type="font-awesome-5" color="black" size={25} />
                </TouchableOpacity>
                <Text style={{fontSize: 22, fontWeight: "bold", marginTop: 30, marginLeft: 110}}>Order #{ordersCount}</Text>
            </View>
            <ScrollView>
                <ReceiptHeader navigation={props.navigation} ordersCount={ordersCount} order={order} />
                <View style={styles.detailsContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Your Order Details</Text>
                        { rated ?
                            <TouchableOpacity style={styles.rateContainer} onPress={() => props.navigation.navigate('Already Rated', {order: order})}>
                                <Text style={{fontSize: 16}}>Rate order</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.rateContainer} onPress={() => props.navigation.navigate('Rate Order', {order: order})}>
                                <Text style={{fontSize: 16}}>Rate order</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    { order.orderItems.map(item => {
                        return <ReceiptItem item={item} />
                    })}
                </View>
                <View style={styles.tipCategoryContainer}>
                    <View style={styles.category}>
                        <TouchableOpacity style={styles.tipIcon}>
                            <Icon name="hand-holding-usd" type="font-awesome-5" color="black" size={27.5} />
                        </TouchableOpacity>
                        <Text style={styles.categoryText}>Tip: $0.00</Text>
                    </View>
                </View>
                <View style={styles.priceCategoryContainer}>
                    <View style={styles.category}>
                        <TouchableOpacity style={styles.priceIcon}>
                            <Icon name="receipt" type="font-awesome-5" color="black" size={27.5} />
                        </TouchableOpacity>
                        <Text style={styles.categoryText}>Total: ${order.totalPrice}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: "white",
        marginTop: 3
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        marginLeft: 20
    },
    header: {
        fontSize: 23,
        fontWeight: "bold",
        marginTop: 5
    },
    rateContainer: {
        backgroundColor: "#E8E8E8",
        padding: 10,
        borderRadius: 10,
        marginRight: 20
    },
    tipCategoryContainer: {
        backgroundColor: "white",
        marginTop: 2,
    },
    priceCategoryContainer: {
        backgroundColor: "white",
        marginTop: 2,
    },
    category: {
        paddingVertical: 25,
        flexDirection: "row",
    },
    categoryText: {
        fontSize: 17,
        marginTop: 5
    },
    tipIcon: {
        paddingHorizontal: 20
    },
    priceIcon: {
        paddingHorizontal: 25
    }
})

export default Receipt;