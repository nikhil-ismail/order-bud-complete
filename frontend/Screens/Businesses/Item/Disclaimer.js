import React from 'react'
import { View, Modal, Dimensions, StyleSheet } from 'react-native';

import DisclaimerContent from './DisclaimerContent';

const { height, width } = Dimensions.get("window");

const Disclaimer = (props) => {

    return (
        <Modal
            visible={props.showDisclaimer}
            animationType='none'
            transparent={true}
        >
            <View style={styles.modalBackground} />
            <DisclaimerContent
                business={props.business}
                handleCloseDisclaimer={props.handleCloseDisclaimer}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.66)',
        height: height,
        width: width,
        justifyContent: "center",
        alignContent: "center"
    }
});

export default Disclaimer;