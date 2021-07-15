import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

var { width } = Dimensions.get("window");

const FriendOrderCard = (props) => {
  const { businesses, order, ordersCount } = props;
  const [showItems, setShowItems] = useState(false);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const date = order.dateOrdered.toString().substring(0, order.dateOrdered.toString().indexOf("T"));
  let dateParts = date.split("-");
  dateParts = dateParts.map((datePart) => {
      return parseInt(datePart - 1);
  });
  const formattedDate = `${monthNames[dateParts[1]]} ${dateParts[2]}, ${dateParts[0]}`;

  const menu = businesses.filter(
      (dispense) => dispense.name === order.business.name
  );

  const handleShowItems = () => {
    setShowItems(!showItems);
  };

  return (
    <View style={styles.productContainer}>
        <View style={styles.innerContainer}>
            <View style={{flexDirection: "row"}}>
                <Image
                    style={styles.coverImage}
                    source={{ uri: order.business.coverImage }}
                />
                <View style={styles.contentContainer}>
                    <Text style={styles.header}>{order.business.name.length < 25 ? order.business.name : order.business.name.substring(0, 25) + '...'}</Text>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.subText}>{formattedDate} • {order.totalQuantity} {order.totalQuantity === 1 ? 'Item' : 'Items'}</Text>
                    </View>
                    <TouchableOpacity style={styles.viewMenuContainer} onPress={() => props.navigation.navigate("Business Page", menu[0])}>
                        <Text style={{ color: "green", fontWeight: "bold" }}>View Menu</Text>
                    </TouchableOpacity>
                    <View style={styles.showItemToggleContainer}>
                        <TouchableOpacity style={styles.showItems} onPress={handleShowItems}>
                            <Text style={{ fontSize: 16 }}>{showItems ? "Hide Items" : "Show Items"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {showItems &&
                order.orderItems.map((item) => {
                    return (
                    <View style={styles.itemContainer}>
                        <View style={styles.quantityContainer}>
                            <View style={styles.quantity}>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                            </View>
                        </View>
                        <View style={styles.itemNameContainer}>
                            <Text style={styles.cartItemText}>{item.product.name.length <  43 ? item.product.name : item.product.name.substring(0, 43) + '...'}</Text>
                        </View>
                    </View>
                    );
                })
            }
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    width: "100%",
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  innerContainer: {
    paddingVertical: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: "grey",
    flexDirection: "column",
  },
  coverImage: {
    height: width * 0.3,
    width: "30%",
    marginBottom: 15,
  },
  contentContainer: {
    height: "100%",
    paddingLeft: 15,
    flexDirection: "column"
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subText: {
    marginRight: 10,
    marginVertical: 2.5,
    color: "grey",
    fontSize: 16,
  },
  viewMenuContainer: {
    marginVertical: 5,
  },
  showItems: {
    backgroundColor: "#E8E8E8",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  showItemToggleContainer: {
    marginVertical: 5,
    width: 135
  },
  itemContainer: {
    flexDirection: "row",
  },
  quantityContainer: {
    paddingVertical: 10,
  },
  quantity: {
    backgroundColor: "black",
    height: 28,
    width: 28,
    borderRadius: 2.5,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  quantityText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  itemNameContainer: {
    justifyContent: "center",
    paddingVertical: 10,
  },
  cartItemText: {
    fontSize: 16,
    marginLeft: 12.5,
  }
});

export default FriendOrderCard;
