import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

const symptomsData = require('../data/symptoms.json');

interface Symptom {
  id: string;
  label_en: string;
  label_ko: string;
  synonyms_en: string[];
  synonyms_ko: string[];
  category: string;
}

const symptoms: Symptom[] = symptomsData.symptoms;

const categoryMapping: Record<string, string> = {
  'INFECTIOUS': 'Infectious',
  'RESP': 'Respiratory',
  'ENT': 'Ear, Nose & Throat',
  'GEN': 'General',
  'GI': 'Digestive',
  'ALLERGY': 'Allergy',
  'DERM': 'Skin',
  'NEURO': 'Neurological',
  'SLEEP': 'Sleep',
  'METABOLIC': 'Metabolic',
  'MSK': 'Muscle & Joint',
  'CARDIAC': 'Heart',
  'OPHTH': 'Eye',
  'PSYCH': 'Mental Health',
  'EMERGENCY': 'Emergency'
};

export default function SymptomsScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const groupedSymptoms = symptoms.reduce((acc, symptom) => {
    const displayCategory = categoryMapping[symptom.category] || symptom.category;
    if (!acc[displayCategory]) {
      acc[displayCategory] = [];
    }
    acc[displayCategory].push(symptom);
    return acc;
  }, {} as Record<string, Symptom[]>);

  const handleContinue = () => {
    if (selectedSymptoms.length === 0) {
      return;
    }

    router.push({
      pathname: '/results',
      params: { symptoms: selectedSymptoms.join(',') }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>What symptoms are you experiencing?</Text>
          <Text style={styles.subtitle}>Select all that apply</Text>

          {Object.entries(groupedSymptoms).map(([category, categorySymptoms]) => (
            <View key={category} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <View style={styles.symptomsGrid}>
                {categorySymptoms.map((symptom) => (
                  <TouchableOpacity
                    key={symptom.id}
                    style={[
                      styles.symptomButton,
                      selectedSymptoms.includes(symptom.id) && styles.symptomButtonSelected
                    ]}
                    onPress={() => toggleSymptom(symptom.id)}
                  >
                    <Text style={[
                      styles.symptomText,
                      selectedSymptoms.includes(symptom.id) && styles.symptomTextSelected
                    ]}>
                      {symptom.label_en}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.selectedCount}>
          {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected
        </Text>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedSymptoms.length === 0 && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={selectedSymptoms.length === 0}
        >
          <Text style={[
            styles.continueButtonText,
            selectedSymptoms.length === 0 && styles.continueButtonTextDisabled
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 12,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
  },
  symptomButtonSelected: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  symptomText: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  symptomTextSelected: {
    color: 'white',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  selectedCount: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 12,
  },
  continueButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: '#ecf0f1',
  },
});