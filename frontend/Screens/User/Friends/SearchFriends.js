import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { Icon } from 'react-native-elements';

import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectUserId } from '../../../Redux/userSlice';

import baseUrl from '../../../assets/common/baseUrl';

const SearchFriends = (props) => {
    const [friends, setFriends] = useState([]);

    const userId = useSelector(selectUserId);

    const onFriendSearch = async name => {
        try {
            if (name.length > 2) {
                const result = await axios.get(`${baseUrl}friends/search/${userId}?searchTerm=${name}`)
                console.log(result.data)
                setFriends(result.data.userAlreadyFriends)
            } else if (name.length === 0) {
                setFriends([])
            }
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
                <Text style={styles.headerText}>Search Friends</Text>
            </View>
                <TextInput
                    placeholder="Search your friends on OrderBud..."
                    style={styles.enterAddressField}
                    onChangeText={name => onFriendSearch(name)}
                />
                {
                    friends.map(friend => {
                        return (
                            <TouchableOpacity key={friend.user._id} style={styles.resultContainer} onPress={() => props.navigation.navigate('Friends Orders To Friend Feed', friend.user)}>
                                <View style={styles.userDetails}>
                                    <Text style={styles.userMain}>{friend.user.name}</Text>
                                    <Text style={styles.userSecondary}>{friend.user.email}</Text>
                                </View>
                                <View style={styles.alreadyFriendsButton}>
                                    <Text style={styles.alreadyFriendsButtonText}>Friends</Text>
                                </View>
                            </TouchableOpacity>
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
    }
})

export default SearchFriends;