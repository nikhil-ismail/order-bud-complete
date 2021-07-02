import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import MyFriendCard from './MyFriendCard';

const MyFriends = (props) => {
    
    //const [added, setAdded] = useState(true);

    //const handleAdd = () => {
        //setAdded(!added);
    //}

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.requestContainer}>
                    <Text style={styles.requestText}>Requests</Text>
                </View>
                <ScrollView>
                    <MyFriendCard added={false} />
                    <MyFriendCard added={false} />
                </ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>25 Friends</Text>
                </View>
                <ScrollView>
                    <MyFriendCard added={true} />
                    <MyFriendCard added={true} />
                    <MyFriendCard added={true} />
                    <MyFriendCard added={true} />
                    <MyFriendCard added={true} />
                    <MyFriendCard added={true} />
                    <MyFriendCard added={true} />
                    <MyFriendCard added={true} />
                    <MyFriendCard added={true} />
                    <MyFriendCard added={true} />
                    <MyFriendCard added={true} />
                    <MyFriendCard added={true} />
                    <MyFriendCard added={true} />
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    }
})

export default MyFriends;