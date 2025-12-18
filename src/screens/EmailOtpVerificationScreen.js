import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function EmailOtpVerificationScreen({ route, navigation }) {
  const { email } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const [timer, setTimer] = useState(45);
  const [resendEnabled, setResendEnabled] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else {
      setResendEnabled(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 3) inputs.current[index + 1].focus();
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length === 4) {
      navigation.navigate('ResetPassword');
    } else {
      Alert.alert('Invalid OTP', 'Please enter all 4 digits.');
    }
  };

  const handleResend = () => {
    if (resendEnabled) {
      setTimer(45);
      setResendEnabled(false);
      Alert.alert('OTP Sent', `A new OTP has been sent to ${email}`);
      // TODO: add your resend logic here (API call)
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the OTP sent to: {email}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.otpBox}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <LinearGradient colors={['#0077B6', '#512DB8']} style={styles.button}>
        <TouchableOpacity onPress={handleVerify} style={{ width: '100%', alignItems: 'center' }}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </LinearGradient>

      <Text style={{ color: '#555', textAlign: 'center', marginBottom: 5 }}>
        Didn't receive the OTP?
      </Text>
      <TouchableOpacity onPress={handleResend} disabled={!resendEnabled}>
        <Text style={[styles.resendText, { color: resendEnabled ? '#0077B6' : '#aaa' }]}>
          {resendEnabled ? 'Resend OTP' : `Resend in 00:${timer < 10 ? '0' + timer : timer}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  otpBox: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  resendText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
  },
  button: {
    width: width - 40,
    height: 46,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
