import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

const MyFriends = (props) => {

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.cardContainer}>
                    <View style={styles.profilePicturePlaceholder} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>Greg Hutner</Text>
                    </View>
                    {props.added ?
                    <TouchableOpacity style={styles.addedContainer}>
                        <Text style={styles.addedText}>Added</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.addContainer}>
                        <Text style={styles.addText}>+ Add</Text>
                    </TouchableOpacity>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 20,
        marginVertical: 2
    },
    profilePicturePlaceholder: {
        backgroundColor: "grey",
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginLeft: 20,
        height: "100%",
        width: "8%",
        borderRadius: 60
    },
    nameContainer: {
        marginHorizontal: 18,
        marginTop: 10
    },
    name: {
        fontSize: 16
    },
    addedContainer: {
        alignItems: "flex-end",
        marginLeft: 135,
        marginTop: 5,
        borderRadius: 10,
        borderColor: "green",
        borderWidth: 2,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    addedText: {
        fontSize: 16,
        color: "green"
    },
    addContainer: {
        alignItems: "flex-end",
        marginLeft: 138,
        marginTop: 5,
        borderRadius: 10,
        borderColor: "green",
        backgroundColor: "green",
        borderWidth: 2,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    addText: {
        fontSize: 16,
        color: "white"
    }
})

export default MyFriends;