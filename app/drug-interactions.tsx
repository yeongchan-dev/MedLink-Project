import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

const drugInteractionsData = require('../data/drug_interactions.json').drug_interactions;

export default function DrugInteractionsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'dangerous', title: '⚠️ Dangerous Combinations', count: drugInteractionsData.dangerous_combinations.length },
    { key: 'beneficial', title: '✅ Beneficial Combinations', count: drugInteractionsData.beneficial_combinations.length },
    { key: 'supplements', title: '💊 Supplement Interactions', count: drugInteractionsData.supplement_interactions.length },
    { key: 'timing', title: '⏰ Timing Guidelines', count: Object.keys(drugInteractionsData.timing_guidelines).length },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'very_high':
        return '#d32f2f';
      case 'high':
        return '#f44336';
      case 'moderate':
        return '#ff9800';
      default:
        return '#2196F3';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'very_high':
        return '#ffebee';
      case 'high':
        return '#ffebee';
      case 'moderate':
        return '#fff3e0';
      default:
        return '#e3f2fd';
    }
  };

  const renderDangerousCombinations = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>⚠️ Dangerous Drug Combinations</Text>
      <Text style={styles.sectionSubtitle}>Avoid these combinations - they can be harmful</Text>

      {drugInteractionsData.dangerous_combinations.map((interaction: any) => (
        <View
          key={interaction.id}
          style={[
            styles.interactionCard,
            { backgroundColor: getSeverityBg(interaction.severity) }
          ]}
        >
          <View style={styles.interactionHeader}>
            <Text style={styles.interactionCombination}>
              {interaction.combination.join(' + ')}
            </Text>
            <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(interaction.severity) }]}>
              <Text style={styles.severityText}>{interaction.severity.toUpperCase()}</Text>
            </View>
          </View>

          <Text style={styles.mechanismTitle}>How it works:</Text>
          <Text style={styles.mechanismText}>{interaction.mechanism}</Text>

          <Text style={styles.koreanTitle}>한국어:</Text>
          <Text style={styles.koreanText}>{interaction.korean_description}</Text>

          <Text style={styles.recommendationTitle}>Recommendation:</Text>
          <Text style={styles.recommendationText}>{interaction.recommendation}</Text>

          {interaction.warning && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>⚠️ {interaction.warning}</Text>
            </View>
          )}

          {interaction.affected_medications && (
            <>
              <Text style={styles.affectedTitle}>Affected medications:</Text>
              <Text style={styles.affectedText}>{interaction.affected_medications.join(', ')}</Text>
            </>
          )}

          {interaction.symptoms && (
            <>
              <Text style={styles.symptomsTitle}>Possible symptoms:</Text>
              <Text style={styles.symptomsText}>{interaction.symptoms.join(', ')}</Text>
            </>
          )}
        </View>
      ))}
    </View>
  );

  const renderBeneficialCombinations = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>✅ Beneficial Combinations</Text>
      <Text style={styles.sectionSubtitle}>These combinations can enhance effectiveness</Text>

      {drugInteractionsData.beneficial_combinations.map((combination: any) => (
        <View key={combination.id} style={styles.beneficialCard}>
          <Text style={styles.beneficialCombination}>
            {combination.combination.join(' + ')}
          </Text>

          <Text style={styles.benefitTitle}>Benefit:</Text>
          <Text style={styles.benefitText}>{combination.benefit}</Text>

          <Text style={styles.koreanTitle}>한국어:</Text>
          <Text style={styles.koreanText}>{combination.korean_description}</Text>

          <Text style={styles.recommendationTitle}>How to take:</Text>
          <Text style={styles.recommendationText}>{combination.recommendation}</Text>

          {combination.mechanism && (
            <>
              <Text style={styles.mechanismTitle}>Why it works:</Text>
              <Text style={styles.mechanismText}>{combination.mechanism}</Text>
            </>
          )}

          {combination.good_foods && (
            <>
              <Text style={styles.goodFoodsTitle}>Good food sources:</Text>
              <Text style={styles.goodFoodsText}>{combination.good_foods.join(', ')}</Text>
            </>
          )}
        </View>
      ))}
    </View>
  );

  const renderSupplementInteractions = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>💊 Supplement Interactions</Text>
      <Text style={styles.sectionSubtitle}>How supplements interact with each other</Text>

      {drugInteractionsData.supplement_interactions.map((interaction: any) => (
        <View key={interaction.id} style={styles.supplementCard}>
          <Text style={styles.supplementCombination}>
            {interaction.combination.join(' + ')}
          </Text>

          <Text style={styles.interactionTypeTitle}>Interaction type:</Text>
          <Text style={styles.interactionTypeText}>{interaction.interaction.replace('_', ' ')}</Text>

          <Text style={styles.effectTitle}>Effect:</Text>
          <Text style={styles.effectText}>{interaction.effect}</Text>

          <Text style={styles.koreanTitle}>한국어:</Text>
          <Text style={styles.koreanText}>{interaction.korean_description}</Text>

          <Text style={styles.recommendationTitle}>Recommendation:</Text>
          <Text style={styles.recommendationText}>{interaction.recommendation}</Text>

          {interaction.timing && (
            <>
              <Text style={styles.timingTitle}>Timing:</Text>
              <Text style={styles.timingText}>{interaction.timing}</Text>
            </>
          )}

          {interaction.optimal_ratio && (
            <>
              <Text style={styles.ratioTitle}>Optimal ratio:</Text>
              <Text style={styles.ratioText}>{interaction.optimal_ratio}</Text>
            </>
          )}
        </View>
      ))}
    </View>
  );

  const renderTimingGuidelines = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>⏰ Timing Guidelines</Text>
      <Text style={styles.sectionSubtitle}>When to take medications and supplements</Text>

      {Object.entries(drugInteractionsData.timing_guidelines).map(([timing, medications]: [string, any]) => (
        <View key={timing} style={styles.timingCard}>
          <Text style={styles.timingCategory}>{timing.replace('_', ' ').toUpperCase()}</Text>
          <Text style={styles.timingMedications}>{medications.join(', ')}</Text>
        </View>
      ))}

      <View style={styles.timingTipsCard}>
        <Text style={styles.timingTipsTitle}>💡 General Timing Tips</Text>
        <Text style={styles.timingTip}>• Take iron and thyroid medications on empty stomach</Text>
        <Text style={styles.timingTip}>• Take NSAIDs (ibuprofen, naproxen) with food</Text>
        <Text style={styles.timingTip}>• Separate calcium from iron by 2+ hours</Text>
        <Text style={styles.timingTip}>• Take probiotics 2-3 hours after antibiotics</Text>
        <Text style={styles.timingTip}>• Take melatonin 30-60 minutes before bed</Text>
        <Text style={styles.timingTip}>• Take B vitamins in the morning (can be energizing)</Text>
      </View>
    </View>
  );

  if (selectedCategory) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {selectedCategory === 'dangerous' && renderDangerousCombinations()}
          {selectedCategory === 'beneficial' && renderBeneficialCombinations()}
          {selectedCategory === 'supplements' && renderSupplementInteractions()}
          {selectedCategory === 'timing' && renderTimingGuidelines()}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Drug Interactions</Text>
          <Text style={styles.subtitle}>Learn about medication and supplement interactions</Text>

          <View style={styles.warningBanner}>
            <Text style={styles.warningBannerTitle}>⚠️ Important Notice</Text>
            <Text style={styles.warningBannerText}>
              Always consult your doctor or pharmacist before combining medications.
              This information is for educational purposes only.
            </Text>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search interactions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#7f8c8d"
            />
          </View>

          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={styles.categoryCard}
                onPress={() => setSelectedCategory(category.key)}
              >
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryCount}>{category.count} interactions</Text>
                <Text style={styles.categoryArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.quickTipsContainer}>
            <Text style={styles.quickTipsTitle}>🔍 Quick Safety Tips</Text>
            <View style={styles.quickTip}>
              <Text style={styles.quickTipText}>• Always read medication labels carefully</Text>
            </View>
            <View style={styles.quickTip}>
              <Text style={styles.quickTipText}>• Keep a list of all medications and supplements</Text>
            </View>
            <View style={styles.quickTip}>
              <Text style={styles.quickTipText}>• Ask your pharmacist about potential interactions</Text>
            </View>
            <View style={styles.quickTip}>
              <Text style={styles.quickTipText}>• Don't mix alcohol with acetaminophen</Text>
            </View>
            <View style={styles.quickTip}>
              <Text style={styles.quickTipText}>• Take medications at consistent times</Text>
            </View>
          </View>

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerTitle}>Medical Disclaimer</Text>
            <Text style={styles.disclaimerText}>
              This app provides general information about drug interactions for educational purposes only.
              It is not intended to replace professional medical advice, diagnosis, or treatment.
              Always consult with qualified healthcare providers regarding drug interactions and medical conditions.
              Never stop or change medications without consulting your doctor.
            </Text>
          </View>
        </View>
      </ScrollView>
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
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 24,
  },
  warningBanner: {
    backgroundColor: '#fff3cd',
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  warningBannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 4,
  },
  warningBannerText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2c3e50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoriesContainer: {
    gap: 12,
    marginBottom: 24,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  categoryCount: {
    fontSize: 12,
    color: '#7f8c8d',
    marginRight: 8,
  },
  categoryArrow: {
    fontSize: 18,
    color: '#3498db',
    fontWeight: 'bold',
  },
  quickTipsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickTipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  quickTip: {
    marginBottom: 6,
  },
  quickTipText: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 18,
  },
  sectionContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  interactionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  interactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  interactionCombination: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  mechanismTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 4,
  },
  mechanismText: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 8,
    lineHeight: 18,
  },
  koreanTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8e44ad',
    marginBottom: 4,
  },
  koreanText: {
    fontSize: 14,
    color: '#8e44ad',
    marginBottom: 8,
    lineHeight: 18,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27ae60',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 14,
    color: '#27ae60',
    marginBottom: 8,
    lineHeight: 18,
  },
  warningBox: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 3,
    borderLeftColor: '#f44336',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '600',
  },
  affectedTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 4,
  },
  affectedText: {
    fontSize: 13,
    color: '#2c3e50',
    marginBottom: 6,
  },
  symptomsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e74c3c',
    marginBottom: 4,
  },
  symptomsText: {
    fontSize: 13,
    color: '#e74c3c',
  },
  beneficialCard: {
    backgroundColor: '#e8f5e8',
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  beneficialCombination: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27ae60',
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 14,
    color: '#27ae60',
    marginBottom: 8,
    lineHeight: 18,
  },
  goodFoodsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 4,
  },
  goodFoodsText: {
    fontSize: 13,
    color: '#2c3e50',
  },
  supplementCard: {
    backgroundColor: 'white',
    borderLeftWidth: 4,
    borderLeftColor: '#9c27b0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supplementCombination: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  interactionTypeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9c27b0',
    marginBottom: 4,
  },
  interactionTypeText: {
    fontSize: 14,
    color: '#9c27b0',
    marginBottom: 8,
    lineHeight: 18,
    textTransform: 'capitalize',
  },
  effectTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 4,
  },
  effectText: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 8,
    lineHeight: 18,
  },
  timingTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f39c12',
    marginBottom: 4,
  },
  timingText: {
    fontSize: 13,
    color: '#f39c12',
    marginBottom: 6,
  },
  ratioTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3498db',
    marginBottom: 4,
  },
  ratioText: {
    fontSize: 13,
    color: '#3498db',
  },
  timingCard: {
    backgroundColor: 'white',
    borderLeftWidth: 4,
    borderLeftColor: '#f39c12',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  timingCategory: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f39c12',
    marginBottom: 8,
  },
  timingMedications: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 18,
  },
  timingTipsCard: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  timingTipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 12,
  },
  timingTip: {
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 6,
    lineHeight: 18,
  },
  disclaimer: {
    backgroundColor: '#fff3cd',
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
    borderRadius: 8,
    padding: 16,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 16,
  },
});