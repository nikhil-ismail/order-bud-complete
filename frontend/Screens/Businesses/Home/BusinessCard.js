import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const BusinessCard = (props) => {
    const { coverImage, name, rating, fullAddress } = props.businessDetails;
    const { distance, duration } = props.travelDetails;

    return (
        <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('Business Page', props.businessDetails)}>
            <Image
                style={styles.image}
                source={{ uri: coverImage !== '' ? coverImage :"https://www.cnu.org/sites/default/files/storefront-proportions.jpg"}}
            />
            <View style={styles.businessDetails}>
                <View style={styles.businessDetailsHeaderRow}>
                    <Text style={styles.title}>{name}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                </View>
                {
                    distance !== '' && duration !== '' ?
                    <View style={styles.businessDetailsSubRow}>
                        <View style={styles.travelDetailContainer}>
                            <Icon name="route" type="font-awesome-5" color="grey" size={15} />
                            <Text style={[styles.businessDetailsSubRowText, {marginLeft: 5}]}>{distance}</Text>
                        </View>
                        <View style={styles.travelDetailContainer}>
                            <Icon name="car" type="font-awesome-5" color="grey" size={16} />
                            <Text style={[styles.businessDetailsSubRowText, {marginLeft: 5}]}>{duration}</Text>
                        </View>
                    </View>
                    :
                    <View style={styles.businessDetailsSubRow}>
                        <Text style={styles.businessDetailsSubRowText}>{fullAddress}</Text>
                    </View>
                }
                
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
        borderRadius: 5,
        elevation: 8,
        backgroundColor: 'white',
        marginVertical: 7.5,
        shadowColor: '#a6a6a6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5
    },
    image: {
        width: "100%",
        height: 160
    },
    businessDetails: {
        paddingHorizontal: 15,
        marginVertical: 10
    },
    businessDetailsHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 2.5
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
    },
    ratingContainer: {
        backgroundColor: '#e3e3e3',
        height: 32,
        width: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        padding: 5
    },
    ratingText: {
        fontWeight: "bold"
    },
    businessDetailsSubRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2.5
    },
    travelDetailContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20
    },
    businessDetailsSubRowText: {
        fontSize: 16,
        color: "grey",
        fontWeight: "bold"
    }
})

export default BusinessCard;