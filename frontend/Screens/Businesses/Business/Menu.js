import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

import MenuCard from './MenuCard';


const Menu = (props) => {

    return (
        <View style={styles.listContainer}>
            {props.categories.map(category => {
                return (
                    <View>
                        <View style={styles.categoryHeader}>
                            <Text style={styles.categoryHeaderText}>{category.name}</Text>
                        </View>
                        {props.products.map(product => {
                            return (
                                <View>
                                    {
                                        product.category.name === category.name && product.showOnMenu &&
                                        <MenuCard
                                            product={product}
                                            handleShowItemModal={props.handleShowItemModal}
                                        />
                                    }
                                </View>
                            );
                        })}
                    </View>
                )
            })}
        </View>
    )

}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        elevation: 8,
    },
    categoryHeader: {
        marginBottom: -1,
        marginTop: 9,
        width: "100%",
        backgroundColor: "white",
        paddingVertical: 10,
        borderRadius: 5,
    },
    categoryHeaderText: {
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 25,
        marginTop: 10
    }
})

export default Menu;