import React from "react";
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';

const PasswordChangeHeader = props => {

    return (
        <View>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backBtn} onPress={props.handleEditPassword}>
                    <Icon name="arrow-left" type="font-awesome-5" color="black" size={17.5} />
                </TouchableOpacity>
                <Text style={styles.header}>Change Your Password</Text>
            </View>
            <View style={styles.separator} />
        </View>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        marginRight: 5
    },
    backBtn: {
        backgroundColor: "white",
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        marginBottom: 15
    },
    separator: {
        backgroundColor: "grey",
        height: 1,
        marginVertical: 15
    }
});

export default PasswordChangeHeader;