import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window')

const AlreadyRated = props => {

    const { order } = props.route.params;

    return (
        <View>
            <View style={{backgroundColor: "white", flexDirection: "row", paddingTop: 25, paddingBottom: 15}}>
                <TouchableOpacity style={{marginTop: 30, marginLeft: 30}} onPress={() => props.navigation.navigate('Orders Home')}>
                    <Icon name="arrow-left" type="font-awesome-5" color="black" size={25} />
                </TouchableOpacity>
                <Text style={{fontSize: 22, fontWeight: "bold", marginTop: 30, marginLeft: 78}}>Rate Your Order</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>You already rated this order from</Text>
                        <Text style={styles.businessText}>{order.business.name}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: height
    },
    headerContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 200
    },
    headerText: {
        fontSize: 24,
        alignItems: "center"
    },
    businessText: {
        fontSize: 24,
        alignItems: "center",
        color: "green",
        fontWeight: "bold"
    }
})

export default AlreadyRated;