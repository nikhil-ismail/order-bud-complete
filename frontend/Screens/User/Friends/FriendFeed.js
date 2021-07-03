import React, { useState, useCallback } from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import axios from 'axios';

import { useFocusEffect } from '@react-navigation/native'

import FriendOrderCard from './FriendOrderCard';

import { useSelector } from 'react-redux';
import { selectUserId } from '../../../Redux/userSlice';

import baseURL from '../../../assets/common/baseUrl';

const FriendFeed = (props) => {

    const [orders, setOrders] = useState([]);
    const [businesses, setBusinesses] = useState([]);

    const userId = useSelector(selectUserId);
    const friend = props.route.params;
    const friendName = friend.requester._id === userId ? friend.recipient.name : friend.requester.name;
    const friendId = friend.requester._id === userId ? friend.recipient._id : friend.requester._id;

    useFocusEffect(
        useCallback(() => {

            // Orders
            axios.get(`${baseURL}orders/${friendId}`)
            .then(res => {
                setOrders(res.data);
            })
            .catch(err => {
                console.log('Api call error - getting friend orders');
            })

            axios.get(`${baseURL}businesses`)
            .then((res) => {
            setBusinesses(res.data);
            })
            .catch((error) => {
            console.log('Api call error - businesses')
            })

            return () => {
            setOrders([]);
            setBusinesses([]);
            };

        }, [])
    )

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>FRIEND FEED</Text>
                {
                    orders.length === 0 ?
                    <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
                        <Text style={{color: "grey", fontSize: 20}}>{friendName} has not placed any orders yet.</Text>
                    </View>
                    :
                    <View style={{ backgroundColor: "white", marginTop: 10 }}>
                        {orders.map(order => {
                            return <FriendOrderCard
                            navigation={props.navigation}
                            businesses={businesses}
                            order={order}
                        />
                        })
                        }
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})

export default FriendFeed;