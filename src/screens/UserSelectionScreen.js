

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'; // ⬅️ Add this import

const { width } = Dimensions.get('window');

export default function UserSelectionScreen({ navigation, route }) {
  const { identifier } = route.params;
  const [selectedRole, setSelectedRole] = useState('');

  const handleContinue = () => {
    if (!selectedRole) return;

    if (selectedRole === 'Experienced') {
      navigation.navigate('AddExperience', { identifier });
    } else {
      navigation.navigate('Student', { identifier });
    }
  };

  return (
    <View style={styles.container}>
      {/* 👇 Go Back Icon */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Icon name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.greeting}>Hi {identifier}!</Text>
      <Text style={styles.subtext}>
        This helps recommend the right connections.
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>I'm a</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedRole}
            onValueChange={(itemValue) => setSelectedRole(itemValue)}
            style={styles.picker}
            dropdownIconColor="#000"
          >
            <Picker.Item label="Pick an option" value="" />
            <Picker.Item label="Student" value="Student" />
            <Picker.Item label="Graduate / Fresher" value="Graduate" />
            <Picker.Item label="Experienced" value="Experienced" />
            <Picker.Item label="Job Seeker" value="JobSeeker" />
          </Picker>
        </View>
      </View>

      <LinearGradient colors={['#0077B6', '#512DB8']} style={styles.button}>
        <TouchableOpacity onPress={handleContinue} style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>Continue</Text>
          
        </TouchableOpacity>
      </LinearGradient>
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
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginRight: 10,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    borderRadius: 8,
    width: width - 40,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
