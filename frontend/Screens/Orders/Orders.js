import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";

import { useSelector } from 'react-redux';
import { selectUserId, selectIsLoggedIn } from '../../Redux/userSlice';

import OrderCard from './OrderCard';

import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';

import baseURL from "../../assets/common/baseUrl";
import FriendOrderCard from "./FriendOrderCard";

var { height } = Dimensions.get("window");

const Orders = (props) => {
  const [loading, setLoading] = useState(true);
  const [friendOrders, setFriendOrders] = useState([]);
  const [myOrders, setMyOrders] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = isLoggedIn && useSelector(selectUserId);

  const handleMyOrdersToggle = () => {
    setMyOrders(!myOrders);
  }

  useFocusEffect(
    useCallback(() => {

      //User Orders
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

      //Friend Orders
      /*axios.get(`${baseURL}orders/friendOrders`)
      .then((res) => {
        console.log(res.data);
        setFriendOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Api call error - getting friend orders')
      })*/

      //Businesses
      axios.get(`${baseURL}businesses`)
        .then((res) => {
          setBusinesses(res.data);
          console.log(businesses);
          setLoading(false)
        })
        .catch((error) => {
          console.log('Api call error - getting businesses')
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
      <View style={{ backgroundColor: "white", height: height, flex: 1 }}>
        <SafeAreaView>
          <ScrollView>
            { myOrders ?
              <View>
                <View style={styles.ordersToggle}>
                  <TouchableOpacity onPress={handleMyOrdersToggle} style={styles.friendsOrderUnSelected}>
                      <Text style={styles.ordersToggleUnSelected}>Friend Orders</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.myOrdersSelected}>
                      <Text style={styles.ordersToggleSelected}>My Orders</Text>
                  </TouchableOpacity>
                </View>
                {
                  pendingOrders.length === 0 && completedOrders.length === 0 &&
                  <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
                    <Text style={{color: "grey", fontSize: 20}}>You have not placed any orders yet.</Text>
                  </View>
                }
                {
                  pendingOrders.length > 0 &&
                  <View style={{ backgroundColor: "white", marginTop: 5}}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 17, marginBottom: 10 }}>Current</Text>
                    {pendingOrders.map(order => {
                      return <OrderCard
                        navigation={props.navigation}
                        businesses={businesses}
                        order={order}
                        ordersCount={ordersCount}
                      />
                    })}
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
                    })}
                  </View>
                }
              </View>
              :
              <View>
                <View style={styles.ordersToggle}>
                  <TouchableOpacity style={styles.friendsOrderSelected}>
                      <Text style={styles.ordersToggleSelected}>Friend Orders</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleMyOrdersToggle} style={styles.myOrdersUnSelected}>
                      <Text style={styles.ordersToggleUnSelected}>My Orders</Text>
                  </TouchableOpacity>
                </View>
                <FriendOrderCard />
              </View>
            }
          </ScrollView>
        </SafeAreaView>
      </View>
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
  },
  ordersToggle: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 25,
    justifyContent: "center"
  },
  myOrdersSelected: {
    backgroundColor: "rgba(0, 128, 0, 0.75)",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "green"
  },
  myOrdersUnSelected: {
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "green"
  },
  friendsOrderSelected: {
    backgroundColor: "rgba(0, 128, 0, 0.75)",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: "green"
  },
  friendsOrderUnSelected: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: "green"
  },
  ordersToggleSelected: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 15,
    marginVertical: 25
  },
  ordersToggleUnSelected: {
    fontSize: 17,
    fontWeight: "bold",
    color: "green",
    marginHorizontal: 15,
    marginVertical: 25
  }
});

export default Orders;