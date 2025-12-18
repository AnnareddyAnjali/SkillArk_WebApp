import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const AcademicScreen = ({ navigation }) => {
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [description, setDescription] = useState('');

  const handleSave = () => {
    const academicData = {
      school,
      degree,
      major,
      startDate,
      endDate,
      description,
    };
    console.log('Academic Data:', academicData);
    navigation.navigate('ExperienceScreen');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate('UserSelection')}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Add Academics</Text>
        <Text style={styles.subText}>
          Add your academic details to connect with mates, you can edit anytime.
        </Text>

        {/* School/College */}
        <Text style={styles.label}>School / College *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={school}
          onChangeText={setSchool}
        />

        {/* Degree */}
        <Text style={styles.label}>Degree</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. B.E, MBA"
          value={degree}
          onChangeText={setDegree}
        />

        {/* Major */}
        <Text style={styles.label}>Major</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. CSE, Marketing"
          value={major}
          onChangeText={setMajor}
        />

        {/* Start Date */}
        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity onPress={() => setShowStartPicker(true)}>
          <View style={styles.inputWithIcon}>
            <Text>{startDate.toDateString()}</Text>
            <Ionicons name="calendar-outline" size={20} color="#666" />
          </View>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="spinner"
            onChange={(e, selectedDate) => {
              setShowStartPicker(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )}

        {/* End Date */}
        <Text style={styles.label}>End Date</Text>
        <TouchableOpacity onPress={() => setShowEndPicker(true)}>
          <View style={styles.inputWithIcon}>
            <Text>{endDate.toDateString()}</Text>
            <Ionicons name="calendar-outline" size={20} color="#666" />
          </View>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="spinner"
            onChange={(e, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate) setEndDate(selectedDate);
            }}
          />
        )}

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Write about your experience, activities, etc."
          value={description}
          multiline
          onChangeText={setDescription}
          maxLength={500}
        />
        <Text style={styles.charCount}>{description.length}/500</Text>

        {/* Add Skills */}
        <Text style={styles.label}>Add Skills (Max 5)</Text>
        <TouchableOpacity
          style={styles.skillButton}
          onPress={() => navigation.navigate('Addskills')}
        >
          <Text style={styles.skillButtonText}>Go to Add Skills +</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <LinearGradient
          colors={['#0077B6', '#512DB8']}
          style={styles.saveButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <TouchableOpacity onPress={handleSave} style={styles.buttonTouchable}>
            <Text style={styles.saveButtonText}>Save & Continue</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backIcon: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  skipButton: { position: 'absolute', top: 55, right: 20, zIndex: 10 },
  skipText: { color: '#0077B6', fontWeight: '600', fontSize: 16 },
  scrollContent: { paddingTop: 80, paddingHorizontal: 20, paddingBottom: 40 },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 4, color: '#000' },
  subText: { fontSize: 14, color: '#444', marginBottom: 20 },
  label: { fontWeight: '600', marginBottom: 6, fontSize: 16, color: '#000' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 16,
    color: '#000',
  },
  inputWithIcon: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
  },
  skillButton: {
    borderWidth: 1,
    borderColor: '#512DB8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  skillButtonText: {
    color: '#512DB8',
    fontWeight: '600',
    fontSize: 14,
  },
  saveButton: {
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 40,
    alignSelf: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AcademicScreen;
