import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AddSkills({ navigation }) {
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(['UI/UX', 'Java', 'Python', 'Marketing']);

  const addSkill = () => {
    if (skillInput.trim() !== '' && !skills.includes(skillInput.trim()) && skills.length < 8) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color="#000" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Add Skills</Text>
        <Text style={styles.subHeader}>
          Show what you're best at, Help connection understand your strengths.
        </Text>
        <Text style={styles.subHeaderSmall}>[Add Up to 8 Skills]</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add Skills..."
            style={styles.input}
            value={skillInput}
            onChangeText={setSkillInput}
            onSubmitEditing={addSkill}
            returnKeyType="done"
          />
          <TouchableOpacity onPress={addSkill} style={styles.addBtn}>
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.skillsContainer}>
          {skills.map((skill) => (
            <View key={skill} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
              <TouchableOpacity onPress={() => removeSkill(skill)}>
                <Ionicons name="close-circle" size={18} color="#666" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <LinearGradient
          colors={['#0077B6', '#512DB8']}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => navigation.navigate('UsersHomeScreen')}
          >
            <Text style={styles.buttonText}>Save & Continue</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backIcon: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  scroll: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  subHeader: { fontSize: 14, color: '#333', marginBottom: 3 },
  subHeaderSmall: { fontSize: 12, color: '#555', marginBottom: 15 },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    color: '#000',
  },
  addBtn: {
    backgroundColor: '#512DB8',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 18,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    flexDirection: 'row',
    backgroundColor: '#E0E0FF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  skillText: {
    marginRight: 6,
    color: '#512DB8',
    fontWeight: '600',
  },
  button: {
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonTouchable: { justifyContent: 'center', alignItems: 'center', height: '100%' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
