import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

import MyFriendCard from './MyFriendCard';

const FriendRequests = (props) => {
    
    const {requests} = props.route.params;

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-left" type="font-awesome-5" color="black" size={26} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Requests</Text>
                    <TouchableOpacity style={styles.addIcon} onPress={() => props.navigation.navigate('Add Friends')}>
                        <Icon name="user-plus" type="font-awesome-5" color="green" size={25} />
                    </TouchableOpacity>
                </View>
                <View>
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
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 26,
        marginLeft: 150,
        fontWeight: "bold"
    },
    iconContainer: {
        position: "absolute",
        left: 25
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

export default FriendRequests;