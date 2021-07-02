import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

const SearchBar = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.searchContainer}>
              <TextInput style={styles.searchBar} placeholder={props.placeholder} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: -5,
    backgroundColor: "white",
    alignItems: "center"
  },
  searchContainer: {
    marginVertical: 15,
    height: 50,
    flexDirection: "row",
    backgroundColor: "#ededed",
    borderRadius: 15,
    width: "95%"
  },
  searchBarFilterIcon: {
    width: '85%',
    height: 50,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRightWidth: 1,
    borderRightColor: "#ededed"
  },
  searchBar: {
    width: '100%',
    height: 50,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  filterBtn: {
    width: '15%',
    height: 50,
    backgroundColor: "white",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    backgroundColor: "#ededed"
  }
})

export default SearchBar;