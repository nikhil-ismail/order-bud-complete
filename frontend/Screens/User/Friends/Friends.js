import React, { useState, useCallback } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { useFocusEffect } from '@react-navigation/native'
import { Icon } from 'react-native-elements';

import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectUserId } from '../../../Redux/userSlice';

import baseUrl from '../../../assets/common/baseUrl';

const Friends = (props) => {

    const userId = useSelector(selectUserId);

    const [requestsToAccept, setRequestsToAccept] = useState([])
    const [sentRequests, setSentRequests] = useState([])
    const [friends, setFriends] = useState([]);
    const [friendsCount, setFriendsCount] = useState(0);
    const [requestsCount, setRequestsCount] = useState(0);

    useFocusEffect(
        useCallback(() =>{
            axios.get(`${baseUrl}friends/${userId}`)
                .then(res => {
                    setRequestsToAccept(res.data.requestsToAccept);
                    setSentRequests(res.data.sentRequests);
                    setFriends(res.data.friends);
                    setFriendsCount(friends.length);
                    setRequestsCount(requestsToAccept.length);
                })
        }, [requestsToAccept.length, sentRequests.length, friends.length])
    )

    return (
        <SafeAreaView>
            <View style={styles.categoryContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Friends</Text>
                    <TouchableOpacity style={styles.addIcon} onPress={() => props.navigation.navigate('Add Friends')}>
                        <Icon name="user-plus" type="font-awesome-5" color="green" size={25} />
                    </TouchableOpacity>
                </View>
                <TextInput
                    onFocus={() => props.navigation.navigate('Search Friends')}
                    placeholder="Search friends on OrderBud..."
                    style={styles.enterAddressField}
                />
                <View style={styles.categoryContainer}>
                    <TouchableOpacity style={styles.category} onPress={() => props.navigation.navigate('My Friends', {friends: friends, friendsCount: friendsCount})}>
                        <Icon name="users" type="font-awesome-5" color="black" size={30} />
                        <Text style={styles.categoryText}>{friendsCount} Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={() => props.navigation.navigate('Friend Requests', {requests: requestsToAccept, requestsCount: requestsCount})}>
                        <Icon name="inbox" type="font-awesome-5" color="black" size={30} />
                        <Text style={styles.categoryText}>{requestsCount} Requests</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 26,
        marginLeft: 160,
        fontWeight: "bold"
    },
    addIcon: {
        marginRight: 30
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
    categoryContainer: {
        flexDirection: "column"
    },
    category: {
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 30,
        paddingLeft: 20,
        marginVertical: 2
    },
    categoryText: {
        fontSize: 20,
        color: "green",
        fontWeight: "bold",
        marginLeft: 15,
        marginTop: 5
    }
})

export default Friends;