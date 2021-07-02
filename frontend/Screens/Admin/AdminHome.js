import React, { useState, useCallback } from "react"
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import axios from "axios";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setBusinessAddress } from '../../Redux/businessSlice';
import { selectUserId, selectIsLoggedIn } from '../../Redux/userSlice';

import Orders from './Orders';
import Actions from './Actions';
import Metrics from './Metrics';

import baseURL from "../../assets/common/baseUrl";

const { width, height } = Dimensions.get("window")

const AdminHome = (props) => {
    const [business, setBusiness] = useState();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [salesVolume, setSalesVolume] = useState();
    const [orderVolume, setOrderVolume] = useState();
    const [reloadNums, setReloadNums] = useState(0);

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    const userId = isLoggedIn && useSelector(selectUserId);

    const handleSetReloadNums = () => {
        setReloadNums(reloadNums + 1);
    }

    useFocusEffect(
        useCallback(() => {
            // Get business details
            axios.get(`${baseURL}businesses/${userId}`)
                .then(res => {
                    setBusiness(res.data);
                    dispatch(setBusinessAddress({
                        fullAddress: res.data.fullAddress,
                        mainText: res.data.addressPrimaryText,
                        secondaryText: res.data.addressSecondaryText,
                        placeId: res.data.addressPlaceId
                    }))
                    return res.data.id;
                })
                .then(businessId => {
                    axios.get(`${baseURL}orders/business/${businessId}`)
                        .then(res => {
                            setOrders(res.data.orders);
                            setSalesVolume(res.data.salesVolume);
                            setOrderVolume(res.data.orderVolume);
                            setLoading(false);
                        })
                        .catch(err => {
                            console.log(err);
                            console.log('error occurred retrieving orders for your business')
                        })
                })
                .catch(err => {
                    console.log(err);
                    console.log('error occurred retrieving business details')
                })
        }, [reloadNums])
    )

    return (
        <>
            {
                loading === false ?
                    <View style={styles.container}>
                        <ScrollView>
                            <View>
                                <Image
                                    style={business.coverImage ? styles.businessCoverPhoto : styles.businessCoverPhotoPlaceholder}
                                    source={{ uri: business.coverImage }}
                                />
                                <View style={styles.businessName}>
                                    <Text style={styles.businessNameText}>{business.name}</Text>
                                </View>
                            </View>
                            <View style={{ padding: 10 }}>
                                <Metrics salesVolume={salesVolume} orderVolume={orderVolume} />
                                <Actions navigation={props.navigation} business={business} />
                                <Orders orders={orders} handleSetReloadNums={handleSetReloadNums} />
                            </View>
                        </ScrollView>
                    </View>
                    :
                    <View style={{ backgroundColor: "#f2f2f2", justifyContent: "center", alignItems: "center", height: height }}>
                        <ActivityIndicator size="large" color="green" />
                    </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: height,
        flex: 1
    },
    createAccountButton: {
        backgroundColor: "green",
        width: 150,
        height: 40
    },
    createAccountButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    businessCoverPhoto: {
        backgroundColor: "grey",
        width: width,
        height: height * 0.225,
    },
    businessCoverPhotoPlaceholder: {
        backgroundColor: "grey",
        width: width,
        height: height * 0.225,
    },
    businessName: {
        position: "absolute",
        top: height * 0.225 - 40,
        left: (width - 0.8 * width) / 2,
        borderRadius: 5,
        borderColor: "green",
        borderWidth: 4,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        flexDirection: "row",
        width: "80%",
        paddingVertical: 7.5
    },
    businessNameText: {
        fontSize: 30,
        fontWeight: "bold"
    }
})

export default AdminHome;