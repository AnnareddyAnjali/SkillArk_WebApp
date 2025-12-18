import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function SetNewPasswordScreen({ navigation }) {
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const reset = () => {
    if (pass.length < 6) {
      Alert.alert('Weak', 'Password must be 6+ chars');
      return;
    }
    if (pass !== confirm) {
      Alert.alert('Mismatch', 'Passwords do not match');
      return;
    }
    Alert.alert('Success', 'Password updated!');
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set New Password</Text>
      <Text style={styles.subtitle}>Create a unique password</Text>

      <TextInput
        style={styles.input}
        placeholder="Create New Password"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity style={styles.btn} onPress={reset}>
        <Text style={styles.btnText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { color: '#555', marginBottom: 24 },
  input: {
    borderColor: '#ccc', borderWidth: 1, borderRadius: 8,
    padding: 14, marginBottom: 20,
  },
  btn: { backgroundColor: '#3366ff', padding: 14, borderRadius: 8 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
