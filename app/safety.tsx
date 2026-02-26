import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Linking, Alert } from 'react-native';

interface EmergencyContact {
  name: string;
  number: string;
  description: string;
}

interface SafetySection {
  title: string;
  icon: string;
  content: string[];
  severity: 'emergency' | 'urgent' | 'caution';
}

const emergencyContacts: EmergencyContact[] = [
  {
    name: 'Emergency (911)',
    number: '911',
    description: 'Life-threatening emergencies'
  },
  {
    name: 'Poison Control',
    number: '1-800-222-1222',
    description: 'Medication overdose or poisoning'
  },
  {
    name: 'Nurse Hotline',
    number: '1-800-NURSES',
    description: '24/7 health advice from registered nurses'
  }
];

const safetySections: SafetySection[] = [
  {
    title: 'Call 911 Immediately',
    icon: '🚨',
    severity: 'emergency',
    content: [
      'Difficulty breathing or shortness of breath',
      'Chest pain or pressure',
      'Severe allergic reaction (swelling, difficulty swallowing)',
      'Loss of consciousness',
      'Severe head injury',
      'Signs of stroke (face drooping, arm weakness, speech difficulty)',
      'Severe bleeding that won\'t stop',
      'Signs of heart attack',
      'Severe burns covering large areas',
      'Overdose or poisoning'
    ]
  },
  {
    title: 'Seek Medical Care Within 24 Hours',
    icon: '⚠️',
    severity: 'urgent',
    content: [
      'High fever (over 103°F/39.4°C)',
      'Severe persistent headache',
      'Persistent vomiting',
      'Signs of dehydration',
      'Difficulty urinating or blood in urine',
      'Severe abdominal pain',
      'Persistent diarrhea (more than 3 days)',
      'Unusual rash that spreads quickly',
      'Eye injury or sudden vision changes',
      'Suspected broken bone'
    ]
  },
  {
    title: 'Monitor and Consider Medical Care',
    icon: '⚡',
    severity: 'caution',
    content: [
      'Fever lasting more than 3 days',
      'Persistent cough with green/yellow mucus',
      'Symptoms getting worse instead of better',
      'New or unusual symptoms',
      'Medication not providing relief after proper use',
      'Concerns about medication interactions',
      'Symptoms affecting daily activities',
      'Any symptom that worries you'
    ]
  }
];

const medicationSafetyTips = [
  'Always read and follow the label instructions exactly',
  'Do not exceed the recommended dose',
  'Check expiration dates before taking any medication',
  'Be aware of potential allergic reactions',
  'Keep a list of all medications you are taking',
  'Store medications in a cool, dry place',
  'Never share prescription medications',
  'Ask your pharmacist about drug interactions',
  'Keep medications away from children',
  'Dispose of expired medications properly'
];

export default function SafetyScreen() {
  const callEmergency = (number: string) => {
    Alert.alert(
      'Emergency Call',
      `Call ${number}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${number}`);
          }
        }
      ]
    );
  };

  const getSeverityStyle = (severity: SafetySection['severity']) => {
    switch (severity) {
      case 'emergency':
        return styles.emergencySection;
      case 'urgent':
        return styles.urgentSection;
      case 'caution':
        return styles.cautionSection;
    }
  };

  const getSeverityTextStyle = (severity: SafetySection['severity']) => {
    switch (severity) {
      case 'emergency':
        return styles.emergencyText;
      case 'urgent':
        return styles.urgentText;
      case 'caution':
        return styles.cautionText;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Safety Information</Text>
          <Text style={styles.subtitle}>Know when to seek professional medical help</Text>

          <View style={styles.emergencyContactsContainer}>
            <Text style={styles.sectionTitle}>Emergency Contacts</Text>
            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={styles.emergencyContactCard}
                onPress={() => callEmergency(contact.number)}
              >
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactNumber}>{contact.number}</Text>
                </View>
                <Text style={styles.contactDescription}>{contact.description}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {safetySections.map((section, index) => (
            <View key={index} style={[styles.safetySection, getSeverityStyle(section.severity)]}>
              <Text style={[styles.safetySectionTitle, getSeverityTextStyle(section.severity)]}>
                {section.icon} {section.title}
              </Text>
              {section.content.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.safetyItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.safetyItemText}>{item}</Text>
                </View>
              ))}
            </View>
          ))}

          <View style={styles.medicationSafetyContainer}>
            <Text style={styles.sectionTitle}>💊 Medication Safety Tips</Text>
            {medicationSafetyTips.map((tip, index) => (
              <View key={index} style={styles.safetyItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.safetyItemText}>{tip}</Text>
              </View>
            ))}
          </View>

          <View style={styles.specialNotices}>
            <View style={styles.specialNotice}>
              <Text style={styles.specialNoticeTitle}>🤰 Pregnancy & Breastfeeding</Text>
              <Text style={styles.specialNoticeText}>
                Always consult with your healthcare provider before taking any medication during pregnancy or while breastfeeding.
                Many over-the-counter medications can affect pregnancy or pass into breast milk.
              </Text>
            </View>

            <View style={styles.specialNotice}>
              <Text style={styles.specialNoticeTitle}>👶 Children & Medications</Text>
              <Text style={styles.specialNoticeText}>
                Use only medications specifically approved for children. Always use the dosing device that comes with the medication.
                Never give aspirin to children under 18 years old due to risk of Reye's syndrome.
              </Text>
            </View>

            <View style={styles.specialNotice}>
              <Text style={styles.specialNoticeTitle}>👴 Seniors & Medications</Text>
              <Text style={styles.specialNoticeText}>
                Older adults may be more sensitive to medications and may need lower doses.
                Always check with a healthcare provider before starting new medications.
              </Text>
            </View>
          </View>

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerTitle}>Important Legal Disclaimer</Text>
            <Text style={styles.disclaimerText}>
              This app provides general health information only and is not intended to replace professional medical advice, diagnosis, or treatment.
              The information provided should not be used for diagnosing or treating a health problem or disease.
              Always consult with qualified healthcare providers regarding medical conditions and before making any changes to your healthcare regimen.
              In case of emergency, always call 911 or your local emergency services.
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 16,
  },
  emergencyContactsContainer: {
    marginBottom: 24,
  },
  emergencyContactCard: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#d32f2f',
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  contactDescription: {
    fontSize: 14,
    color: '#d32f2f',
  },
  safetySection: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  emergencySection: {
    backgroundColor: '#ffebee',
    borderLeftColor: '#f44336',
  },
  urgentSection: {
    backgroundColor: '#fff3e0',
    borderLeftColor: '#ff9800',
  },
  cautionSection: {
    backgroundColor: '#f3e5f5',
    borderLeftColor: '#9c27b0',
  },
  safetySectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emergencyText: {
    color: '#d32f2f',
  },
  urgentText: {
    color: '#ef6c00',
  },
  cautionText: {
    color: '#7b1fa2',
  },
  safetyItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 14,
    color: '#34495e',
    marginRight: 8,
    marginTop: 2,
  },
  safetyItemText: {
    fontSize: 14,
    color: '#34495e',
    flex: 1,
    lineHeight: 20,
  },
  medicationSafetyContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  specialNotices: {
    marginBottom: 24,
  },
  specialNotice: {
    backgroundColor: '#e8f5e8',
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  specialNoticeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 8,
  },
  specialNoticeText: {
    fontSize: 13,
    color: '#2e7d32',
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