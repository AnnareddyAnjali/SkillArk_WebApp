import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ResetCodeScreen({ route, navigation }) {
  const { email } = route.params;
  const [digits, setDigits] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (v, idx) => {
    const copy = [...digits];
    copy[idx] = v;
    setDigits(copy);
    if (v && idx < 3) inputs.current[idx + 1].focus();
  };

  const verify = () => {
    if (digits.join('').length !== 4) {
      Alert.alert('Invalid Code', 'Try again');
      return;
    }
    navigation.navigate('SetNewPassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification Code</Text>
      <Text style={styles.subtitle}>We sent a code to {email}</Text>

      <View style={styles.codeRow}>
        {digits.map((d, i) => (
          <TextInput
            key={i}
            ref={r => (inputs.current[i] = r)}
            style={styles.codeInput}
            maxLength={1}
            keyboardType="number-pad"
            value={d}
            onChangeText={v => handleChange(v, i)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.btn} onPress={verify}>
        <Text style={styles.btnText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#555', marginBottom: 24, textAlign: 'center' },
  codeRow: { flexDirection: 'row', width: '80%', justifyContent: 'space-between', marginBottom: 24 },
  codeInput: {
    width: 55, height: 55, borderRadius: 8, borderWidth: 1, borderColor: '#ccc',
    textAlign: 'center', fontSize: 22,
  },
  btn: { backgroundColor: '#3366ff', padding: 14, borderRadius: 8, width: '80%' },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
