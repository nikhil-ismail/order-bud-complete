import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { ListItem, Text } from 'native-base';

const CategoryFilter = (props) => {
        
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "white"}}
        >
            <ListItem>
                {props.categories.map((category) => (
                    <TouchableOpacity
                        key={category._id}
                        style={styles.imageFilter}
                        onPress={() => props.navigation.navigate('Category Filter Results', {category: category.name})}
                    >
                        <View style={styles.image}>
                            <Text style={styles.textStyle}>{category.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ListItem>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageFilter: {
        height: 80,
        width: 140,
        marginRight: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
        backgroundColor: 'green',
        opacity: 0.75,
        justifyContent: "center",
        padding: 10
    },
    textStyle: {
        color: "white",     
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default CategoryFilter;