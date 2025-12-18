import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Firebase
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../config/firebase'; // <-- change path if needed

// Google Auth (Expo)
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [useEmail, setUseEmail] = useState(true);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---- GOOGLE AUTH ----
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '456765084496-p0fm45i8l4pslfcr247l8lu0i8i6511f.apps.googleusercontent.com',
    webClientId:
      '456765084496-fth237bt3jmkc4ci99udl0sol9f517g0.apps.googleusercontent.com',
    expoClientId:
      '456765084496-fth237bt3jmkc4ci99udl0sol9f517g0.apps.googleusercontent.com', // works in Expo Go
  });

  useEffect(() => {
    const signInWithGoogle = async () => {
      if (response?.type === 'success') {
        try {
          setLoading(true);
          const { id_token } = response.params;
          const credential = GoogleAuthProvider.credential(id_token);
          await signInWithCredential(auth, credential);
          navigation.navigate('UserSelectionScreen');
        } catch (e) {
          Alert.alert('Google login failed', e.message);
        } finally {
          setLoading(false);
        }
      }
    };
    signInWithGoogle();
  }, [response, navigation]);

  const handleLogin = async () => {
    const identifier = useEmail ? email.trim() : mobile.trim();

    if (!identifier) {
      Alert.alert('Validation', 'Please enter your email or mobile number');
      return;
    }

    if (useEmail && password.trim().length < 6) {
      Alert.alert('Validation', 'Password must be at least 6 characters');
      return;
    }

    if (useEmail) {
      // Email / password login
      try {
        setLoading(true);
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const token = await cred.user.getIdToken();
        console.log('Firebase ID Token:', token);
        navigation.navigate('UserSelectionScreen', { identifier: email });
      } catch (err) {
        Alert.alert('Login failed', err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Phone path -> later plug Firebase Phone Auth (OTP)
      navigation.navigate('OTPVerification', { mobile });
    }
  };

  const handleGooglePress = () => {
    if (!request) return Alert.alert('Google', 'Auth request not ready yet');
    promptAsync();
  };

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Login Account</Text>
      <Text style={styles.subtitle}>Welcome back! 👋</Text>

      {/* Email / Mobile Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>{useEmail ? 'Email Address' : 'Mobile Number'}</Text>
        <TouchableOpacity onPress={() => setUseEmail(!useEmail)}>
          <Text style={styles.toggleText}>
            {useEmail ? 'Use Mobile Number' : 'Use Email Address'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Input Field */}
      {useEmail ? (
        <TextInput
          style={styles.input}
          placeholder="Enter Email Address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      ) : (
        <View style={styles.mobileInputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.mobileInput}
            placeholder="Enter mobile number"
            placeholderTextColor="#999"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />
        </View>
      )}

      {/* Password (email only) */}
      {useEmail && (
        <>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={22} color="#666" />
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Remember & Forgot */}
      <View style={styles.forgotRow}>
        <View style={styles.checkboxContainer}>
          <Text>Remember me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <LinearGradient colors={['#0077B6', '#512DB8']} style={styles.button}>
        <TouchableOpacity onPress={handleLogin} style={styles.buttonTouchable} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* OR Divider */}
      <Text style={styles.or}>OR</Text>

      {/* Social Logins */}
      <View style={styles.socialContainer}>
        {/* Google */}
        <TouchableOpacity onPress={handleGooglePress}>
          <Image source={require('../assets/google.png')} style={styles.socialIcon} />
        </TouchableOpacity>

        {/* GitHub placeholder */}
        <TouchableOpacity onPress={() => Alert.alert('GitHub Login', 'Not implemented yet')}>
          <Image source={require('../assets/github.png')} style={styles.socialIcon} />
        </TouchableOpacity>

        {/* Facebook placeholder */}
        <TouchableOpacity onPress={() => Alert.alert('Facebook Login', 'Not implemented yet')}>
          <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      {/* Sign Up */}
      <View style={styles.signupContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: '#0077B6', fontWeight: '600' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 80, backgroundColor: '#fff' },
  backIcon: { position: 'absolute', top: 50, left: 20 },
  // title: { fontSize: 26, fontWeight: 'bold', color: '#000' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0077B6' }, // blue color

  subtitle: { fontSize: 20, marginBottom: 30, fontWeight: "bold", color: '#000' },
  toggleContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  toggleText: { color: '#0077B6', fontWeight: '600' },
  label: { marginBottom: 6, fontWeight: '600', color: '#000' },
  input: {
    borderWidth: 1, borderColor: '#bbb', borderRadius: 8,
    padding: 12, marginBottom: 16, fontSize: 16,
  },
  mobileInputContainer: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#bbb',
    borderRadius: 8, paddingHorizontal: 12, marginBottom: 16,
  },
  countryCode: { fontSize: 16, marginRight: 8, color: '#000' },
  mobileInput: { flex: 1, height: 48, fontSize: 16 },
  passwordContainer: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#bbb',
    borderRadius: 8, paddingHorizontal: 12, marginBottom: 16,
  },
  passwordInput: { flex: 1, paddingVertical: 12, fontSize: 16 },
  forgotRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  forgotPasswordText: { color: '#0077B6' },
  button: {
    width: width - 40, height: 46, borderRadius: 6,
    justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 25,
  },
  buttonTouchable: { width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  or: { textAlign: 'center', color: '#888', marginBottom: 20 },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: 30, marginBottom: 30 },
  socialIcon: { width: 36, height: 36, resizeMode: 'contain' },
  signupContainer: { flexDirection: 'row', justifyContent: 'center' },
  checkboxContainer: {},
});
