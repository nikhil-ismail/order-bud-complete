import React from "react";
import { View } from "react-native";

import LoginPrompt from './LoginPrompt';
import Orders from './Orders';

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../Redux/userSlice";

const OrderHome = (props) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <View style={{flex: 1}}>
            {
                isLoggedIn
                ?
                <Orders navigation={props.navigation} />
                :
                <LoginPrompt />
            }
        </View>
    )
}

export default OrderHome;