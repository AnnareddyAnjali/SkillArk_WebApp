import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/AppNavigator/Navigation';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}
