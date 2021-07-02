import React, { useState, useCallback } from "react"
import { SafeAreaView, StyleSheet, Dimensions, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'

import axios from 'axios';

import baseURL from "../../assets/common/baseUrl";

const { width, height } = Dimensions.get("window")

const ManageProducts = (props) => {
    const { business } = props.route.params;

    const [topProducts, setTopProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [filteredCategories, setFilteredCategories] = useState([]);

    useFocusEffect(
        useCallback(() => {
            axios.get(`${baseURL}products/topProducts/${business.id}`)
                .then(res => {
                    setTopProducts(res.data);
                })
                .catch(err => {
                    console.log(err);
                })

            axios.get(`${baseURL}products/${business.id}`)
                .then(res => {
                    let filters = []

                    for (let i = 0; i < business.categories.length; i++) {
                        for (let j = 0; j < res.data.length; j++) {
                            if (res.data[j].category.name === business.categories[i].name) {
                                filters.push(business.categories[i]);
                                break;
                            }
                        }
                    }

                    setFilteredCategories(filters);
                    setCurrentProducts(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }, [])
    )

    return (
        <>
            {
                loading === false ?
                    <View style={styles.container}>
                        <SafeAreaView style={styles.safeContainer}>
                            <ScrollView>
                                {
                                    topProducts.length > 0 &&
                                    <View>
                                        <Text style={styles.header}>Your Top Selling Products</Text>
                                        <ScrollView horizontal={true}>
                                            {
                                                topProducts.map(topProduct => {
                                                    return (
                                                        <View style={[styles.topProductsContainer, { justifyContent: "space-between" }]}>
                                                            <View>
                                                                <Text style={styles.productName}>{topProduct.product.name}</Text>
                                                                <Text style={styles.subText}>{topProduct.product.brand}</Text>
                                                            </View>
                                                            <Text style={styles.numberSold}>{topProduct.count} Sold</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>
                                }
                                <View>
                                    <Text style={styles.header}>Current Inventory</Text>
                                    {
                                        filteredCategories.map(category => {
                                            return (
                                                <View style={styles.categorySection}>
                                                    <Text style={styles.categoryHeader}>{category.name}</Text>
                                                    {
                                                        currentProducts.map(product => {
                                                            return (
                                                                <View>
                                                                    {
                                                                        product.category.name === category.name &&
                                                                        <View>
                                                                            <View style={styles.currentProductsCard}>
                                                                                <View style={styles.productDetailsContainer}>
                                                                                    <View style={{ width: "30%" }}>
                                                                                        <Image
                                                                                            style={product.image ? styles.productImage : styles.productImagePlaceholder}
                                                                                            source={{ uri: product.image }}
                                                                                        />
                                                                                    </View>
                                                                                    <View style={{ width: "70%", paddingHorizontal: 10 }}>
                                                                                        <Text style={[styles.productName]}>{product.name}</Text>
                                                                                        <Text style={[styles.subText]}>{product.brand}</Text>
                                                                                        {
                                                                                            product.countInStock === 0
                                                                                            ?
                                                                                            <Text style={[styles.subText, { fontWeight: "bold", color: "red" }]}>{product.countInStock} In Stock</Text>
                                                                                            :
                                                                                            (
                                                                                                product.countInStock < 5
                                                                                                ?
                                                                                                <Text style={[styles.subText, { fontWeight: "bold", color: "orange" }]}>{product.countInStock} In Stock</Text>
                                                                                                :
                                                                                                <Text style={[styles.subText, { fontWeight: "bold", color: "green" }]}>{product.countInStock} In Stock</Text>
                                                                                            )
                                                                                        }
                                                                                    </View>
                                                                                </View>
                                                                                <View style={{ width: "15%" }}>
                                                                                    <TouchableOpacity
                                                                                        onPress={() => props.navigation.navigate('Edit Product', { business, product })}
                                                                                        style={styles.editButtonContainer}
                                                                                    >
                                                                                        <Text style={styles.editButtonText}>Edit</Text>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                            <View style={styles.separator} />
                                                                        </View>
                                                                    }
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    </View> :
                    <View style={{ backgroundColor: "#f2f2f2", justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="green" />
                    </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 20
    },
    safeContainer: {
        flex: 1
    },
    topProductsContainer: {
        width: width * 0.5,
        marginRight: 10,
        padding: 10,
        backgroundColor: '#fcfcfc',
        shadowColor: '#a6a6a6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        marginTop: 10,
        marginBottom: 40
    },
    header: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 28,
        fontWeight: "bold"
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold"
    },
    subText: {
        color: "grey",
        fontSize: 18,
        marginVertical: 5
    },
    numberSold: {
        color: "green",
        fontWeight: "bold",
        fontSize: 18,
    },
    categorySection: {
        marginVertical: 10
    },
    categoryHeader: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "grey"
    },
    currentProductsCard: {
        marginVertical: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    productDetailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "85%"
    },
    productImage: {
        height: 100,
        width: 100,
        borderRadius: 5
    },
    productImagePlaceholder: {
        height: 100,
        width: 100,
        borderRadius: 5,
        backgroundColor: "grey"
    },
    editButtonContainer: {
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        height: 40,
        width: "100%"
    },
    editButtonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold"
    },
    separator: {
        borderWidth: 0.75,
        borderColor: "#d9d9d9",
        marginBottom: 15
    }
})

export default ManageProducts;