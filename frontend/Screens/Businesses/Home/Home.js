import React, { useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Text, Dimensions } from "react-native";
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';
import { selectIsDelivery } from '../../../Redux/orderDetailsSlice';
import { selectAddress } from '../../../Redux/orderDetailsSlice';
import { selectIsLoggedIn } from '../../../Redux/userSlice';

import Header from "./Header";
import Banner from "./Banner";

import CategoryFilter from "./CategoryFilter";
import BusinessCard from "./BusinessCard";
import ViewCartButton from "../Cart/ViewCartButton";
import SearchBar from "../Search/SearchBar";

import baseURL from "../../../assets/common/baseUrl";
import { googleDistanceMatrixApiKey } from "../../../assets/common/api_key";

const { width } = Dimensions.get("window")

const ProductContainer = (props) => {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const cart = useSelector(selectCartItems);
  const address = useSelector(selectAddress);
  const isDelivery = useSelector(selectIsDelivery);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useFocusEffect(
    useCallback(() => {

      // Businesses
      axios.get(`${baseURL}businesses`)
        .then(async (res) => {
          if (address !== undefined) {
            const origin = 'origins=place_id:' + address.placeId;

            let destinations = 'destinations=';
            for (let i = 0; i < res.data.length; i++) {
              destinations += i === res.data.length - 1 ? 'place_id:' + res.data[i].addressPlaceId : 'place_id:' + res.data[i].addressPlaceId + '|';
            }

            const key = 'key=' + googleDistanceMatrixApiKey;

            const apiResponse = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?${origin}&${destinations}&${key}`)
            const travelTimesDistances = apiResponse.data.rows[0].elements.map(destination => {
              return {
                distance: destination.distance.text,
                duration: destination.duration.text
              }
            });

            let nearbyBusinesses = [];
            for (let i = 0; i < travelTimesDistances.length; i++) {
              if (parseFloat(travelTimesDistances[i].distance.split(" ")[0]) < 30) {
                nearbyBusinesses.push({
                  businessDetails: res.data[i],
                  travelDetails: travelTimesDistances[i]
                })
              }
            }
            setBusinesses(nearbyBusinesses);
            setLoading(false);
          } else {
            const featuredBusinesses = res.data.map(business => {
              return {
                businessDetails: business,
                travelDetails: {
                  distance: '',
                  duration: ''
                }
              }
            })
            setBusinesses(featuredBusinesses);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error)
        })

      // Categories
      axios.get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data)
        })
        .catch((error) => {
          console.log('Api call error - categories')
        })

      return () => {
        setBusinesses([]);
        setCategories([]);
      };
    }, [address])
  )

  return (
    <>
      {loading === false ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <Header
            navigation={props.navigation}
          />
          <ScrollView>
            <Banner />
            <CategoryFilter
              navigation={props.navigation}
              businesses={businesses}
              categories={categories}
            />
            <SearchBar
              placeholder="Search..."
              navigation={props.navigation}
              parent="home"
            />
            <View style={styles.separator} />
            {
              isLoggedIn ?
                <Text style={styles.header}>Your Local Businesses</Text> :
                <View>
                  <Text style={styles.header}>Popular on OrderBud</Text>
                  <Text style={styles.subHeader}>Enter Your Address For Businesses Near You</Text>
                </View>
            }
            <View style={styles.listContainer}>
              {businesses.map(business => {
                if (isDelivery && business.businessDetails.delivery || !isDelivery && business.businessDetails.pickup) {
                  return (
                    <BusinessCard
                      key={business.businessDetails.name}
                      businessDetails={business.businessDetails}
                      travelDetails={business.travelDetails}
                      navigation={props.navigation}
                    />
                  )
                }
              })}
            </View>
          </ScrollView>
          {
            cart.length > 0 &&
            <ViewCartButton navigation={props.navigation} />
          }
        </SafeAreaView>
      ) : (
          <View style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
            <ActivityIndicator size="large" color="green" />
          </View>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: "center",
    elevation: 8,
    paddingVertical: 15,
    paddingHorizontal: 5
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    backgroundColor: "#ededed",
    height: 15
  },
  header: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 20,
    marginLeft: (width - 0.925 * width) / 2
  },
  subHeader: {
    fontWeight: "bold",
    fontSize: 18,
    color: "grey",
    marginTop: 5,
    marginLeft: (width - 0.925 * width) / 2
  }
});

export default ProductContainer;