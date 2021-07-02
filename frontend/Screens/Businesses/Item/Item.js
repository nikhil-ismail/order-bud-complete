import React from 'react'
import { View, StyleSheet, Modal, Dimensions } from 'react-native';

import ItemBottomSheet from '../Item/ItemBottomSheet';

var { height, width } = Dimensions.get("window");

const Item = (props) => {

    return (
            <Modal
                visible={props.showItemModal}
                animationType='none'
                transparent={true}
            >
                <View style={styles.modalBackground} />
                <ItemBottomSheet
                    product={props.product}
                    quantity={null}
                    handleRemoveItemModal={props.handleRemoveItemModal}
                    cartType="Add"
                    navigation={props.navigation}
                />
            </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.66)',
        height: height,
        width: width
    }
})

export default Item;