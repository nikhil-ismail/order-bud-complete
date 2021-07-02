import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

const BusinessInfo = (props) => {

    const { name, fullAddress, rating } = props.businessDetails

    return (
        <View>
            <View style={styles.profileTextContainer}>
                <View style={styles.businessNameAndRating}>
                    <Text style={styles.businessName}>{name}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 6 }}>
                    <Text style={styles.businessDetails}>{fullAddress}</Text>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    profileTextContainer: {
        flexDirection: "column",
        backgroundColor: 'white',
        width: "100%",
        borderRadius: 5,
        padding: 20
    },
    businessNameAndRating: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    businessName: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },
    ratingContainer: {
        backgroundColor: 'rgba(0, 128, 0, 0.75)',
        height: 32,
        width: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        padding: 5
    },
    ratingText: {
        fontWeight: "bold",
        color: "white"
    },
    businessDetails: {
        fontSize: 16,
        color: "grey"
    }
})

export default BusinessInfo;