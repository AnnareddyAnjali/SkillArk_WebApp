import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Select a method to reset your password
      </Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('LoginEmail')}
      >
        <Text style={styles.optionText}>Reset via Email</Text>
        <Ionicons name="mail-outline" size={22} color="#0077B6" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('LoginMobile')}
      >
        <Text style={styles.optionText}>Reset via Mobile</Text>
        <Ionicons name="call-outline" size={22} color="#0077B6" />
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  optionText: {
    fontSize: 16,
    color: '#0077B6',
  },
});