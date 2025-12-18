import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import UserSelectionScreen from './UserSelectionScreen';

const { width } = Dimensions.get('window');

export default function OtpVerificationScreen({ route, navigation }) {
  const { mobile, email } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [error, setError] = useState('');

  const inputRefs = useRef([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === '1234') {
      setError('');
      navigation.navigate('UserSelectionScreen');
    } else {
      setError('Invalid Code! Please try again');
    }
  };

  const handleResend = () => {
    setTimer(45);
    setOtp(['', '', '', '']);
    setError('');
    inputRefs.current[0].focus();
    alert(`OTP sent again to ${mobile}`);
  };

  const handleChange = (value, index) => {
    if (!/^\d$/.test(value) && value !== '') return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    if (index === 3) {
      Keyboard.dismiss();
    }
  };

  const handleBackspace = (index) => {
    if (otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Verify Your Number</Text>

      <Text style={styles.subtitle}>
        {email && <Text>Email: {email}{'\n'}</Text>}
        {mobile && <Text>Phone: {mobile}</Text>}
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={[styles.otpInput, error ? styles.otpInputError : null]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            ref={(ref) => (inputRefs.current[index] = ref)}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={({ nativeEvent }) =>
              nativeEvent.key === 'Backspace' ? handleBackspace(index) : null
            }
          />
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

     <LinearGradient
  colors={['#0077B6', '#512DB8']}
  style={styles.button}
>
  <TouchableOpacity onPress={() => navigation.navigate('UserSelectionScreen')} style={styles.buttonTouchable}>
    <Text style={styles.buttonText}>Verify</Text>
  </TouchableOpacity>
</LinearGradient>

      <Text style={styles.timerText}>Resend in 00:{timer < 10 ? `0${timer}` : timer}</Text>

      <TouchableOpacity onPress={handleResend} disabled={timer !== 0}>
        <Text style={[styles.resendText, timer !== 0 && { opacity: 0.5 }]}>
          Didn’t receive the OTP? <Text style={{ fontWeight: 'bold' }}>Resend</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 24,
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
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    width: 60,
    height: 60,
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
  },
  otpInputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    borderRadius: 8,
    width: width - 48,
    height: 50,
    justifyContent: 'center',
    marginTop: 10,
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
  timerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
  resendText: {
    textAlign: 'center',
    marginTop: 4,
    color: '#0077B6',
  },
});
