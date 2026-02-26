import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Modal } from 'react-native';
import { router } from 'expo-router';

const koreanProductsData = require('../data/korean_products.json');

interface KoreanProduct {
  id: string;
  name_ko: string;
  name_en: string;
  category: string;
  active_ingredients: string[];
  us_status: {
    availability: string;
    note: string;
  };
  us_alternatives: Array<{
    active_ingredients: string[];
    brands: string[];
    rx_required: boolean;
    price_range: string;
    similarity: 'high' | 'medium' | 'low';
  }>;
  cautions: string[];
}

const koreanProducts: KoreanProduct[] = koreanProductsData.korean_products || [];

const sampleMedicines = [
  {
    id: 'ssanghwa_tang',
    koreanName: '쌍화탕',
    englishName: 'Ssanghwa-tang',
    category: 'Cold & Fatigue',
    uses: ['Cold symptoms', 'Fatigue', 'Body aches', 'Low energy'],
    usAlternatives: [
      {
        name: 'Tylenol Cold & Flu',
        activeIngredient: 'Acetaminophen + Dextromethorphan',
        similarity: 'Medium',
        notes: 'Helps with cold symptoms and body aches, but lacks the energy-boosting herbs'
      },
      {
        name: 'Vitamin B Complex',
        activeIngredient: 'B Vitamins',
        similarity: 'Low',
        notes: 'May help with energy levels but does not address cold symptoms'
      }
    ],
    warnings: ['Not recommended if you have high blood pressure', 'Contains ginseng'],
    description: 'Traditional herbal formula used for cold symptoms and fatigue recovery'
  },
  {
    id: 'kyungok_go',
    koreanName: '경옥고',
    englishName: 'Kyungok-go',
    category: 'Energy & Vitality',
    uses: ['Chronic fatigue', 'Weak immunity', 'Recovery after illness', 'Memory enhancement'],
    usAlternatives: [
      {
        name: 'Ginseng supplements',
        activeIngredient: 'Panax Ginseng',
        similarity: 'High',
        notes: 'Contains similar ginseng compounds for energy and immunity'
      },
      {
        name: 'Multivitamin with Iron',
        activeIngredient: 'Various vitamins + Iron',
        similarity: 'Medium',
        notes: 'Helps with energy and immunity but lacks the specific herbal compounds'
      }
    ],
    warnings: ['May interact with blood thinners', 'Not recommended for children under 12'],
    description: 'Premium herbal tonic for long-term energy and health maintenance'
  },
  {
    id: 'galgeun_tang',
    koreanName: '갈근탕',
    englishName: 'Galgeun-tang (Kudzu Decoction)',
    category: 'Cold & Neck Pain',
    uses: ['Early cold symptoms', 'Neck stiffness', 'Shoulder pain', 'Mild fever'],
    usAlternatives: [
      {
        name: 'Ibuprofen (Advil)',
        activeIngredient: 'Ibuprofen',
        similarity: 'Medium',
        notes: 'Good for neck pain and fever, but does not address cold symptoms specifically'
      },
      {
        name: 'Aspirin',
        activeIngredient: 'Aspirin',
        similarity: 'Medium',
        notes: 'Helps with pain and fever relief'
      }
    ],
    warnings: ['Avoid if allergic to chrysanthemum', 'May cause drowsiness'],
    description: 'Traditional formula for early-stage cold with neck and shoulder tension'
  },
  {
    id: 'yaghan_san',
    koreanName: '억간산',
    englishName: 'Yaghan-san',
    category: 'Stress & Anxiety',
    uses: ['Stress', 'Mild anxiety', 'Insomnia', 'Irritability', 'Muscle tension'],
    usAlternatives: [
      {
        name: 'Melatonin',
        activeIngredient: 'Melatonin',
        similarity: 'Low',
        notes: 'Helps with sleep but does not address stress or anxiety during the day'
      },
      {
        name: 'Magnesium supplements',
        activeIngredient: 'Magnesium',
        similarity: 'Medium',
        notes: 'May help with muscle relaxation and mild anxiety'
      },
      {
        name: 'Valerian root supplements',
        activeIngredient: 'Valerian root extract',
        similarity: 'Medium',
        notes: 'Natural herb that may help with stress and sleep'
      }
    ],
    warnings: ['May cause drowsiness', 'Avoid driving after taking'],
    description: 'Herbal formula traditionally used for stress relief and emotional balance'
  },
  {
    id: 'ganmae_cha',
    koreanName: '감기차',
    englishName: 'Cold Tea (Ganmae-cha)',
    category: 'Cold & Cough',
    uses: ['Common cold', 'Cough', 'Sore throat', 'Congestion'],
    usAlternatives: [
      {
        name: 'Throat lozenges with menthol',
        activeIngredient: 'Menthol',
        similarity: 'Medium',
        notes: 'Helps with throat symptoms but lacks the warming herbs'
      },
      {
        name: 'Hot tea with honey and lemon',
        activeIngredient: 'Natural honey + Vitamin C',
        similarity: 'High',
        notes: 'Similar warming effect and throat soothing properties'
      },
      {
        name: 'Robitussin DM',
        activeIngredient: 'Dextromethorphan',
        similarity: 'Medium',
        notes: 'Effective for cough but lacks other cold symptom relief'
      }
    ],
    warnings: ['Contains ginger - avoid if you have stomach ulcers'],
    description: 'Warming herbal tea blend for cold and flu symptoms'
  }
];

export default function KoreanMedicineScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<KoreanProduct | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredMedicines = useMemo(() => {
    if (!koreanProducts || !Array.isArray(koreanProducts)) return [];
    if (!searchQuery) return koreanProducts;

    return koreanProducts.filter(medicine =>
      medicine.name_ko?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.name_en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (medicine.active_ingredients && medicine.active_ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    );
  }, [searchQuery]);

  const openDetail = (medicine: KoreanProduct) => {
    setSelectedMedicine(medicine);
    setModalVisible(true);
  };

  const closeDetail = () => {
    setSelectedMedicine(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Korean medicine name or symptoms..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#7f8c8d"
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {!filteredMedicines || filteredMedicines.length === 0 ? (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>
                {!filteredMedicines ? 'Loading medicines...' : `No medicines found matching "${searchQuery}"`}
              </Text>
            </View>
          ) : (
            filteredMedicines.map((medicine) => (
              <TouchableOpacity
                key={medicine.id}
                style={styles.medicineCard}
                onPress={() => openDetail(medicine)}
              >
                <View style={styles.medicineHeader}>
                  <Text style={styles.koreanName}>{medicine.name_ko}</Text>
                  <Text style={styles.englishName}>{medicine.name_en}</Text>
                </View>

                <Text style={styles.category}>{medicine.category}</Text>

                <View style={styles.usesContainer}>
                  <Text style={styles.usesLabel}>Active Ingredients:</Text>
                  <Text style={styles.uses}>
                    {medicine.active_ingredients.slice(0, 3).join(', ')}
                    {medicine.active_ingredients.length > 3 ? '...' : ''}
                  </Text>
                </View>

                <Text style={styles.alternativesPreview}>
                  {medicine.us_alternatives.length} US alternative{medicine.us_alternatives.length !== 1 ? 's' : ''} available
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeDetail}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeDetail} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕ Close</Text>
            </TouchableOpacity>
          </View>

          {selectedMedicine && (
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalKoreanName}>{selectedMedicine.name_ko}</Text>
              <Text style={styles.modalEnglishName}>{selectedMedicine.name_en}</Text>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Active Ingredients</Text>
                <Text style={styles.modalDescription}>
                  {selectedMedicine.active_ingredients.join(', ')}
                </Text>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>US Availability</Text>
                <Text style={styles.modalDescription}>{selectedMedicine.us_status.note}</Text>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>US Alternatives</Text>
                {selectedMedicine.us_alternatives.map((alternative, index) => (
                  <View key={index} style={styles.alternativeCard}>
                    <View style={styles.alternativeHeader}>
                      <Text style={styles.alternativeName}>{alternative.brands.join(', ')}</Text>
                    </View>
                    <Text style={styles.activeIngredient}>Active: {alternative.active_ingredients.join(', ')}</Text>
                    <Text style={styles.priceRange}>💰 Price: {alternative.price_range}</Text>
                    {alternative.rx_required && (
                      <Text style={styles.prescription}>🏥 Prescription Required</Text>
                    )}
                  </View>
                ))}
              </View>

              {selectedMedicine.cautions.length > 0 && (
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>⚠️ Cautions</Text>
                  {selectedMedicine.cautions.map((caution, index) => (
                    <Text key={index} style={styles.modalWarning}>• {caution}</Text>
                  ))}
                </View>
              )}

              <View style={styles.modalDisclaimer}>
                <Text style={styles.modalDisclaimerText}>
                  This information is for educational purposes only. Always consult with a healthcare provider
                  before switching medications or trying new treatments.
                </Text>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2c3e50',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  medicineCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicineHeader: {
    marginBottom: 8,
  },
  koreanName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  englishName: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  category: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
    marginBottom: 8,
  },
  usesContainer: {
    marginBottom: 8,
  },
  usesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34495e',
  },
  uses: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  alternativesPreview: {
    fontSize: 12,
    color: '#27ae60',
    fontWeight: '500',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalKoreanName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 4,
  },
  modalEnglishName: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  modalUse: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginBottom: 4,
  },
  alternativeCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  alternativeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alternativeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  similarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  similarityHigh: {
    backgroundColor: '#d5f4e6',
  },
  similarityMedium: {
    backgroundColor: '#fff3cd',
  },
  similarityLow: {
    backgroundColor: '#f8d7da',
  },
  similarityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#27ae60',
  },
  activeIngredient: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  alternativeNotes: {
    fontSize: 13,
    color: '#34495e',
    lineHeight: 18,
    marginBottom: 4,
  },
  priceRange: {
    fontSize: 12,
    color: '#27ae60',
    marginBottom: 4,
    fontWeight: '500',
  },
  prescription: {
    fontSize: 12,
    color: '#e74c3c',
    marginBottom: 4,
    fontWeight: '500',
  },
  differences: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 16,
    fontStyle: 'italic',
  },
  contraindication: {
    fontSize: 14,
    color: '#e74c3c',
    lineHeight: 20,
    marginBottom: 4,
    fontWeight: '500',
  },
  modalWarning: {
    fontSize: 14,
    color: '#e74c3c',
    lineHeight: 20,
    marginBottom: 4,
  },
  modalDisclaimer: {
    backgroundColor: '#fff3cd',
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  modalDisclaimerText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 16,
  },
});