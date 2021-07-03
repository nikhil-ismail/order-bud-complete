import React, { useState, useCallback } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity, TextInput } from "react-native";
import { useFocusEffect } from '@react-navigation/native'

import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectUserId } from '../../../Redux/userSlice';

import baseUrl from '../../../assets/common/baseUrl';

import MyFriends from "./MyFriends";

const Friends = () => {
    const [noInteraction, setNoInteraction] = useState([]);
    const [receivedRequest, setReceivedRequest] = useState([]);
    const [sentRequest, setSentRequest] = useState([]);
    const [alreadyFriends, setAlreadyFriends] = useState([]);

    const userId = useSelector(selectUserId);

    const onFriendSearch = async name => {
        try {
            if (name.length > 2) {
                const result = await axios.get(`${baseUrl}friends/search/${userId}?searchTerm=${name}`)
                setReceivedRequest(result.data.userRecievedRequest)
                setSentRequest(result.data.userSentRequest)
                setAlreadyFriends(result.data.userAlreadyFriends)
                setNoInteraction(result.data.userNoInteraction)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Friends</Text>
                </View>
                <TextInput
                    showFilterIcon={false}
                    placeholder="Search friends on OrderBud..."
                    style={styles.enterAddressField}
                    onChangeText={name => onFriendSearch(name)}
                />
                {
                    receivedRequest.map(result => {
                        return (
                            <View
                                key={result._id}
                                style={styles.resultContainer}
                            >
                                <View style={styles.userDetails}>
                                    <Text style={styles.userMain}>{result.name}</Text>
                                    <Text style={styles.userSecondary}>{result.email}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.addFriendButton}
                                >
                                    <Text>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
                {
                    alreadyFriends.map(result => {
                        return (
                            <View
                                key={result._id}
                                style={styles.resultContainer}
                            >
                                <View style={styles.userDetails}>
                                    <Text style={styles.userMain}>{result.name}</Text>
                                    <Text style={styles.userSecondary}>{result.email}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.addFriendButton}
                                >
                                    <Text>Already Friends</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
                {
                    sentRequest.map(result => {
                        return (
                            <View
                                key={result._id}
                                style={styles.resultContainer}
                            >
                                <View style={styles.userDetails}>
                                    <Text style={styles.userMain}>{result.name}</Text>
                                    <Text style={styles.userSecondary}>{result.email}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.addFriendButton}
                                >
                                    <Text>Pending</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
                {
                    noInteraction.map(result => {
                        return (
                            <View
                                key={result._id}
                                style={styles.resultContainer}
                            >
                                <View style={styles.userDetails}>
                                    <Text style={styles.userMain}>{result.name}</Text>
                                    <Text style={styles.userSecondary}>{result.email}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.addFriendButton}
                                >
                                    <Text>Add Friend</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

/*
    <View style={styles.categoryContainer}>
        <View style={styles.category}>
            <View style={{marginLeft: 25}}>
                <Icon name="user-friends" type="font-awesome-5" color="black" size={25} />
            </View>
            <Text style={[{marginLeft: 30}, styles.categoryText]}>My Friends</Text>
        </View>
    </View>
    <MyFriends />
*/

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
    },
    enterAddressField: {
        backgroundColor: "white",
        padding: 15,
        marginHorizontal: 25,
        fontSize: 16,
        shadowColor: '#a6a6a6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        fontSize: 20,
        marginVertical: 15
    },
    resultContainer: {
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 0.25,
        borderBottomColor: "grey",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    userDetails: {
        marginHorizontal: 10
    },
    userMain: {
        fontSize: 20,
        fontWeight: "bold"
    },
    userSecondary: {
        color: "grey",
        fontSize: 16,
        marginTop: 7.5
    },
    addFriendButton: {
        backgroundColor: "grey",
        width: 100,
        height: 50,
        borderRadius: 10
    }
})

export default Friends;