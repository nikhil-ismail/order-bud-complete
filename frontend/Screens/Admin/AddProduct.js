import React, { useEffect, useState } from "react"
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity, TextInput, Platform, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import mime from 'mime';

import baseURL from "../../assets/common/baseUrl";

const { width, height } = Dimensions.get("window")

const AddProduct = (props) => {

    const [image, setImage] = useState();
    const [productName, setProductName] = useState();
    const [brand, setBrand] = useState();
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState();
    const [selectedCategory, setSelectedCategory] = useState();

    const [productNameFocus, setProductNameFocus] = useState(false);
    const [brandFocus, setBrandFocus] = useState(false);
    const [priceFocus, setPriceFocus] = useState(false);
    const [stockFocus, setStockFocus] = useState(false);
    const [descriptionFocus, setDescriptionFocus] = useState(false);

    const { business } = props.route.params;
    const categories = business.categories.map(category => category.name);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                try {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== 'granted') {
                        alert('Sorry, we need camera roll permissions to make this work!');
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const handleAddItem = () => {
        let formData = new FormData();

        if (image !== undefined) {
            const newImageUri = "file:///" + image.split("file:/").join("");

            formData.append('image', {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split('/').pop()
            });
        } else {
            formData.append('image', null);
        }
        formData.append('name', productName);
        formData.append('brand', brand ? brand : '');
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('description', description ? description : '');
        formData.append('category', selectedCategory);
        formData.append('business', business.id);

        axios.post(`${baseURL}products`, formData)
            .then(() => {
                props.navigation.goBack();
            })
            .catch(err => {
                console.log('error adding the item')
            })
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView contentContainerStyle={{ height: height - 20 }}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={image ? styles.businessCoverPhoto : styles.businessCoverPhotoPlaceholder}
                            source={{ uri: image }}
                        />
                        <TouchableOpacity style={styles.cameraIconContainer} onPress={pickImage}>
                            <Icon name="camera" type="font-awesome-5" color="green" size={22} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.businessDetails}>
                        <TextInput
                            placeholder="Product Name"
                            style={[styles.textInput, productNameFocus && styles.focusInputStyle]}
                            value={productName}
                            onChangeText={text => setProductName(text)}
                            onFocus={() => setProductNameFocus(true)}
                            onBlur={() => setProductNameFocus(false)}
                        />
                        <TextInput
                            placeholder="Brand"
                            style={[styles.textInput, brandFocus && styles.focusInputStyle]}
                            value={brand}
                            onChangeText={text => setBrand(text)}
                            onFocus={() => setBrandFocus(true)}
                            onBlur={() => setBrandFocus(false)}
                        />
                        <View style={styles.priceStockContainer}>
                            <TextInput
                                placeholder="Price"
                                style={[styles.textInput, styles.priceStockInput, priceFocus && styles.focusInputStyle]}
                                value={price}
                                onChangeText={text => setPrice(text)}
                                onFocus={() => setPriceFocus(true)}
                                onBlur={() => setPriceFocus(false)}
                            />
                            <TextInput
                                placeholder="Number In Stock"
                                style={[styles.textInput, styles.priceStockInput, stockFocus && styles.focusInputStyle]}
                                value={stock}
                                onChangeText={text => setStock(text)}
                                onFocus={() => setStockFocus(true)}
                                onBlur={() => setStockFocus(false)}
                            />
                        </View>
                        <TextInput
                            placeholder="Description"
                            multiline={true}
                            style={[styles.textInput, styles.descriptionInput, descriptionFocus && styles.focusInputStyle]}
                            value={description}
                            onChangeText={text => setDescription(text)}
                            onFocus={() => setDescriptionFocus(true)}
                            onBlur={() => setDescriptionFocus(false)}
                        />
                        <View style={styles.separator} />
                        <View style={styles.categoriesContainer}>
                            <Text style={[styles.categoryHeaderText, {marginBottom: 10}]}>What category will this product fall under?</Text>
                            <View style={styles.categoryTagsContainer}>
                                {
                                    categories.map(category => {
                                        return (
                                            <TouchableOpacity
                                                style={
                                                    selectedCategory === category ?
                                                        styles.selectedCategoryTag : styles.categoryTag
                                                }
                                                onPress={() => setSelectedCategory(category)}
                                            >
                                                <Text style={selectedCategory === category ? styles.selectedCategoryTagText : styles.categoryTagText}>{category}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <View style={styles.button}>
                <TouchableOpacity style={styles.buttonContainer} onPress={handleAddItem}>
                    <Text style={styles.buttonText}>Add Item</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: height,
        flex: 1
    },
    separator: {
        borderWidth: 0.5,
        borderColor: "#d3d3d3",
        marginVertical: 15
    },
    focusInputStyle: {
        borderColor: "green",
        borderWidth: 2
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    businessCoverPhoto: {
        width: 180,
        height: 180,
        borderRadius: 90
    },
    businessCoverPhotoPlaceholder: {
        backgroundColor: "grey",
        width: 180,
        height: 180,
        borderRadius: 90
    },
    cameraIconContainer: {
        position: "absolute",
        top: 130,
        left: 0.575 * width,
        borderRadius: 20,
        borderColor: "white",
        borderWidth: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        padding: 10
    },
    uploadCoverPhotoText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#404040"
    },
    businessDetails: {
        paddingHorizontal: 10,
        marginTop: 25
    },
    textInput: {
        marginVertical: 10,
        height: 50,
        borderRadius: 5,
        borderColor: "#e6e6e6",
        borderWidth: 2,
        width: "100%",
        paddingHorizontal: 20,
        fontSize: 18
    },
    priceStockContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    priceStockInput: {
        width: "49%"
    },
    descriptionInput: {
        height: 100,
        paddingTop: 10
    },
    categoriesContainer: {
        marginVertical: 10
    },
    categoryHeaderText: {
        fontSize: 20,
        color: "#404040",
        marginLeft: 5
    },
    addCategoryInputContainer: {
        flexDirection: "row"
    },
    categoryTextInput: {
        marginVertical: 10,
        height: 50,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: "#e6e6e6",
        borderRightColor: "green",
        borderWidth: 2,
        borderRightWidth: 0.5,
        width: "75%",
        paddingHorizontal: 20,
        fontSize: 18
    },
    addCategoryButton: {
        justifyContent: "center",
        alignItems: "center",
        borderColor: "green",
        borderWidth: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderLeftWidth: 0.5,
        marginVertical: 10,
        width: "25%"
    },
    addCategoryButtonText: {
        fontSize: 16,
        color: "green",
        fontWeight: "bold"
    },
    categoryTagsContainer: {
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    categoryTag: {
        borderColor: "green",
        borderWidth: 1.5,
        borderRadius: 30,
        padding: 10,
        margin: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    selectedCategoryTag: {
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 1.5,
        borderRadius: 30,
        padding: 10,
        margin: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    categoryTagText: {
        color: "green",
        fontSize: 16,
        fontWeight: "bold"
    },
    selectedCategoryTagText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
    button: {
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 5,
        backgroundColor: "white",
        width: "100%",
        paddingVertical: 10
    },
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        width: "100%"
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default AddProduct;