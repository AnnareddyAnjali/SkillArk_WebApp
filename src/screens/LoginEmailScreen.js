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

const { width } = Dimensions.get('window');

export default function LoginEmailScreen({ navigation }) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [error, setError] = useState('');

  const validateEmailOrPhone = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,15}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleSendResetLink = () => {
    if (validateEmailOrPhone(emailOrPhone.trim())) {
      setError('');
      navigation.navigate('EmailOtpVerification', { email: emailOrPhone.trim() });
    } else {
      setError('Invalid Email / Phone number, Please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>No worries, We got you.</Text>

      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Enter Email Address / Phone Number"
        value={emailOrPhone}
        onChangeText={(text) => {
          setEmailOrPhone(text);
          if (error) setError('');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <LinearGradient colors={['#0077B6', '#512DB8']} style={styles.button}>
        <TouchableOpacity onPress={handleSendResetLink} style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </LinearGradient>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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
  },
});
