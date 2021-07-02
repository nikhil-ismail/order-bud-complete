import React from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";

import { useSelector } from 'react-redux';
import { selectCartBusiness, selectCartBusinessCoverImage } from '../../../Redux/cartSlice';

const { width, height } = Dimensions.get('window')

const CheckoutHeader = props => {

    const business = useSelector(selectCartBusiness);
    const coverImage = useSelector(selectCartBusinessCoverImage);

    return (
        <View >
            <Image
                style={styles.coverPhoto}
                source={{ uri: coverImage }}
            />
            <View style={styles.businessNameContainer}>
                <Text style={styles.businessNameText}>{`Your Order From `}</Text>
                <Text style={[styles.businessNameText, { color: "green", fontSize: 30 }]}>{`${business}`}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    coverPhoto: {
        width: width,
        height: height * 0.225,
    },
    businessNameContainer: {
        paddingHorizontal: 20,
        justifyContent: "center",
        backgroundColor: "white",
        paddingVertical: 20,
    },
    businessNameText: {
        fontWeight: "bold",
        fontSize: 24,
    }
})

export default CheckoutHeader;