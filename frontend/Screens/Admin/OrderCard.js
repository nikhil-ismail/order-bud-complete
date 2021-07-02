import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from "axios";

import baseURL from "../../assets/common/baseUrl";

const OrderCard = (props) => {
    const [showItems, setShowItems] = useState(false);

    const handleMarkComplete = () => {
        axios.put(`${baseURL}orders/${props.order.id}`, { status: 'Completed' })
        .then(() => {
            props.handleSetReloadNums()
        })
    }

    const handleShowItems = () => {
        setShowItems(!showItems)
    }

    return (
        <View style={styles.orderCard}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{props.order.totalQuantity} {props.order.totalQuantity === 1 ? 'Item' : 'Items'}</Text>
                <Text style={[{ fontSize: 20, fontWeight: "bold" }, props.order.status === 'Pending' ? { color: "orange" } : { color: "green" }]}>Order {props.order.status}</Text>
            </View>
            <View style={styles.separator} />
            <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                    <Text style={[styles.orderDetailsSubText, { fontWeight: "bold" }]}>Order For:</Text>
                    <Text style={styles.orderDetailsSubText}>{props.order.user.name}</Text>
                </View>
                {
                    props.order.isDelivery &&
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text style={[styles.orderDetailsSubText, { fontWeight: "bold" }]}>Delivery to:</Text>
                        <Text style={styles.orderDetailsSubText}>{props.order.shippingAddress1}</Text>
                    </View>
                }
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                    <Text style={[styles.orderDetailsSubText, { fontWeight: "bold" }]}>Email:</Text>
                    <Text style={styles.orderDetailsSubText}>{props.order.user.email}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                    <Text style={[styles.orderDetailsSubText, { fontWeight: "bold" }]}>Phone:</Text>
                    <Text style={styles.orderDetailsSubText}>{props.order.user.phone}</Text>
                </View>
            </View>
            <View style={styles.separator} />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity style={styles.showItemsButton} onPress={handleShowItems}>
                    <Text style={styles.showItemText}>{showItems ? 'Hide' : 'Show'} Items</Text>
                </TouchableOpacity>
                {
                    props.order.status === 'Pending' &&
                    <TouchableOpacity style={styles.markCompleteButton} onPress={handleMarkComplete}>
                        <Text style={styles.markCompleteText}>Mark Complete</Text>
                    </TouchableOpacity>
                }
            </View>
            {
                showItems &&
                <View style={styles.itemsContainer}>

                    {props.order.orderItems.map(orderItem => {
                        return (
                            <View style={styles.showItemsContainer}>
                                <Text style={styles.showItemsText}>{orderItem.product.name}</Text>
                                <View style={styles.quantityContainer}>
                                    <Text style={styles.showItemsQuantityText}>{orderItem.quantity}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    orderCard: {
        width: "100%",
        borderRadius: 5,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fcfcfc',
        shadowColor: '#a6a6a6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
    },
    separator: {
        borderWidth: 0.75,
        borderColor: "#d9d9d9",
        marginVertical: 15
    },
    orderDetailsSubText: {
        color: "grey",
        fontSize: 17
    },
    showItemsButton: {
        borderWidth: 1.5,
        borderColor: "green",
        padding: 8,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    showItemText: {
        color: "green",
        fontWeight: "bold",
        fontSize: 16
    },
    markCompleteButton: {
        backgroundColor: "green",
        borderRadius: 5,
        padding: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    markCompleteText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    itemsContainer: {
        marginTop: 20,
        paddingHorizontal: 5
    },
    showItemsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
        alignItems: "center"
    },
    showItemsText: {
        fontSize: 17,
        fontWeight: "bold"
    },
    quantityContainer: {
        backgroundColor: "black",
        height: 26,
        width: 26,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    showItemsQuantityText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17
    }
})

export default OrderCard;