import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SetNewPasswordScreen from './SetNewPasswordScreen';

const { width } = Dimensions.get('window');

export default function ResetPasswordScreen({ navigation }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = () => {
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Proceed with actual password reset logic here...
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Set New Password</Text>
      <Text style={styles.subtitle}>Creat an Unique Password</Text>
        

      <Text style={styles.label}>New Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={22}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={22}
            color="#666"
          />
        </TouchableOpacity>
      </View>

 <LinearGradient
  colors={['#0077B6', '#512DB8']}
  style={styles.button}
>
            <TouchableOpacity onPress={() => navigation.navigate('TwoStep')}>
    <Text style={styles.buttonText}>Reset Password</Text>
  </TouchableOpacity>
</LinearGradient>
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
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    width: width - 40,
    height: 46,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
