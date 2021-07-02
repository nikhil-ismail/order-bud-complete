import React, { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, View, ActivityIndicator, Dimensions, Text, ScrollView } from 'react-native';
import { Container } from "native-base";
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

import Item from '../Item/Item';
import MenuCard from '../Business/MenuCard';
import ViewCartButton from "../Cart/ViewCartButton";

import baseURL from "../../../assets/common/baseUrl";

const { width, height } = Dimensions.get('window')

const CategoryFilterResults = (props) => {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState();
    const [product, setProduct] = useState();
    const [showItemModal, setShowItemModal] = useState(false);

    const cart = useSelector(selectCartItems);

    const handleShowItemModal = (product) => {
        setProduct(product)
        setShowItemModal(true);
    }

    const handleRemoveItemModal = () => {
        setProduct();
        setShowItemModal(false);
    }

    useFocusEffect(
        useCallback(() => {
            axios.get(`${baseURL}search/category/?category=${props.route.params.category}`)
                .then((res) => {
                    setResults(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('Api call error - category search')
                })

            return () => {
                setResults([]);
            };
        }, [])
    )

    return (
        <>
            {loading === false ? (
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.categoryFilterHeader}>
                            <Text style={styles.categoryTitle}>{props.route.params.category}</Text>
                        </View>
                        <View style={styles.numResultsContainer}>
                            <Text style={styles.matchesText}>{results.length} {results.length === 1 ? "match" : "matches"}</Text>
                        </View>
                        <View>
                            {
                                results.map(result => {
                                    return (
                                        <MenuCard
                                            product={result}
                                            handleShowItemModal={handleShowItemModal}
                                        />
                                    )
                                })
                            }
                        </View>
                        <Item
                            showItemModal={showItemModal}
                            product={product}
                            handleRemoveItemModal={handleRemoveItemModal}
                            navigation={props.navigation}
                        />
                    </ScrollView>
                    {
                        cart.length > 0 &&
                        <ViewCartButton navigation={props.navigation} />
                    }
                </View>
            ) : (
                    <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
                        <ActivityIndicator size="large" color="green" />
                    </Container>
                )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryFilterHeader: {
        width: width,
        height: height * 0.225,
        backgroundColor: "grey"
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 40,
        position: "absolute",
        bottom: 10,
        left: 20
    },
    numResultsContainer: {
        backgroundColor: "white",
        padding: 15
    },
    matchesText: {
        fontSize: 28,
        fontWeight: "bold",
        paddingLeft: 5
    }
})

export default CategoryFilterResults;