import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { Icon } from 'react-native-elements';

import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectUserId } from '../../../Redux/userSlice';

import baseUrl from '../../../assets/common/baseUrl';

const AddFriends = (props) => {
    const [noInteraction, setNoInteraction] = useState([]);
    const [receivedRequest, setReceivedRequest] = useState([]);
    const [sentRequest, setSentRequest] = useState([]);
    const [alreadyFriends, setAlreadyFriends] = useState([]);

    const userId = useSelector(selectUserId);

    const onFriendSearch = async name => {
        try {
            if (name.length > 2) {
                const result = await axios.get(`${baseUrl}friends/search/${userId}?searchTerm=${name}`)
                console.log(result.data)
                setReceivedRequest(result.data.userRecievedRequest)
                setSentRequest(result.data.userSentRequest)
                setAlreadyFriends(result.data.userAlreadyFriends)
                setNoInteraction(result.data.userNoInteraction)
            } else if (name.length === 0) {
                setReceivedRequest([])
                setSentRequest([])
                setAlreadyFriends([])
                setNoInteraction([])
            }
        } catch (err) {
            console.log(err);
        }
    }

    const addFriend = async result => {

        try {
            const friendship = {
                requester: userId,
                recipient: result.user._id
            }

            console.log(friendship);

            const addFriend = await axios.post(`${baseUrl}friends/addFriend`, friendship)

            setReceivedRequest([])
            setSentRequest([])
            setAlreadyFriends([])
            setNoInteraction([])
        } catch (err) {
            console.log(err);
        }
    }

    const handleAcceptFriendRequest = async result => {
        try {
            const acceptRequest = await axios.put(`${baseUrl}friends/acceptFriendRequest`, { friendId: result.friendId});
            setReceivedRequest([])
            setSentRequest([])
            setAlreadyFriends([])
            setNoInteraction([])    
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => props.navigation.goBack()}>
                    <Icon name="arrow-left" type="font-awesome-5" color="black" size={26} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Add Friends</Text>
            </View>
                <TextInput
                    placeholder="Add friends on OrderBud..."
                    style={styles.enterAddressField}
                    onChangeText={name => onFriendSearch(name)}
                />
                {
                    receivedRequest.map(result => {
                        console.log(result);
                        return (
                            <View
                                key={result.user._id}
                                style={styles.resultContainer}
                            >
                                <View style={styles.userDetails}>
                                    <Text style={styles.userMain}>{result.user.name}</Text>
                                    <Text style={styles.userSecondary}>{result.user.email}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.addFriendButton}
                                    onPress={() => handleAcceptFriendRequest(result)}
                                >
                                    <Text style={styles.addFriendButtonText}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
                {
                    alreadyFriends.map(result => {
                        return (
                            <View
                                key={result.user._id}
                                style={styles.resultContainer}
                            >
                                <View style={styles.userDetails}>
                                    <Text style={styles.userMain}>{result.user.name}</Text>
                                    <Text style={styles.userSecondary}>{result.user.email}</Text>
                                </View>
                                <View
                                    style={styles.alreadyFriendsButton}
                                >
                                    <Text style={styles.alreadyFriendsButtonText}>Friends</Text>
                                </View>
                            </View>
                        )
                    })
                }
                {
                    sentRequest.map(result => {
                        console.log(result);
                        return (
                            <View
                                key={result.user._id}
                                style={styles.resultContainer}
                            >
                                <View style={styles.userDetails}>
                                    <Text style={styles.userMain}>{result.user.name}</Text>
                                    <Text style={styles.userSecondary}>{result.user.email}</Text>
                                </View>
                                <View
                                    style={styles.pendingFriendButton}
                                >
                                    <Text style={styles.addFriendButtonText}>Sent</Text>
                                </View>
                            </View>
                        )
                    })
                }
                {
                    noInteraction.map(result => {
                        return (
                            <View key={result.user._id} style={styles.resultContainer}>
                                <View style={styles.userDetails}>
                                    <Text style={styles.userMain}>{result.user.name}</Text>
                                    <Text style={styles.userSecondary}>{result.user.email}</Text>
                                </View>
                                <TouchableOpacity style={styles.addFriendButton} onPress={() => addFriend(result)}>
                                    <Text style={styles.addFriendButtonText}>Add Friend</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        borderBottomWidth: 0.25
    },
    iconContainer: {
        position: "absolute",
        left: 20
    },
    headerText: {
        fontSize: 20,
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
        backgroundColor: "green",
        width: 110,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    addFriendButtonText: {
        color: "white",
        fontWeight: "bold"
    },
    alreadyFriendsButton: {
        backgroundColor: "white",
        borderColor: "green",
        borderWidth: 2,
        width: 110,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    alreadyFriendsButtonText: {
        color: "green",
        fontWeight: "bold"
    },
    pendingFriendButton: {
        backgroundColor: "#52ab62",
        width: 110,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default AddFriends;