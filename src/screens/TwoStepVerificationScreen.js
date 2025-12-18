import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function TwoStepVerificationScreen({ route, navigation }) {
  const { identifier } = route.params; // email or phone
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const [timer, setTimer] = useState(45);
  const [resendEnabled, setResendEnabled] = useState(false);

  // Timer countdown logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else {
      setResendEnabled(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Input handler
  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 3) {
        inputs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  // OTP verification
  const handleVerify = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length === 4) {
      // Here you'd normally validate the OTP with the server
      navigation.navigate('UserSelection', { identifier });
    } else {
      Alert.alert('Invalid OTP', 'Please enter all 4 digits.');
    }
  };

  // Resend OTP
  const handleResend = () => {
    if (resendEnabled) {
      setTimer(45);
      setResendEnabled(false);
      Alert.alert('OTP Sent', `A new OTP has been sent to ${identifier}`);
    }
  };

  // Masking logic
  const maskIdentifier = () => {
    if (identifier.includes('@')) {
      const [user, domain] = identifier.split('@');
      return `${user[0]}****@${domain}`;
    } else {
      return `${identifier.slice(0, 3)}******${identifier.slice(-3)}`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Two Step Verification</Text>
      <Text style={styles.subtitle}>Enter the code to continue</Text>
      <Text style={styles.maskedText}>We sent a code to {maskIdentifier()}.</Text>

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
        <TouchableOpacity onPress={handleVerify} style={styles.buttonInner}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.greyText}>
          Resend in 00:{timer < 10 ? `0${timer}` : timer}
        </Text>
        <TouchableOpacity onPress={handleResend} disabled={!resendEnabled}>
          <Text style={[styles.resendText, resendEnabled && styles.resendActive]}>
            Resend
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
  },
  maskedText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 25,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
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
  button: {
    width: width - 40,
    height: 46,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonInner: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  greyText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  resendText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#aaa',
  },
  resendActive: {
    color: '#0077B6',
    textDecorationLine: 'underline',
  },
});
