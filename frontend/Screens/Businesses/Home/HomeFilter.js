import React from "react";
import { Text, View, TouchableOpacity, Animated, FlatList, StyleSheet, Dimensions } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';


const HomeFilter = props => {

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
                <Text style={styles.sortByTitle}>Sort By</Text>
                <View style={styles.filterCategoryContainer}>
                    <TouchableOpacity style={[{marginLeft: 5}, styles.filterCategory]}>
                        <Icon name="map-pin" type="font-awesome-5" color="black" size={27} />
                        <Text style={[{marginLeft: 17.5}, styles.filterText]}>Distance (default)</Text>
                    </TouchableOpacity>
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
                    <TouchableOpacity style={[{marginLeft: -1}, styles.filterCategory]}>
                        <Icon name="clock" type="font-awesome-5" color="black" size={27} />
                        <Text style={[{marginLeft: 13}, styles.filterText]}>Delivery time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{marginLeft: 3}, styles.filterCategory]}>
                        <Icon name="dollar-sign" type="font-awesome-5" color="black" size={29} />
                        <Text style={[{marginLeft: 20}, styles.filterText]}>Delivery fee</Text>
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
});

export default HomeFilter;