import React from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectUserId } from '../../../Redux/userSlice';

import baseUrl from '../../../assets/common/baseUrl';

const MyFriendCard = (props) => {

    const userId = useSelector(selectUserId);
    const friend = props.friend;

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
                    <View style={styles.nameContainer}>
                        <Text style={styles.userMain}>{props.friend.requester.name}</Text>
                        <Text style={styles.userSecondary}>{props.friend.requester.email}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addedContainer}
                        onPress={handleAcceptFriendRequest}
                    >
                        <Text style={styles.addedText}>Accept</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.cardContainer} onPress={() => props.navigation.navigate('Friends List To Friend Feed', friend)}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.userMain}>
                            {
                                props.friend.requester._id === userId
                                ?
                                props.friend.recipient.name
                                :
                                props.friend.requester.name
                            }
                        </Text>
                        <Text style={styles.userSecondary}>
                            {
                                props.friend.requester._id === userId
                                ?
                                props.friend.recipient.email
                                :
                                props.friend.requester.email
                            }
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.addedContainer}>
                        <Text style={styles.addedText}>Friends</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 5,
        borderBottomWidth: 0.25,
        borderBottomColor: "grey",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    nameContainer: {
        marginHorizontal: 18,
        marginTop: 10
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
    addedContainer: {
        marginHorizontal: 10,
        borderRadius: 10,
        borderColor: "green",
        borderWidth: 2,
        paddingHorizontal: 27.5,
        paddingVertical: 7.5
    },
    addedText: {
        color: "green",
        fontWeight: "bold"
    }
})

export default MyFriendCard;