import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';

const BusinessCategories = (props) => {

    return (
        <ScrollView
            horizontal={true}
            bounces={true}
            contentContainerStyle={styles.horizontalScrollContainer}
        >
            {props.categories.map(category => {
                return (
                    <TouchableOpacity key={category.name} style={styles.menuFilterTextContainer}>
                        <Text style={styles.menuFilterText}>{category.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    horizontalScrollContainer: {
        backgroundColor: "white",
        paddingBottom: 15,
    },
    menuFilterTextContainer: {
        marginHorizontal: 5,
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderRadius: 15,
        backgroundColor: 'rgba(0, 128, 0, 0.75)',
    },
    menuFilterText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
})

export default BusinessCategories;