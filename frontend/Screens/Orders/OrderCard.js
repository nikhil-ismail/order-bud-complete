import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';

var { width } = Dimensions.get("window");

const OrderCard = (props) => {
    const { businesses, order, ordersCount } = props;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = order.dateOrdered.toString().substring(0, order.dateOrdered.toString().indexOf('T'));
    let dateParts = date.split('-');
    dateParts = dateParts.map(datePart => {
        return parseInt(datePart - 1);
    })
    const formattedDate = `${monthNames[dateParts[1]]} ${dateParts[2]}, ${dateParts[0]}`;

    const menu = businesses.filter(dispense => dispense.name === order.business.name);

    return (
        <TouchableOpacity style={styles.productContainer} onPress={() => props.navigation.navigate('Receipt', { order: order, ordersCount: ordersCount })}>
            <View style={styles.innerContainer}>
                <Image
                    style={styles.coverImage}
                    source={{ uri: order.business.coverImage }}
                />
                <View style={{ width: "70%", flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.header}>{order.business.name.length < 15 ? order.business.name : order.business.name.substring(0, 14) + '...'}</Text>
                        <View style={{ flexDirection: "row", width: "70%" }}>
                            <Text style={styles.subText}>${order.totalPrice}</Text>
                            <Text style={styles.subText}>{order.totalQuantity} {order.totalQuantity === 1 ? 'Item' : 'Items'}</Text>
                        </View>
                        <Text style={styles.subText}>{formattedDate}</Text>
                    </View>
                    <View style={styles.viewMenuContainer}>
                        <TouchableOpacity style={styles.viewMenu} onPress={() => props.navigation.navigate('Business Page', menu[0])}>
                            <Text style={{ fontSize: 16 }}>Menu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        width: '100%',
        paddingHorizontal: 15,
        backgroundColor: 'white'
    },
    innerContainer: {
        paddingVertical: 10,
        borderBottomWidth: 0.4,
        borderBottomColor: "grey",
        flexDirection: "row",
        alignItems: 'center',
    },
    coverImage: {
        height: width * 0.25,
        width: "30%"
    },
    contentContainer: {
        height: "100%",
        paddingLeft: 15,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5
    },
    subText: {
        marginRight: 10,
        color: "grey",
        fontSize: 16
    },
    viewMenuContainer: {
        justifyContent: "center"
    },
    viewMenu: {
        backgroundColor: "#E8E8E8",
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default OrderCard;