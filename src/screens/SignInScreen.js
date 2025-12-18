import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SignInScreen({ navigation }) {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');

    const validateEmailOrPhone = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,15}$/;
        return emailRegex.test(input) || phoneRegex.test(input);
    };

    const handleSignIn = () => {
        if (!validateEmailOrPhone(emailOrPhone.trim())) {
            setError('Invalid Email / Phone number');
            return;
        }
        if (password.trim().length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setError('');
        navigation.navigate('TwoStepVerification', { identifier: emailOrPhone.trim() });
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>

            {/* Email / Phone Input */}
            <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
                <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email Address / Phone Number"
                    value={emailOrPhone}
                    onChangeText={(text) => {
                        setEmailOrPhone(text);
                        if (error) setError('');
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                />
            </View>

            {/* Password Input */}
            <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        if (error) setError('');
                    }}
                    secureTextEntry={!passwordVisible}
                    placeholderTextColor="#888"
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Ionicons
                        name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#666"
                        style={styles.inputIconRight}
                    />
                </TouchableOpacity>
            </View>

            {/* Error Message */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Forgot Password */}
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <LinearGradient colors={['#0077B6', '#512DB8']} style={styles.button}>
                <TouchableOpacity onPress={handleSignIn} style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </LinearGradient>

            {/* Sign Up Option */}
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signupLink}> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 120,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    backIcon: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0077B6',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 30,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 50,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    inputIcon: {
        marginRight: 8,
    },
    inputIconRight: {
        marginLeft: 8,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    forgotPassword: {
        color: '#0077B6',
        textAlign: 'right',
        marginBottom: 20,
    },
    button: {
        borderRadius: 8,
        width: width - 40,
        height: 50,
        justifyContent: 'center',
    },
    buttonTouchable: {
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    signupText: {
        fontSize: 16,
        color: '#333',
    },
    signupLink: {
        fontSize: 16,
        color: '#0077B6',
        fontWeight: '500',
    },
});
