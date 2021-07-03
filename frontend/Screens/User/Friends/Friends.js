import React, { useState, useCallback } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import SearchBar from '../../../Shared/SearchBar';

import MyFriends from "./MyFriends";

const Friends = (props) => {

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Friends</Text>
                </View>
                <SearchBar showFilterIcon={false} placeholder="Search friends on OrderBud..." />
                <MyFriends />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 26,
        fontWeight: "bold"
    },
    categoryContainer: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "white",
        marginTop: 3,
        paddingVertical: 15
    },
    category: {
        flexDirection: "column",
    },
    categoryText: {
        fontSize: 17,
        marginTop: 10,
        color: "green"
    }
})

export default Friends;