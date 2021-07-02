import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, TextInput, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setBusinessAddress } from '../../Redux/businessSlice';

import { googlePlacesApiKey } from "../../assets/common/api_key";

const EnterAddress = (props) => {
    const [dest, setDest] = useState('');
    const [predictions, setPredictions] = useState([]);

    const dispatch = useDispatch();

    const handleAddAddress = (prediction) => {
        dispatch(setBusinessAddress({
            fullAddress: prediction.description,
            mainText: prediction.structured_formatting.main_text,
            secondaryText: prediction.structured_formatting.secondary_text,
            placeId: prediction.place_id
        }));
        props.navigation.goBack();
    }

    const onChangeAddress = async (destination) => {
        setDest(destination);
        try {
            const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googlePlacesApiKey}&input=${destination}`;
            const result = await axios.get(apiUrl);
            setPredictions(result.data.predictions);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={{ flex: 1, height: "100%", backgroundColor: "white" }}>
            <SafeAreaView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-left" type="font-awesome-5" color="black" size={26} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Enter An Address</Text>
                </View>
                <TextInput
                    placeholder="Enter Address"
                    value={dest}
                    style={styles.enterAddressField}
                    onChangeText={destination => onChangeAddress(destination)}
                />
                <View>
                    {
                        predictions.map(prediction => {
                            return (
                                <TouchableOpacity
                                    key={prediction.id}
                                    style={styles.predictionContainer}
                                    onPress={() => handleAddAddress(prediction)}
                                >
                                    <Icon name="map-marker-alt" type="font-awesome-5" color="black" size={26} />
                                    <View style={styles.destinationDetails}>
                                        <Text style={styles.addressMain}>{prediction.structured_formatting.main_text}</Text>
                                        <Text style={styles.addressSecondary}>{prediction.structured_formatting.secondary_text}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        borderBottomWidth: 0.25
    },
    iconContainer: {
        position: "absolute",
        left: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    enterAddressField: {
        backgroundColor: "white",
        padding: 15,
        marginHorizontal: 25,
        fontSize: 16,
        shadowColor: '#a6a6a6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        fontSize: 20,
        marginVertical: 15
    },
    predictionContainer: {
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 0.25,
        borderBottomColor: "grey",
        flexDirection: "row",
        alignItems: "center"
    },
    destinationDetails: {
        marginLeft: 30
    },
    addressMain: {
        fontSize: 20,
        fontWeight: "bold"
    },
    addressSecondary: {
        color: "grey",
        fontSize: 16,
        marginTop: 7.5
    }
})

export default EnterAddress;