import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';


const QuantitySetter = (props) => {

    return (
        <View style={styles.selectQuantity}>
            <TouchableOpacity onPress={props.onMinus} style={styles.leftSelectQuantity}>
                <Icon name="minus" type="font-awesome-5" color="green" size={17.5} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.quantity}>
                <Text style={styles.selectSizeText}>{props.quantity}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPlus} style={styles.rightSelectQuantity}>
                <Icon name="plus" type="font-awesome-5" color="green" size={17.5} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    selectQuantity: {
        borderWidth: 1,
        borderRadius: 30,
        flexDirection: "row",
        width: "66%",
        justifyContent: "center",
        marginVertical: 25
    },
    quantity: {
        width: 80,
        alignItems: "center",
        justifyContent: "center",
    },
    rightSelectQuantity: {
        paddingVertical: 15,
        width: 80,
        alignItems: "center",
    },
    leftSelectQuantity: {
        paddingVertical: 15,
        width: 80,
        alignItems: "center",
    }
})

export default QuantitySetter;