import React from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectUserId } from '../../../Redux/userSlice';

import baseUrl from '../../../assets/common/baseUrl';

const MyFriendCard = (props) => {

    const userId = useSelector(selectUserId);
    const friend = props.friend;

    console.log(friend);

    const handleAcceptFriendRequest = async () => {
        try {
            const acceptRequest = await axios.put(`${baseUrl}friends/acceptFriendRequest`, { friendId: props.friend});    
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView>
            {
                props.friend.status === "pending"
                ?
                <TouchableOpacity style={styles.cardContainer}>
                    <View style={styles.profilePicturePlaceholder} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{props.friend.requester.name}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addedContainer}
                        onPress={handleAcceptFriendRequest}
                    >
                        <Text style={styles.addedText}>Accept</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.cardContainer} onPress={() => props.navigation.navigate('Friend Feed', friend)}>
                    <View style={styles.profilePicturePlaceholder} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>
                            {
                                props.friend.requester._id === userId
                                ?
                                props.friend.recipient.name
                                :
                                props.friend.requester.name
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
            }
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

export default MyFriendCard;