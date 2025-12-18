// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import LoginEmailScreen from '../screens/LoginEmailScreen';
import LoginMobileScreen from '../screens/LoginMobileScreen';
import EmailOtpVerificationScreen from '../screens/EmailOtpVerificationScreen';
import MobileOtpVerificationScreen from '../screens/MobileOtpVerificationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import SetNewPasswordScreen from '../screens/SetNewPasswordScreen';
import SignInScreen from '../screens/SignInScreen';
import TwoStepVerificationScreen from '../screens/TwoStepVerificationScreen';
import UserSelectionScreen from '../screens/UserSelectionScreen';
import Student from '../screens/Student';
import AddExperience from '../screens/AddExperience'; // Ensure to import all necessary screens
import AddSkills from '../screens/AddSkills';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LoginEmail" component={LoginEmailScreen} />
        <Stack.Screen name="LoginMobile" component={LoginMobileScreen} />
        <Stack.Screen name="EmailOtpVerification" component={EmailOtpVerificationScreen} />
        <Stack.Screen name="MobileOtpVerification" component={MobileOtpVerificationScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="SetNewPassword" component={SetNewPasswordScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="TwoStepVerification" component={TwoStepVerificationScreen} />
        <Stack.Screen name="UserSelection" component={UserSelectionScreen} />
        <Stack.Screen name="Student" component={Student} />
        <Stack.Screen name="AddExperience" component={AddExperience} />
        <Stack.Screen name="AddSkills" component={AddSkills} />
        {/* Add other screens as needed */}
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
