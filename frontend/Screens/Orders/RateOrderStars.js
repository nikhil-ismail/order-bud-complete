import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window')

const RateOrderStars = props => {

    const {noStarPressed, oneStarPressed, twoStarPressed, threeStarPressed, fourStarPressed, fiveStarPressed, handleOneStar, handleTwoStar, handleThreeStar, handleFourStar, handleFiveStar} = props;

    return (
        <View style={{marginLeft: 75, marginTop: 50}}>
            {
                noStarPressed &&
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleOneStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleTwoStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleThreeStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleFourStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleFiveStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                </View>
            }
            {
                oneStarPressed &&
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleOneStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleTwoStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleThreeStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleFourStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleFiveStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                </View>
            }
            {
                twoStarPressed &&
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleOneStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleTwoStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleThreeStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleFourStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleFiveStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                </View>
            }
            {
                threeStarPressed &&
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleOneStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleTwoStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleThreeStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleFourStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleFiveStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                </View>
            }
            {
                fourStarPressed &&
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleOneStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleTwoStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleThreeStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleFourStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleFiveStar}>
                        <Icon name="star" type="font-awesome-5" color="black" size={35} />
                    </TouchableOpacity>
                </View>
            }
            {
                fiveStarPressed &&
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleOneStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleTwoStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleThreeStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleFourStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 7}} onPress={handleFiveStar}>
                        <Icon name="star" type="font-awesome-5" color="green" size={35} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default RateOrderStars;