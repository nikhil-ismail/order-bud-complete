import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";

import { useSelector } from 'react-redux';
import { selectUserId, selectIsLoggedIn } from '../../Redux/userSlice';

import OrderCard from './OrderCard';

import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';

import baseURL from "../../assets/common/baseUrl";

var { height } = Dimensions.get("window");

const Orders = (props) => {
  const [loading, setLoading] = useState(true);
  const [myOrdersToggle, setMyOrdersToggle] = useState(true);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = isLoggedIn && useSelector(selectUserId);

  const handleMyOrdersToggle = () => {
    setMyOrdersToggle(!myOrdersToggle);
  }

  useFocusEffect(
    useCallback(() => {

      // Orders
      axios.get(`${baseURL}orders/${userId}`)
        .then((res) => {
          setPendingOrders(res.data.filter(order => order.status === "Pending"));
          setCompletedOrders(res.data.filter(order => order.status === "Completed"));
          setOrdersCount(pendingOrders.length + completedOrders.length);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Api call error - getting orders')
        })

      axios.get(`${baseURL}businesses`)
        .then((res) => {
          setBusinesses(res.data);
          console.log(businesses);
          setLoading(false)
        })
        .catch((error) => {
          console.log('Api call error - businesses')
        })

      return () => {
        setPendingOrders([]);
        setCompletedOrders([]);
        setBusinesses([]);
      };

    }, [])
  )

  return (
    <>
      {
        loading === false ?
          <View style={{ backgroundColor: "white", height: height, flex: 1 }}>
            <SafeAreaView>
              <ScrollView>
                <View style={styles.headerContainer}>
                  <Text style={styles.header}>My Orders</Text>
                </View>
                {
                  pendingOrders.length === 0 && completedOrders.length === 0 &&
                  <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
                    <Text style={{color: "grey", fontSize: 20}}>You have not placed any orders yet.</Text>
                  </View>
                }
                {
                  pendingOrders.length > 0 &&
                  <View style={{ backgroundColor: "white", marginTop: 10 }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 17, marginBottom: 10 }}>Current</Text>
                    {pendingOrders.map(order => {
                      return <OrderCard
                        navigation={props.navigation}
                        businesses={businesses}
                        order={order}
                        ordersCount={ordersCount}
                      />
                    })
                    }
                  </View>
                }
                {
                  completedOrders.length > 0 &&
                  <View style={{ backgroundColor: "white", marginTop: 10 }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 17, marginVertical: 10 }}>Completed</Text>
                    {completedOrders.map(order => {
                      return <OrderCard
                        navigation={props.navigation}
                        businesses={businesses}
                        order={order}
                        ordersCount={ordersCount}
                      />
                    })
                    }
                  </View>
                }
              </ScrollView>
            </SafeAreaView>
          </View> :
          <View style={{ backgroundColor: "#f2f2f2", justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="green" />
          </View>
      }
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: height,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    paddingVertical: 10,
    marginTop: 15
  },
  header: {
    fontWeight: "bold",
    fontSize: 32
  }
});

export default Orders;