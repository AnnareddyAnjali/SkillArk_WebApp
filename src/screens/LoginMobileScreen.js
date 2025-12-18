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

export default function LoginMobileScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const validatePhone = (input) => /^\d{10,15}$/.test(input);

  const handleSend = () => {
    if (validatePhone(phone.trim())) {
      setError('');
      navigation.navigate('MobileOtpVerification', { phone: phone.trim() });
    } else {
      setError('Invalid phone number, Please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>No worries, We got you.</Text>

      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Enter Mobile Number"
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          if (error) setError('');
        }}
        keyboardType="phone-pad"
        maxLength={15}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <LinearGradient colors={['#0077B6', '#512DB8']} style={styles.button}>
        <TouchableOpacity onPress={handleSend} style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>Send OTP</Text>
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
