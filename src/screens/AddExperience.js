import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const workTypeOptions = ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Freelance'];

export default function AddExperience({ navigation }) {
  // Experience entries array
  const [experiences, setExperiences] = useState([
    {
      jobTitle: '',
      companyName: '',
      location: '',
      startDate: new Date(),
      showStartPicker: false,
      currentlyWorking: false,
      endDate: new Date(),
      showEndPicker: false,
      workType: '',
      description: '',
      projects: '',
      skills: [],
    },
  ]);

  // Helper to update fields in an experience by index
  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  // Add new blank experience form
  const addExperienceForm = () => {
    setExperiences([
      ...experiences,
      {
        jobTitle: '',
        companyName: '',
        location: '',
        startDate: new Date(),
        showStartPicker: false,
        currentlyWorking: false,
        endDate: new Date(),
        showEndPicker: false,
        workType: '',
        description: '',
        projects: '',
        skills: [],
      },
    ]);
  };

  // Toggle work type dropdown (simple picker example, you can replace with a picker)
  const selectWorkType = (index, type) => {
    handleChange(index, 'workType', type);
  };

  // Render a simple dropdown for work type
  const WorkTypeDropdown = ({ index, selectedType }) => {
    const [open, setOpen] = useState(false);
    return (
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setOpen(!open)}
        >
          <Text style={{ color: selectedType ? '#000' : '#999' }}>
            {selectedType || 'Select an Option'}
          </Text>
          <Ionicons
            name={open ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#666"
          />
        </TouchableOpacity>
        {open &&
          workTypeOptions.map((type) => (
            <TouchableOpacity
              key={type}
              style={styles.dropdownOption}
              onPress={() => {
                selectWorkType(index, type);
                setOpen(false);
              }}
            >
              <Text>{type}</Text>
            </TouchableOpacity>
          ))}
      </View>
    );
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

      <ScrollView contentContainerStyle={{ paddingTop: 80, paddingHorizontal: 20, paddingBottom: 40 }}>
        {experiences.map((exp, index) => (
          <View key={index} style={styles.experienceForm}>
            <Text style={styles.header}>Add Experience</Text>
            <Text style={styles.subHeader}>Tell us about your work experience, Edit or remove anytime</Text>

            {/* Job Title */}
            <Text style={styles.label}>Job Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Job Title"
              value={exp.jobTitle}
              onChangeText={(text) => handleChange(index, 'jobTitle', text)}
              maxLength={32}
            />

            {/* Company Name */}
            <Text style={styles.label}>Company Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Company Name"
              value={exp.companyName}
              onChangeText={(text) => handleChange(index, 'companyName', text)}
              maxLength={32}
            />

            {/* Location */}
            <Text style={styles.label}>Location *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Location"
              value={exp.location}
              onChangeText={(text) => handleChange(index, 'location', text)}
              maxLength={32}
            />

            {/* Start Date */}
            <TouchableOpacity
              onPress={() => handleChange(index, 'showStartPicker', true)}
              style={styles.labeledInput}
            >
              <Text style={styles.label}>Start Date</Text>
              <View style={styles.inputWithIcon}>
                <Text style={{ color: '#000' }}>{exp.startDate.toLocaleDateString()}</Text>
                <Ionicons name="calendar-outline" size={20} color="#666" />
              </View>
            </TouchableOpacity>
            {exp.showStartPicker && (
              <DateTimePicker
                value={exp.startDate}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => {
                  handleChange(index, 'showStartPicker', false);
                  if (selectedDate) handleChange(index, 'startDate', selectedDate);
                }}
              />
            )}

            {/* Currently Working Switch */}
            <View style={styles.switchRow}>
              <Text style={[styles.label, { marginBottom: 0 }]}>Currently Working</Text>
              <Switch
                value={exp.currentlyWorking}
                onValueChange={(val) => handleChange(index, 'currentlyWorking', val)}
              />
            </View>

            {/* End Date */}
            {!exp.currentlyWorking && (
              <>
                <TouchableOpacity
                  onPress={() => handleChange(index, 'showEndPicker', true)}
                  style={styles.labeledInput}
                >
                  <Text style={styles.label}>End Date / Expected</Text>
                  <View style={styles.inputWithIcon}>
                    <Text style={{ color: '#000' }}>{exp.endDate.toLocaleDateString()}</Text>
                    <Ionicons name="calendar-outline" size={20} color="#666" />
                  </View>
                </TouchableOpacity>
                {exp.showEndPicker && (
                  <DateTimePicker
                    value={exp.endDate}
                    mode="date"
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      handleChange(index, 'showEndPicker', false);
                      if (selectedDate) handleChange(index, 'endDate', selectedDate);
                    }}
                  />
                )}
              </>
            )}

            {/* Work Type */}
            <Text style={styles.label}>Work Type</Text>
            <WorkTypeDropdown index={index} selectedType={exp.workType} />

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              multiline
              placeholder="Add Description..."
              value={exp.description}
              onChangeText={(text) => handleChange(index, 'description', text)}
              maxLength={500}
            />
            <Text style={styles.charCount}>{exp.description.length}/500</Text>

            {/* Projects */}
            <Text style={styles.label}>Projects</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              multiline
              placeholder="Add Project details..."
              value={exp.projects}
              onChangeText={(text) => handleChange(index, 'projects', text)}
              maxLength={750}
            />
            <Text style={styles.charCount}>{exp.projects.length}/750</Text>

            {/* Skills */}
            <Text style={styles.label}>Add Skills [Select up to 5 skills]</Text>
            <TouchableOpacity
              style={styles.skillsButton}
              onPress={() => navigation.navigate('AddSkills')}
            >
              <Text style={styles.skillsButtonText}>Skills +</Text>
            </TouchableOpacity>

            {/* Save Button */}
            <LinearGradient
              colors={['#0077B6', '#512DB8']}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <TouchableOpacity
                style={styles.buttonTouchable}
                onPress={() => alert('Save experience logic here')}
              >
                <Text style={styles.buttonText}>Save & Continue</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ))}

        {/* Add another experience */}
        <TouchableOpacity
          style={styles.addAnother}
          onPress={addExperienceForm}
        >
          <Text style={styles.addAnotherText}>Add another Experience Details {'>'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backIcon: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  skipButton: { position: 'absolute', top: 55, right: 20, zIndex: 10 },
  skipText: { color: '#0077B6', fontWeight: '600', fontSize: 16 },
  experienceForm: { marginBottom: 40 },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 4, color: '#000' },
  subHeader: { fontSize: 14, color: '#444', marginBottom: 20 },
  label: { fontWeight: '600', marginBottom: 6, fontSize: 16, color: '#000' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 4,
    color: '#000',
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#999',
    marginBottom: 20,
  },
  labeledInput: {
    marginBottom: 20,
  },
  inputWithIcon: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  skillsButton: {
    borderWidth: 1,
    borderColor: '#512DB8',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  skillsButtonText: {
    color: '#512DB8',
    fontWeight: '600',
  },
  button: {
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 40,
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  addAnother: {
    marginTop: 10,
    alignItems: 'center',
  },
  addAnotherText: {
    fontWeight: '600',
    color: '#0077B6',
    fontSize: 16,
  },
});
