import React, { useState, useCallback } from "react";
import { Text, View, TouchableOpacity, Animated, FlatList, StyleSheet, Dimensions } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';


const SearchFilter = props => {

    const [deliveryToggle, setDeliveryToggle] = useState(true);

    const handleDeliveryToggle = () => {
        setDeliveryToggle(!deliveryToggle);
    }

    return (
        <BottomSheet
            isVisible={props.showFilter}
            containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0)' }}
        >
            <View style={styles.bottomSheet}>
                <View style={styles.filterHeaderContainer}>
                    <TouchableOpacity style={styles.filterBackBtn} onPress={props.handleFilter}>
                        <Icon name="arrow-left" type="font-awesome-5" color="black" size={17.5} />
                    </TouchableOpacity>
                    <Text style={styles.filterHeader}>Sort and Filter</Text>
                </View>
                <View style={styles.separator} />
                <View>
                    <Text style={styles.sortByTitle}>Available For</Text>
                    { deliveryToggle ?
                    <View style={styles.deliveryToggleContainer}>
                        <View style={styles.deliveryToggle}>
                            <TouchableOpacity onPress={handleDeliveryToggle} style={styles.deliverySelected}>
                                <Text style={styles.selectedText}>Delivery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDeliveryToggle} style={styles.pickupUnselected}>
                                <Text style={styles.unselectedText}>Pickup</Text>
                            </TouchableOpacity>
                        </View>
                    </View> :
                    <View style={styles.deliveryToggleContainer}>
                        <View style={styles.deliveryToggle}>
                            <TouchableOpacity onPress={handleDeliveryToggle} style={styles.deliveryUnselected}>
                                <Text style={styles.unselectedText}>Delivery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDeliveryToggle} style={styles.pickupSelected}>
                                <Text style={styles.selectedText}>Pickup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                </View>
                <View>
                    <Text style={styles.sortByTitle}>Sort By</Text>
                    <View style={styles.filterCategoryContainer}>
                        <TouchableOpacity style={[{marginLeft: -3}, styles.filterCategory]}>
                            <Icon name="users" type="font-awesome-5" color="black" size={25} />
                            <Text style={{fontSize: 17, marginLeft: 10, marginTop: 3}}>My friends shop at</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{marginLeft: 2}, styles.filterCategory]}>
                            <Icon name="fire" type="font-awesome-5" color="black" size={27} />
                            <Text style={[{marginLeft: 16}, styles.filterText]}>Trending</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{marginLeft: -2}, styles.filterCategory]}>
                            <Icon name="star" type="font-awesome-5" color="black" size={26} />
                            <Text style={[{marginLeft: 12}, styles.filterText]}>Rating</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{marginLeft: 3}, styles.filterCategory]}>
                            <Icon name="dollar-sign" type="font-awesome-5" color="black" size={29} />
                            <Text style={[{marginLeft: 20}, styles.filterText]}>Price - High to Low</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{marginLeft: 3}, styles.filterCategory]}>
                            <Icon name="dollar-sign" type="font-awesome-5" color="black" size={29} />
                            <Text style={[{marginLeft: 20}, styles.filterText]}>Price - Low to High</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft: 1, flexDirection: "row", marginBottom: 15}}>
                            <Icon name="sort-alpha-down" type="font-awesome-5" color="black" size={27} />
                            <Text style={[{marginLeft: 17}, styles.filterText]}>Name A-Z</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity style={styles.applyBtn}>
                            <Text style={styles.applyText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    bottomSheet: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    filterHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    filterHeader: {
        fontSize: 28,
        fontWeight: "bold"
    },
    filterBackBtn: {
        backgroundColor: "white",
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        marginBottom: 15
    },
    separator: {
        backgroundColor: "grey",
        height: 1,
        marginVertical: 15
    },
    sortByTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 20,
    },
    filterCategoryContainer: {
        marginTop: 5,
        marginLeft: 3,
        flexDirection: "column"
    },
    filterCategory: {
        marginBottom: 35,
        flexDirection: "row",
    },
    filterText: {
        fontSize: 17,
        marginTop: 3
    },
    applyBtn: {
        backgroundColor: "green",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: "100%",
        marginTop: 20
    },
    applyText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
    deliveryToggleContainer: {
        justifyContent: "flex-start",
        width: "44.4%",
        backgroundColor: "white",
        marginBottom: 15
    },
    deliveryToggle: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "green",
        borderRadius: 10
    },
    selectedText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
        marginHorizontal: 10,
        marginVertical: 10
    },
    unselectedText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "black",
        marginHorizontal: 10,
        marginVertical: 10
    },
    deliverySelected: {
        backgroundColor: "rgba(0, 128, 0, 0.75)",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderRightWidth: 1,
        borderRightColor: "grey"
    },
    deliveryUnselected: {
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderRightWidth: 1,
        borderRightColor: "grey"
    },
    pickupSelected: {
        backgroundColor: "rgba(0, 128, 0, 0.75)",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    pickupUnselected: {
        backgroundColor: "white",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    }
});

export default SearchFilter;