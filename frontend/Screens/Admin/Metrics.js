import React from "react"
import { View, StyleSheet, Text } from 'react-native';

const AdminHome = (props) => {

    return (
        <View style={styles.sectionContainer}>
            <Text style={[styles.header]}>Performance</Text>
            <View style={styles.metricsContainer}>
                <View style={[styles.salesVolume, styles.metrics]}>
                    <Text style={styles.metricsIntroText}>Sales Volume</Text>
                    <Text style={styles.metricsMainText}>{`$${props.salesVolume.toFixed(2)}`}</Text>
                </View>
                <View style={[styles.orderVolume, styles.metrics]}>
                    <Text style={styles.metricsIntroText}>Order Volume</Text>
                    <Text style={styles.metricsMainText}>{`${props.orderVolume}`}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 30,
        marginBottom: 50,
        backgroundColor: '#fcfcfc',
        shadowColor: '#a6a6a6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 5,
        color: "#303030"
    },
    metricsContainer: {
        flexDirection: "row",
        width: "100%",
        marginTop: 10
    },
    metrics: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        width: "50%"
    },
    salesVolume: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopWidth: 1.25,
        borderBottomWidth: 1.25,
        borderLeftWidth: 1.25,
        borderColor: "rgba(11, 156, 49, 1)",
        borderRightWidth: 1.5
    },
    orderVolume: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderTopWidth: 1.25,
        borderBottomWidth: 1.25,
        borderRightWidth: 1.25,
        borderColor: "rgba(11, 156, 49, 1)"
    },
    metricsIntroText: {
        color: "grey",
        fontSize: 16
    },
    metricsMainText: {
        color: "green",
        fontWeight: "bold",
        fontSize: 24
    }
})

export default AdminHome;