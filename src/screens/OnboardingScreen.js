import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // ✅ For Expo

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Skillarc_logo.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Title Section */}
          <View style={styles.titleBox}>
            <Text style={styles.title}>Welcome to SkillArc</Text>
          </View>

          {/* Subtitle Section */}
          <View style={styles.subtitleBox}>
            <Text style={styles.subtitle}>Connect. Learn. Grow.</Text>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <LinearGradient
              colors={['#0077B6', '#512DB8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: width,
    height: height,
    justifyContent: 'flex-end',
  },
  overlay: {
    paddingBottom: 60,
    alignItems: 'center',
  },
  titleBox: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#212121',
    fontWeight: 'bold',
  },
  subtitleBox: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#5C5C5C',
  },
  buttonWrapper: {
    marginTop: 50, // simulates `top: 630px` approximately
  },
  button: {
    width: 356,
    height: 46,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
