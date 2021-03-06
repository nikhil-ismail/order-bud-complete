import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

import MyFriendCard from './MyFriendCard';

const MyFriends = (props) => {
    
    const {friends} = props.route.params;

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-left" type="font-awesome-5" color="black" size={26} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Your Friends</Text>
                    <TouchableOpacity style={styles.addIcon} onPress={() => props.navigation.navigate('Add Friends')}>
                        <Icon name="user-plus" type="font-awesome-5" color="green" size={25} />
                    </TouchableOpacity>
                </View>
                <TextInput
                    onFocus={() => props.navigation.navigate('Search Friends')}
                    placeholder="Search friends on OrderBud..."
                    style={styles.enterAddressField}
                />
                <View>
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
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 26,
        marginLeft: 135,
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

export default MyFriends;