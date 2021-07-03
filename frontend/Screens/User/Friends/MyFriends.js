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
                    onFocus={() => props.navigation.navigate('Search Friends')}
                />
                <View>
                    <Text style={styles.requestHeader}>Requests</Text>
                        {
                            requests.length > 0 &&
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
                        }
                    <Text style={styles.friendHeader}>Friends</Text>
                        {
                            friends.length > 0 &&
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
        paddingVertical: 10
    },
    requestHeader: {
        fontSize: 22,
        fontWeight: "bold",
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    requestContainer: {
        marginVertical: 15,
        marginLeft: 15
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
})

export default MyFriends;