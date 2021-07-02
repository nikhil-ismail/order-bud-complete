import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';


const WeightSelector = (props) => {

    return (
        <View style={styles.selectSize}>
            <TouchableOpacity style={styles.leftSelectSize}>
                <Text style={styles.selectSizeText}>1g</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleSelectSize}>
                <Text style={styles.selectSizeText}>2g</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleSelectSize}>
                <Text style={styles.selectSizeText}>1/8oz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightSelectSize}>
                <Text style={styles.selectSizeText}>1/4oz</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    selectSize: {
        flexDirection: "row",
    },
    leftSelectSize: {
        backgroundColor: "#e6e6e6",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingVertical: 15,
        width: 80,
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#b3b3b3"
    },
    rightSelectSize: {
        backgroundColor: "#e6e6e6",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        paddingVertical: 15,
        width: 80,
        alignItems: "center"
    },
    middleSelectSize: {
        backgroundColor: "#e6e6e6",
        paddingVertical: 15,
        width: 80,
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#b3b3b3"
    },
    selectSizeText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    }
})

export default WeightSelector;