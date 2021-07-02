import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import axios from 'axios';

import Header from './Header';
import ButtonGroup from './ButtonGroup';
import Login from './Login';
import Register from './Register';
import AddAddress from './AddAddress';
import AddressHeader from './AddressHeader';
import ErrorMessage from './ErrorMessage';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../Redux/userSlice';
import { setAddress, selectAddress } from '../../../Redux/orderDetailsSlice';

import baseURL from "../../../assets/common/baseUrl";

const { height } = Dimensions.get("window");

const LoginRegister = (props) => {
    const [page, setPage] = useState('Login');
    const [error, setError] = useState('');
    const [registerStep, setRegisterStep] = useState(1);
    const [userInfo, setUserInfo] = useState();

    const dispatch = useDispatch();
    const address = useSelector(selectAddress);

    const handleTabSwitch = () => {
        if (page === 'Register') {
            setPage('Login');
        } else {
            setPage('Register');
        }
        setError('');
    }

    const goBack = () => {
        setRegisterStep(1);
    }

    const handleLogin = (email, password) => {
        axios.post(`${baseURL}users/login`, { email, password })
            .then(response => {
                if (response.data.auth) {
                    dispatch(setUser(response.data));
                    dispatch(setAddress(response.data.user.address[response.data.user.address.length - 1]));
                    if (props.route.params !== undefined) {
                        props.navigation.goBack();
                    }
                } else {
                    setError('Unable to log in. Please try again.');
                }
            })
            .catch(() => {
                setError('An error occurred while logging in. Please try again.')
            });
    }

    const handleRegister = (email, name, phone, password, confirmPassword) => {
        if (password === confirmPassword) {
            setRegisterStep(2);
            setUserInfo({ email, name, phone, password })
        } else {
            setError('Your passwords did not match. Please try again.')
        }
    }

    const handleAddAddress = () => {
        axios.post(`${baseURL}users/register`, {
            email: userInfo.email,
            name: userInfo.name,
            phone: userInfo.phone,
            password: userInfo.password,
            fullAddress: address.fullAddress,
            addressPrimaryText: address.mainText,
            addressSecondaryText: address.secondaryText,
            addressPlaceId: address.placeId,
        })
        .then(response => {
            if (response.data.auth && props.route.params !== undefined) {
                dispatch(setUser(response.data));
                console.log('----USER RESPONSE DATA-----',response.data.user);
                //dispatch(setAddress(response.data.user.address[0]));
                props.navigation.goBack();
            } else if (response.data.auth) {
                console.log('----USER RESPONSE DATA-----', response.data.user);
                dispatch(setUser(response.data));
                //dispatch(setAddress(response.data.user.address[0]));
            } else {
                setError('An error occurred adding this address. Please try again.')
            }
        })
        .catch(() => {
            setError('An error occurred while registering. Please try again.')
        });
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeContainer}>
                {
                    registerStep === 1
                        ? <Header />
                        : <AddressHeader />
                }
                <View style={styles.bodyContainer}>
                    {
                        registerStep === 1 && <ButtonGroup handleTabSwitch={handleTabSwitch} page={page} />
                    }
                    {
                        page === "Login"
                            ?
                            <Login handleLogin={handleLogin} />
                            :
                            (
                                registerStep === 1
                                    ?
                                    <Register handleRegister={handleRegister} registerStep={registerStep} />
                                    :
                                    <AddAddress handleAddAddress={handleAddAddress} navigation={props.navigation} goBack={goBack} />
                            )
                    }
                    {error.length > 0 && <ErrorMessage error={error} />}
                </View>
            </SafeAreaView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: "white",
    },
    safeContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    bodyContainer: {
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
    }
})

export default LoginRegister;