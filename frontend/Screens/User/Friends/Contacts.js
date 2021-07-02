import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import MyFriendCard from './MyFriendCard';

const Contacts = (props) => {
    
    //const [added, setAdded] = useState(true);

    //const handleAdd = () => {
        //setAdded(!added);
    //}

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>7 Contacts On OrderBud</Text>
                </View>
                <MyFriendCard added={false} />
                <MyFriendCard added={false} />
                <MyFriendCard added={false} />
                <MyFriendCard added={false} />
                <MyFriendCard added={false} />
                <MyFriendCard added={false} />
                <MyFriendCard added={false} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginVertical: 15,
        marginLeft: 15
    },
    headerText: {
        fontSize: 17,
        fontWeight: "bold"
    }
})

export default Contacts;