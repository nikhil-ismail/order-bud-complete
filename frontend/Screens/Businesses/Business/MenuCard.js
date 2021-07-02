import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';

var { width } = Dimensions.get("window");

const MenuCard = (props) => {

    const { name, image, brand, description, countInStock } = props.product;

    const handlePress = () => {
        props.handleShowItemModal(props.product)
    }

    return (
            <TouchableOpacity style={styles.productContainer} onPress={handlePress}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={styles.productDetails}>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.title}>{name}</Text>
                            <Text style={styles.subText}>{brand}</Text>
                        </View>
                        <Text style={styles.description}>{description.length > 70 ? description.substr(0, 70) + '...' : description}</Text>
                        {
                            countInStock === 0 &&
                            <Text style={styles.outOfStock}>Out Of Stock</Text>
                        }
                    </View>
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={{
                            uri: image ? image : null
                        }}
                    />
                </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        width: '100%',
        marginVertical: 1,
        paddingTop: 25,
        paddingBottom: 10,
        elevation: 8,
        backgroundColor: 'white',
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 5
    },
    productDetails: {
        flexGrow: 1,
        flex: 1,
        marginLeft: 25,
    },
    subText: {
        color: "grey",
        fontWeight: "bold",
        fontSize: 18,
    },
    image: {
        width: 125,
        height: 125,
        borderRadius: 5,
        marginHorizontal: 15
    },
    description: {
        fontSize: 17,
        color: 'grey'
    },
    outOfStock: {
        color: "red",
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 10
    }
})

export default MenuCard;