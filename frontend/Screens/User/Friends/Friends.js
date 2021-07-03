import React, { useState, useCallback } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { useFocusEffect } from '@react-navigation/native'

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


    useFocusEffect(
        useCallback(() =>{
            axios.get(`${baseUrl}friends/${userId}`)
                .then(res => {
                    console.log(res.data);
                    setRequestsToAccept(res.data.requestsToAccept);
                    setSentRequests(res.data.sentRequests);
                    setFriends(res.data.friends);
                })
        }, [requestsToAccept.length, sentRequests.length, friends.length])
    )

    return (
        <SafeAreaView>
            <View style={styles.categoryContainer}>
                <MyFriends
                    requests={requestsToAccept}
                    friends={friends}
                    navigation={props.navigation}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})

export default Friends;