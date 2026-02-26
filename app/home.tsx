import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>MedLink</Text>
        <Text style={styles.subtitle}>Get help finding the right over-the-counter medicine</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/symptoms')}
          >
            <Text style={styles.buttonText}>Find by Symptoms</Text>
            <Text style={styles.buttonDescription}>Tell us what you're feeling</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/korean-medicine')}
          >
            <Text style={styles.buttonText}>Korean Medicine → US Alternative</Text>
            <Text style={styles.buttonDescription}>Find US alternatives to Korean medicines</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/safety')}
          >
            <Text style={styles.buttonText}>Safety / When to Seek Care</Text>
            <Text style={styles.buttonDescription}>Important safety information</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.emergencyButton]}
            onPress={() => router.push('/emergency')}
          >
            <Text style={styles.buttonText}>🚨 Emergency & First Aid</Text>
            <Text style={styles.buttonDescription}>Burns, cuts, emergency procedures</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/drug-interactions')}
          >
            <Text style={styles.buttonText}>⚠️ Drug Interactions</Text>
            <Text style={styles.buttonDescription}>Learn about medication combinations</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            This app provides general information only and is not a substitute for professional medical advice.
            Always consult a healthcare provider for serious symptoms.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8BC34A',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#ffffff',
    opacity: 0.9,
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#64B5F6',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyButton: {
    backgroundColor: '#FF7043',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  buttonDescription: {
    color: '#ecf0f1',
    fontSize: 14,
    textAlign: 'center',
  },
  disclaimer: {
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 16,
  },
});