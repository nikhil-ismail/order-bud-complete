import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";

const Register = (props) => {
    const [emailFocus, setEmailFocus] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        props.handleRegister(email, name, phone, password, confirmPassword);
        setEmailFocus(false);
        setNameFocus(false);
        setPhoneFocus(false);
        setPasswordFocus(false);
        setConfirmPasswordFocus(false);
    }

    return (
        <View style={styles.bodyContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.textInput, nameFocus && styles.focusInputStyle]}
                    name="name"
                    value={name}
                    onChangeText={text => setName(text)}
                    placeholder="Name"
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                    blurOnSubmit={false}
                    autoCapitalize='none'
                />
                <TextInput
                    style={[styles.textInput, emailFocus && styles.focusInputStyle]}
                    name="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Email"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    blurOnSubmit={false}
                    autoCapitalize='none'
                />
                <TextInput
                    style={[styles.textInput, phoneFocus && styles.focusInputStyle]}
                    name="phone"
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    placeholder="Phone Number"
                    onFocus={() => setPhoneFocus(true)}
                    onBlur={() => setPhoneFocus(false)}
                    blurOnSubmit={false}
                    keyboardType="numeric"
                />
                <TextInput
                    style={[styles.textInput, passwordFocus && styles.focusInputStyle]}
                    name="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Password"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    blurOnSubmit={false}
                    autoCapitalize='none'
                    secureTextEntry={true}
                />
                <TextInput
                    style={[styles.textInput, confirmPasswordFocus && styles.focusInputStyle]}
                    name="confirm password"
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    placeholder="Confirm Password"
                    onFocus={() => setConfirmPasswordFocus(true)}
                    onBlur={() => setConfirmPasswordFocus(false)}
                    blurOnSubmit={false}
                    autoCapitalize='none'
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bodyContainer: {
        width: "100%",
    },
    inputContainer: {
        width: "100%",
        marginVertical: 30,
        alignItems: "center",
    },
    textInput: {
        marginVertical: 10,
        height: 50,
        borderRadius: 5,
        borderColor: "#e6e6e6",
        borderWidth: 2,
        width: "100%",
        paddingHorizontal: 20,
        fontSize: 18
    },
    focusInputStyle: {
        borderColor: "green",
        borderWidth: 2
    },
    buttonContainer: {
        backgroundColor: "green",
        padding: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default Register;