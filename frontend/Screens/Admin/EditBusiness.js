import React, { useEffect, useState } from "react"
import { View, StyleSheet, Dimensions, Text, Switch, TouchableOpacity, TextInput, Platform, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import mime from 'mime';

import baseURL from "../../assets/common/baseUrl";

import { useSelector } from 'react-redux';
import { selectBusinessAddress } from '../../Redux/businessSlice';

const { width, height } = Dimensions.get("window")

const EditBusiness = (props) => {
    const { business } = props.route.params;

    const businessAddress = useSelector(selectBusinessAddress);

    const [image, setImage] = useState(business && business.coverImage);
    const [businessName, setBusinessName] = useState(business && business.name);
    const [offerDelivery, setOfferDelivery] = useState(business ? business.delivery : false);
    const [offerPickup, setOfferPickup] = useState(business ? business.pickup : false);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState(business ? business.categories.map(category => category.name) : []);

    const [imageUploaded, setImageUploaded] = useState(false);

    const [businessNameFocus, setBusinessNameFocus] = useState(false);
    const [categoryFocus, setCategoryFocus] = useState(false);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
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

        if (!result.cancelled) {
            setImage(result.uri);
            setImageUploaded(true);
        }
    };

    const addCategory = () => {
        setCategories([...categories, category]);
        setCategory('');
    }

    const removeCategory = (categoryToRemove) => {
        setCategories(categories.filter(category => category !== categoryToRemove));
    }

    const handleUpdateBusiness = () => {
        let formData = new FormData();

        const newImageUri = "file:///" + image.split("file:/").join("");

        if (imageUploaded) {
            formData.append('image', {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split('/').pop()
            });
        }
        formData.append('name', businessName);
        formData.append('fullAddress', businessAddress.fullAddress);
        formData.append('addressPrimaryText', businessAddress.mainText);
        formData.append('addressSecondaryText', businessAddress.secondaryText);
        formData.append('addressPlaceId', businessAddress.placeId);
        formData.append('delivery', offerDelivery);
        formData.append('pickup', offerPickup);
        formData.append('categories', JSON.stringify(categories));

        console.log(formData);

        axios.put(`${baseURL}businesses/${business.id}`, formData)
            .then(() => {
                props.navigation.goBack();
            })
            .catch(() => {
                console.log('error updating the business')
            })
    }

    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={image ? styles.businessCoverPhoto : styles.businessCoverPhotoPlaceholder}
                    source={{ uri: image }}
                />
                <TouchableOpacity style={styles.cameraIconContainer} onPress={pickImage}>
                    <Icon name="camera" type="font-awesome-5" color="green" size={22} />
                    <Text style={styles.uploadCoverPhotoText}>Upload A Cover Photo</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.businessDetails}>
                <TextInput
                    placeholder="Business Name"
                    style={[styles.textInput, businessNameFocus && styles.focusInputStyle]}
                    value={businessName}
                    onChangeText={text => setBusinessName(text)}
                    onFocus={() => setBusinessNameFocus(true)}
                    onBlur={() => setBusinessNameFocus(false)}
                />
                <TextInput
                    style={styles.textInput}
                    onFocus={() => props.navigation.navigate('Enter Address')}
                    placeholder="Address"
                    value={businessAddress.fullAddress}
                />
                <View style={styles.separator} />
                <View style={styles.switchContainer}>
                    <Text style={styles.offerDeliveryPickupText}>Offer delivery?</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "green" }}
                        thumbColor={offerDelivery ? "white" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setOfferDelivery(!offerDelivery)}
                        value={offerDelivery}
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.offerDeliveryPickupText}>Offer pickup?</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "green" }}
                        thumbColor={offerDelivery ? "white" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setOfferPickup(!offerPickup)}
                        value={offerPickup}
                    />
                </View>
                <View style={styles.separator} />
                <View style={styles.categoriesContainer}>
                    <Text style={styles.categoryHeaderText}>What categories will your products fall under?</Text>
                    <View style={styles.addCategoryInputContainer}>
                        <TextInput
                            placeholder="Add Category"
                            style={[styles.categoryTextInput, categoryFocus && styles.focusInputStyle]}
                            value={category}
                            onChangeText={text => setCategory(text)}
                            onFocus={() => setCategoryFocus(true)}
                            onBlur={() => setCategoryFocus(false)}
                        />
                        <TouchableOpacity style={styles.addCategoryButton} onPress={addCategory}>
                            <Text style={styles.addCategoryButtonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categoryTagsContainer}>
                        {
                            categories.map(category => {
                                return (
                                    <View style={styles.categoryTag}>
                                        <Text style={styles.categoryTagText}>{category}</Text>
                                        <TouchableOpacity style={{ marginLeft: 7.5 }} onPress={() => removeCategory(category)}>
                                            <Icon name="times" type="font-awesome-5" color="green" size={16} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
            <View style={styles.button}>
                <TouchableOpacity style={styles.buttonContainer} onPress={handleUpdateBusiness}>
                    <Text style={styles.buttonText}>Update</Text>
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
    businessCoverPhoto: {
        width: width,
        height: height * 0.225,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    businessCoverPhotoPlaceholder: {
        backgroundColor: "grey",
        width: width,
        height: height * 0.225,
    },
    cameraIconContainer: {
        position: "absolute",
        top: height * 0.225 - 55,
        left: (width - 0.6 * width) / 2,
        borderRadius: 20,
        borderColor: "white",
        borderWidth: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        flexDirection: "row",
        width: "60%",
        paddingVertical: 7.5
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
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8
    },
    offerDeliveryPickupText: {
        fontSize: 20,
        color: "#404040",
        marginLeft: 5
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
        flexDirection: "row",
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

export default EditBusiness;