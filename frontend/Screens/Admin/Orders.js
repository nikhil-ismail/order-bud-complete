import React from "react"
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import OrderCard from './OrderCard';

const { width, height } = Dimensions.get("window")

const Orders = (props) => {

    return (
        <View style={styles.sectionContainer}>
            <Text style={[styles.header, { marginBottom: 10 }]}>Orders</Text>
            <Text style={[styles.subHeader, { marginBottom: 10 }]}>Pending Orders</Text>
            {
                props.orders.filter(order => order.status === 'Pending').map(order => {
                    return (
                        <OrderCard order={order} handleSetReloadNums={props.handleSetReloadNums} />
                    )
                })
            }
            <Text style={[styles.subHeader, { marginBottom: 10, marginTop: 50 }]}>Completed Orders</Text>
            {
                props.orders.filter(order => order.status === 'Completed').map(order => {
                    return (
                        <OrderCard order={order} handleSetReloadNums={props.handleSetReloadNums} />
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 25,
        flex: 1
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 5,
        color: "#303030"
    },
    subHeader: {
        fontSize: 22,
        fontWeight: "bold",
        color: "grey",
        marginLeft: 5,
        marginTop: 20
    }
})

export default Orders;