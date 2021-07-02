import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';
import baseURL from "../../assets/common/baseUrl";

import RateOrderStars from "./RateOrderStars";

const { width, height } = Dimensions.get('window')

const RateOrder = props => {

    const { order } = props.route.params;
    const orderId = order._id;
    const id = order.business.id;
    const businessRatings = order.business.ratings;
    const reviewCount = order.business.reviewCount;

    const [noStarPressed, setNoStarPressed] = useState(true);
    const [oneStarPressed, setOneStarPressed] = useState(false);
    const [twoStarPressed, setTwoStarPressed] = useState(false);
    const [threeStarPressed, setThreeStarPressed] = useState(false);
    const [fourStarPressed, setFourStarPressed] = useState(false);
    const [fiveStarPressed, setFiveStarPressed] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const handleOneStar = () => {
        setOneStarPressed(true);
        setNoStarPressed(false);
        setTwoStarPressed(false);
        setThreeStarPressed(false);
        setFourStarPressed(false);
        setFiveStarPressed(false);
        setUserRating(1);
    }

    const handleTwoStar = () => {
        setOneStarPressed(false);
        setNoStarPressed(false);
        setTwoStarPressed(true);
        setThreeStarPressed(false);
        setFourStarPressed(false);
        setFiveStarPressed(false);
        setUserRating(2);
    }

    const handleThreeStar = () => {
        setOneStarPressed(false);
        setNoStarPressed(false);
        setTwoStarPressed(false);
        setThreeStarPressed(true);
        setFourStarPressed(false);
        setFiveStarPressed(false);
        setUserRating(3);
    }

    const handleFourStar = () => {
        setOneStarPressed(false);
        setNoStarPressed(false);
        setTwoStarPressed(false);
        setThreeStarPressed(false);
        setFourStarPressed(true);
        setFiveStarPressed(false);
        setUserRating(4);
    }

    const handleFiveStar = () => {
        setOneStarPressed(false);
        setNoStarPressed(false);
        setTwoStarPressed(false);
        setThreeStarPressed(false);
        setFourStarPressed(false);
        setFiveStarPressed(true);
        setUserRating(5);

    }

    const handleSubmit = () => {
        axios.put(`${baseURL}businesses/rating/${id}`, { userRating, businessRatings, reviewCount })
        .then((res) => {
            axios.put(`${baseURL}orders/rated/${orderId}`)
            .then((res) => {
                console.log('rating submitted');
                props.navigation.navigate('Receipt');
            })
            .catch((error) => {
                console.log("Api call error - couldn't submit rating")
            })
        })
        .catch((error) => {
            console.log("Api call error - couldn't submit rating")
        })
    }

    return (
        <View>
            <View style={{backgroundColor: "white", flexDirection: "row", paddingTop: 25, paddingBottom: 15}}>
                <TouchableOpacity style={{marginTop: 30, marginLeft: 30}} onPress={() => props.navigation.navigate('Orders Home')}>
                    <Icon name="arrow-left" type="font-awesome-5" color="black" size={25} />
                </TouchableOpacity>
                <Text style={{fontSize: 22, fontWeight: "bold", marginTop: 30, marginLeft: 78}}>Rate Your Order</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.headerText}>How was your experience at {order.business.name}?</Text>
                    <RateOrderStars
                        noStarPressed={noStarPressed}
                        oneStarPressed={oneStarPressed}
                        handleOneStar={handleOneStar}
                        twoStarPressed={twoStarPressed}
                        handleTwoStar={handleTwoStar}
                        threeStarPressed={threeStarPressed}
                        handleThreeStar={handleThreeStar}
                        fourStarPressed={fourStarPressed}
                        handleFourStar={handleFourStar}
                        fiveStarPressed={fiveStarPressed}
                        handleFiveStar={handleFiveStar}
                     />
                    <View style={styles.buttonContainer}>
                        { noStarPressed === true ?
                            <View style={styles.buttonUnpressed} onPress={handleSubmit}>
                                <Text style={styles.buttonTextUnpressed}>Submit</Text> 
                            </View>
                            :
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Submit</Text> 
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        backgroundColor: "white",
        paddingVertical: 200,
    },
    headerText: {
        flexWrap: "wrap",
        marginLeft: 30,
        marginTop: 15,
        fontSize: 22,
        fontWeight: "bold"
    },
    buttonContainer: {
        paddingBottom: 55
    },
    button: {
        backgroundColor: "green",
        borderRadius: 5,
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: "90%",
        marginTop: 50,
        marginLeft: 20
    },
    buttonUnpressed: {
        backgroundColor: "white",
        borderRadius: 5,
        borderColor: "green",
        borderWidth: 2,
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: "90%",
        marginTop: 50,
        marginLeft: 20
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    buttonTextUnpressed: {
        color: "green",
        fontWeight: "bold",
        fontSize: 20,
    }
})

export default RateOrder;