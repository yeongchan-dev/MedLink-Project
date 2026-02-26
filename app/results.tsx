import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

interface Condition {
  id: string;
  name_en: string;
  name_ko: string;
  description_en: string;
  description_ko: string;
  symptom_weights: Array<{ symptom_id: string; weight: number }>;
  exclusion_red_flags?: Array<{ if_symptoms_any: string[]; recommendation: string }>;
  us_otc: Array<{
    category: string;
    brands: string[];
    active_ingredient: string;
    dosage: string;
    korean_notes: string;
    price_range: string;
    prescription_needed: boolean;
  }>;
  care_pathway: {
    self_care_ok: boolean;
    when_seek_care: string;
    urgent_if: string[];
    followup: string;
  };
  category: string;
}

const conditionsData = require('../data/conditions.json');
const symptomsData = require('../data/symptoms.json');

interface Symptom {
  id: string;
  label_en: string;
  label_ko: string;
  synonyms_en: string[];
  synonyms_ko: string[];
  category: string;
}

const conditions: Condition[] = conditionsData.conditions;
const symptoms: Symptom[] = symptomsData.symptoms;

function calculateConditionScore(condition: Condition, selectedSymptomIds: string[]): number {
  let totalScore = 0;
  let maxPossibleScore = 0;

  for (const weightedSymptom of condition.symptom_weights) {
    maxPossibleScore += weightedSymptom.weight;
    if (selectedSymptomIds.includes(weightedSymptom.symptom_id)) {
      totalScore += weightedSymptom.weight;
    }
  }

  return maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
}

function checkRedFlags(condition: Condition, selectedSymptomIds: string[]): string | null {
  if (!condition.exclusion_red_flags) return null;

  for (const redFlag of condition.exclusion_red_flags) {
    const hasAnyFlagSymptom = redFlag.if_symptoms_any.some(symptomId =>
      selectedSymptomIds.includes(symptomId)
    );
    if (hasAnyFlagSymptom) {
      return redFlag.recommendation;
    }
  }

  return null;
}

export default function ResultsScreen() {
  const { symptoms } = useLocalSearchParams();
  const symptomsList = typeof symptoms === 'string' ? symptoms.split(',') : [];

  const results = useMemo(() => {
    const scoredConditions = conditions
      .map(condition => {
        const score = calculateConditionScore(condition, symptomsList);
        const redFlagRecommendation = checkRedFlags(condition, symptomsList);

        return {
          condition,
          score,
          redFlagRecommendation
        };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return scoredConditions;
  }, [symptomsList]);

  const hasRedFlags = results.some(item => item.redFlagRecommendation !== null);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {hasRedFlags && (
            <View style={styles.redFlagBanner}>
              <Text style={styles.redFlagTitle}>🚨 Immediate Medical Attention Required</Text>
              <Text style={styles.redFlagText}>
                {results.find(item => item.redFlagRecommendation)?.redFlagRecommendation}
              </Text>
            </View>
          )}

          <Text style={styles.title}>Possible Conditions</Text>
          <Text style={styles.subtitle}>Top {results.length} matches based on your symptoms</Text>

          {results.map((item, index) => {
            const { condition, score, redFlagRecommendation } = item;
            const likelihood = score >= 70 ? 'High' : score >= 40 ? 'Medium' : 'Low';

            return (
              <View key={condition.id} style={styles.conditionCard}>
                <View style={styles.conditionHeader}>
                  <Text style={styles.conditionName}>{condition.name_en}</Text>
                  <View style={[
                    styles.likelihoodBadge,
                    likelihood === 'High' && styles.likelihoodHigh,
                    likelihood === 'Medium' && styles.likelihoodMedium,
                    likelihood === 'Low' && styles.likelihoodLow,
                  ]}>
                    <Text style={styles.likelihoodText}>{Math.round(score)}% Match</Text>
                  </View>
                </View>

                <Text style={styles.conditionDescription}>{condition.description_en}</Text>

                {redFlagRecommendation && (
                  <View style={styles.urgentCare}>
                    <Text style={styles.urgentCareTitle}>⚠️ Urgent Care Needed</Text>
                    <Text style={styles.urgentCareText}>{redFlagRecommendation}</Text>
                  </View>
                )}

                <Text style={styles.sectionTitle}>Recommended OTC Treatments:</Text>
                {condition.otc_options_us && condition.otc_options_us.length > 0 ? condition.otc_options_us.map((medicine, medIndex) => (
                  <View key={medIndex} style={styles.medicineCard}>
                    <Text style={styles.medicineName}>{medicine.example_brands.join(', ')}</Text>
                    <Text style={styles.medicineDetails}>
                      {medicine.active_ingredients.join(', ')} • {medicine.dosage}
                    </Text>
                    <Text style={styles.medicineGoal}>
                      🎯 {medicine.goal}
                    </Text>
                    {medicine.warnings && medicine.warnings.length > 0 && (
                      <Text style={styles.medicineWarnings}>
                        ⚠️ {medicine.warnings.join(', ')}
                      </Text>
                    )}
                  </View>
                )) : (
                  <Text style={styles.noMedicineText}>No OTC treatments available for this condition.</Text>
                )}

                {condition.care_pathway && (
                  <View style={styles.carePathway}>
                    <Text style={styles.carePathwayTitle}>When to Seek Care:</Text>
                    <Text style={styles.carePathwayText}>{condition.care_pathway.when_seek_care}</Text>
                    {condition.care_pathway.urgent_if && condition.care_pathway.urgent_if.length > 0 && (
                      <Text style={styles.urgentIf}>
                        🚨 Seek immediate care if: {condition.care_pathway.urgent_if.join(', ')}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            );
          })}

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerTitle}>Important Disclaimer</Text>
            <Text style={styles.disclaimerText}>
              This information is for educational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment.
              Always consult with a qualified healthcare provider before starting any new medication or if symptoms persist or worsen.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Try Different Symptoms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
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
  redFlagBanner: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
  },
  redFlagTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 4,
  },
  redFlagText: {
    fontSize: 14,
    color: '#d32f2f',
    lineHeight: 20,
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
    marginBottom: 24,
  },
  conditionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  conditionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  conditionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  likelihoodBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  likelihoodHigh: {
    backgroundColor: '#e8f5e8',
  },
  likelihoodMedium: {
    backgroundColor: '#fff3cd',
  },
  likelihoodLow: {
    backgroundColor: '#f8f9fa',
  },
  likelihoodText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#27ae60',
  },
  conditionDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 12,
  },
  medicineCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  medicineName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  medicineDetails: {
    fontSize: 13,
    color: '#34495e',
    marginBottom: 4,
  },
  medicinePrice: {
    fontSize: 12,
    color: '#27ae60',
    marginBottom: 4,
  },
  medicineNotes: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 16,
    fontStyle: 'italic',
  },
  medicineGoal: {
    fontSize: 13,
    color: '#2980b9',
    marginBottom: 4,
    fontWeight: '500',
  },
  medicineWarnings: {
    fontSize: 12,
    color: '#e67e22',
    lineHeight: 16,
  },
  noMedicineText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  urgentCare: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
  urgentCareTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 4,
  },
  urgentCareText: {
    fontSize: 13,
    color: '#d32f2f',
    lineHeight: 18,
  },
  carePathway: {
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 6,
    marginTop: 12,
  },
  carePathwayTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 4,
  },
  carePathwayText: {
    fontSize: 13,
    color: '#388e3c',
    lineHeight: 18,
  },
  urgentIf: {
    fontSize: 12,
    color: '#d32f2f',
    marginTop: 8,
    fontWeight: '500',
  },
  disclaimer: {
    backgroundColor: '#fff3cd',
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
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
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#95a5a6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  homeButton: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});