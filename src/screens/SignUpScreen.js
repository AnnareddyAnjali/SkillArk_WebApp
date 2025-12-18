// This code sets up a comprehensive signup and OTP verification flow
// including reset password, gender selection, and inline error handling.

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

// 🔐 Firebase + Google
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../config/firebase'; // <-- change path if needed
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen({ navigation }) {
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    dob: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  // ---- GOOGLE AUTH ----
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '456765084496-p0fm45i8l4pslfcr247l8lu0i8i6511f.apps.googleusercontent.com',
    webClientId:
      '456765084496-fth237bt3jmkc4ci99udl0sol9f517g0.apps.googleusercontent.com',
    expoClientId:
      '456765084496-fth237bt3jmkc4ci99udl0sol9f517g0.apps.googleusercontent.com',
  });

  useEffect(() => {
    const finishGoogleFlow = async () => {
      if (response?.type === 'success') {
        try {
          setLoadingGoogle(true);
          const { id_token } = response.params;
          const credential = GoogleAuthProvider.credential(id_token);
          await signInWithCredential(auth, credential);
          navigation.navigate('UserSelectionScreen');
        } catch (e) {
          Alert.alert('Google sign-in failed', e.message);
        } finally {
          setLoadingGoogle(false);
        }
      }
    };
    finishGoogleFlow();
  }, [response, navigation]);

  const handleGoogleSignup = () => {
    if (!request) return Alert.alert('Google', 'Auth request not ready yet');
    promptAsync();
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!form.fullName) newErrors.fullName = 'Required';
    if (!form.username) newErrors.username = 'Required';
    if (!form.dob) newErrors.dob = 'Required';
    if (!emailRegex.test(form.email)) newErrors.email = 'Invalid Email, Please try again';
    if (!phoneRegex.test(form.mobile)) newErrors.mobile = 'Invalid Mobile Number';
    if (!form.gender) newErrors.gender = 'Select gender';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) {
      navigation.navigate('OtpVerification', {
        email: form.email,
        mobile: form.mobile,
      });
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* 🔙 Back Icon */}
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Signup to continue</Text>

          <LabeledInput
            label="Full Name"
            placeholder="Enter Full Name"
            icon={<Ionicons name="person-outline" size={20} color="#666" />}
            value={form.fullName}
            onChangeText={(text) => handleChange('fullName', text)}
            error={errors.fullName}
          />

          <LabeledInput
          label="Username"
          placeholder="Enter Username"
          icon={<Ionicons name="person-circle-outline" size={20} color="#666" />}
          value={form.username}
          onChangeText={(text) => handleChange('username', text)}
          error={errors.username}
        />

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <LabeledInput
              label="Date Of Birth"
              placeholder="Enter Your DOB"
              icon={<Ionicons name="calendar-outline" size={20} color="#666" />}
              value={form.dob}
              editable={false}
              error={errors.dob}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  handleChange('dob', selectedDate.toLocaleDateString());
                }
              }}
            />
          )}

          <TouchableOpacity onPress={() => setShowGenderPicker(true)}>
            <LabeledInput
              label="Gender"
              placeholder="Select Gender"
              icon={<Ionicons name="transgender-outline" size={20} color="#666" />}
              value={form.gender}
              editable={false}
              error={errors.gender}
            />
          </TouchableOpacity>

          <LabeledInput
            label="Email Address"
            placeholder="Enter Email Address"
            icon={<Feather name="mail" size={20} color="#666" />}
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
            error={errors.email}
          />

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.inputRow}>
              <Image
                // source={require('../assets/india.png')}
                style={{ width: 24, height: 16, marginRight: 6 }}
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="🇮🇳+91 Enter Mobile number"
                value={form.mobile}
                onChangeText={(text) => handleChange('mobile', text)}
              />
            </View>
            {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}
          </View>

          <LabeledInput
            label="Password"
            placeholder="Create Password"
            secureTextEntry={!showPassword}
            icon={<FontAwesome name="lock" size={20} color="#666" />}
            value={form.password}
            onChangeText={(text) => handleChange('password', text)}
            toggleSecure={() => setShowPassword(!showPassword)}
            showSecure={showPassword}
            error={errors.password}
          />

          <LabeledInput
            label="Confirm Password"
            placeholder="Re-enter Password"
            secureTextEntry={!showPassword}
            icon={<FontAwesome name="lock" size={20} color="#666" />}
            value={form.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            toggleSecure={() => setShowPassword(!showPassword)}
            showSecure={showPassword}
            error={errors.confirmPassword}
          />

          <TouchableOpacity onPress={() => setAgreeTerms(!agreeTerms)} style={styles.checkboxRow}>
            <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
              {agreeTerms && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>
              I agree with <Text style={styles.termsLink}>terms & conditions</Text>
            </Text>
          </TouchableOpacity>
          {errors.terms ? <Text style={styles.error}>{errors.terms}</Text> : null}

          <LinearGradient
            colors={['#0077B6', '#512DB8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.signupBtn}
          >
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signupText}>SignUp</Text>
            </TouchableOpacity>
          </LinearGradient>

          <Text style={styles.or}>OR</Text>

          <View style={styles.socialRow}>
            {/* Google – wired */}
            <TouchableOpacity onPress={handleGoogleSignup} disabled={loadingGoogle}>
              <Image source={require('../assets/google.png')} style={styles.socialIcon} />
            </TouchableOpacity>

            {/* GitHub / Facebook – unchanged placeholders */}
            <Image source={require('../assets/github.png')} style={styles.socialIcon} />
            <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.footerText}>
              Already have an account? <Text style={styles.link}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {showGenderPicker && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalPicker}>
            {['Male', 'Female', 'Other'].map((gender) => (
              <TouchableOpacity
                key={gender}
                onPress={() => {
                  handleChange('gender', gender);
                  setShowGenderPicker(false);
                }}
                style={styles.pickerOption}
              >
                <Text style={styles.pickerText}>{gender}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setShowGenderPicker(false)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const LabeledInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  icon,
  toggleSecure,
  showSecure,
  error,
  editable = true,
}) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputRow}>
      {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        editable={editable}
      />
      {toggleSecure && (
        <TouchableOpacity onPress={toggleSecure}>
          <Ionicons name={showSecure ? 'eye' : 'eye-off'} size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1, paddingTop: 100 },
  title: { fontSize: 26,  fontWeight: 'bold', color: "#0077B6", marginBottom: 4 },
  subtitle: { fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 20 },
  inputWrapper: { marginBottom: 14 },
  label: { marginBottom: 4, fontWeight: 'bold', color: '#000' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  input: { flex: 1, padding: 12, fontSize: 14 },
  error: { color: 'red', fontSize: 12, marginTop: 4 },
  mobileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 14 },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#999',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: { backgroundColor: '#4a90e2', borderColor: '#4a90e2' },
  checkboxLabel: { fontSize: 13, fontWeight: 'bold', color: '#444' },
  termsLink: { color: '#007AFF', textDecorationLine: 'underline' },
  signupBtn: { borderRadius: 8, alignItems: 'center', overflow: 'hidden', marginTop: 10 },
  signupText: { color: '#fff', fontWeight: 'bold', padding: 14 },
  or: { textAlign: 'center', marginVertical: 14, color: '#aaa' },
  footerText: { textAlign: 'center', color: '#555', fontSize: 14 },
  link: { color: '#007AFF', fontWeight: 'bold' },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginVertical: 10 },
  socialIcon: { width: 40, height: 40, resizeMode: 'contain' },
  genderBox: { paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1, borderColor: '#999', borderRadius: 20 },
  genderBoxActive: { backgroundColor: '#4a90e2', borderColor: '#4a90e2' },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalPicker: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  pickerOption: { paddingVertical: 12, alignItems: 'center' },
  pickerText: { fontSize: 16, fontWeight: '600', color: '#333' },
  cancelButton: { paddingVertical: 12, alignItems: 'center', borderTopWidth: 1, borderColor: '#eee', marginTop: 10 },
  cancelText: { color: '#007AFF', fontWeight: 'bold', fontSize: 16 },
});
