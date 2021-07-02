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
                    <Text style={styles.headerText}>You already rated this order from {order.business.name}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        backgroundColor: "white",
        paddingVertical: 200,
    },
    headerText: {
        flexWrap: "wrap",
        marginLeft: 30,
        marginTop: 15,
        fontSize: 22,
        fontWeight: "bold"
    }
})

export default AlreadyRated;