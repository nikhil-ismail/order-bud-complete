import React, { useState, useCallback } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native'
import { Icon } from 'react-native-elements';

import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectUserId } from '../../../Redux/userSlice';

import baseUrl from '../../../assets/common/baseUrl';

import MyFriends from '../Friends/MyFriends';

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
                    console.log(res.data);
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
                <MyFriends
                    requests={requestsToAccept}
                    friends={friends}
                    navigation={props.navigation}
                    friendsCount={friendsCount}
                    requestsCount={requestsCount}
                />
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
    }
})

export default Friends;