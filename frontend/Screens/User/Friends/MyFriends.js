import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from "react-native";

import MyFriendCard from './MyFriendCard';

const MyFriends = (props) => {
    
    const requests = props.requests;
    const friends = props.friends;

    return (
        <SafeAreaView>
            <ScrollView>
                <TextInput
                    placeholder="Search friends on OrderBud..."
                    style={styles.enterAddressField}
                />
                <View>
                    <Text style={styles.requestHeader}>{props.requestsCount} {props.requestsCount === 1 ? 'Request' : 'Requests'}</Text>
                        {
                            requests.length > 0 ?
                            <View>
                                {
                                    requests.map(request => {
                                        return (
                                            <MyFriendCard
                                                key={request._id}
                                                friend={request}
                                            />
                                        )
                                    })
                                }
                            </View>
                            :
                            <View style={styles.cardContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.userSecondary}>You have no friend requests at the moment</Text>
                                </View>
                            </View>
                        }
                    <Text style={styles.friendHeader}>{props.friendsCount} {props.friendsCount === 1 ? 'Friend' : 'Friends'}</Text>
                        {
                            friends.length > 0 ?
                            <View>
                                {
                                    friends.map(friend => {
                                        return (
                                            <MyFriendCard
                                                key={friend._id}
                                                friend={friend}
                                                navigation={props.navigation}
                                            />
                                        )
                                    })
                                }
                            </View>
                            :
                            <View style={styles.cardContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.userSecondary}>Send a friend request now to explore other orders!</Text>
                                </View>
                            </View>
                        }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    friendHeader: {
        fontSize: 22,
        fontWeight: "bold",
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 5
    },
    requestHeader: {
        fontSize: 22,
        fontWeight: "bold",
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 5
    },
    requestText: {
        fontSize: 17,
        fontWeight: "bold"
    },
    headerContainer: {
        marginVertical: 15,
        marginLeft: 15
    },
    headerText: {
        fontSize: 17,
        fontWeight: "bold"
    },
    cardContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 20,
        marginVertical: 5
    },
    nameContainer: {
        marginHorizontal: 18,
    },
    userSecondary: {
        color: "grey",
        fontSize: 16,
    },
})

export default MyFriends;