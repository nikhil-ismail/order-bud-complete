import React from "react";
import { View } from "react-native";

import LoginRegister from './Account/LoginRegister';
import Profile from './Profile';

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../Redux/userSlice";

const User = (props) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const params = { goToBusinessPage: true }

    return (
        <View>
            {
                isLoggedIn
                ?
                <Profile navigation={props.navigation} />
                :
                <LoginRegister route={params} navigation={props.navigation} />
            }
        </View>
    )
}

export default User;