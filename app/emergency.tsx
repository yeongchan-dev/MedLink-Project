import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Linking, Alert } from 'react-native';

const emergencyData = require('../data/emergency_guide.json').emergency_guide;

export default function EmergencyScreen() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

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

  const renderBurnsSection = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>🔥 Burns Treatment Guide</Text>

      <View style={styles.burnTypeCard}>
        <Text style={styles.burnTypeTitle}>1st Degree Burns</Text>
        <Text style={styles.burnDescription}>{emergencyData.burns.first_degree.description}</Text>
        <Text style={styles.treatmentTitle}>Treatment:</Text>
        {emergencyData.burns.first_degree.treatment.map((step: string, index: number) => (
          <Text key={index} style={styles.treatmentStep}>• {step}</Text>
        ))}
        <Text style={styles.healingTime}>Healing time: {emergencyData.burns.first_degree.healing_time}</Text>
      </View>

      <View style={styles.burnTypeCard}>
        <Text style={styles.burnTypeTitle}>2nd Degree Burns</Text>
        <Text style={styles.burnDescription}>{emergencyData.burns.second_degree.description}</Text>
        <Text style={styles.treatmentTitle}>Treatment:</Text>
        {emergencyData.burns.second_degree.treatment.map((step: string, index: number) => (
          <Text key={index} style={styles.treatmentStep}>• {step}</Text>
        ))}
        <Text style={styles.warningText}>⚠️ What NOT to do:</Text>
        {emergencyData.burns.second_degree.what_not_to_do.map((item: string, index: number) => (
          <Text key={index} style={styles.warningStep}>• {item}</Text>
        ))}
        <Text style={styles.healingTime}>Healing time: {emergencyData.burns.second_degree.healing_time}</Text>
      </View>

      <View style={[styles.burnTypeCard, styles.emergencyCard]}>
        <Text style={styles.burnTypeTitle}>3rd Degree Burns</Text>
        <Text style={styles.burnDescription}>{emergencyData.burns.third_degree.description}</Text>
        <Text style={styles.emergencyTreatment}>🚨 {emergencyData.burns.third_degree.treatment}</Text>
        <Text style={styles.treatmentTitle}>Immediate Care:</Text>
        {emergencyData.burns.third_degree.immediate_care.map((step: string, index: number) => (
          <Text key={index} style={styles.emergencyStep}>• {step}</Text>
        ))}
      </View>

      <View style={styles.whenToSeekHelpCard}>
        <Text style={styles.whenToSeekTitle}>🏥 When to Seek Medical Help:</Text>
        {emergencyData.burns.when_to_seek_medical_help.map((item: string, index: number) => (
          <Text key={index} style={styles.seekHelpItem}>• {item}</Text>
        ))}
      </View>
    </View>
  );

  const renderCutsSection = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>🩹 Cuts & Wound Care</Text>

      <Text style={styles.stepsTitle}>First Aid Steps:</Text>

      {Object.entries(emergencyData.cuts_and_wounds.first_aid_steps).map(([key, step]: [string, any]) => (
        <View key={key} style={styles.stepCard}>
          <Text style={styles.stepNumber}>Step {step.step}</Text>
          <Text style={styles.stepAction}>{step.action}</Text>
          {step.instructions.map((instruction: string, index: number) => (
            <Text key={index} style={styles.stepInstruction}>• {instruction}</Text>
          ))}
        </View>
      ))}

      <View style={styles.followUpCard}>
        <Text style={styles.followUpTitle}>📅 Follow-up Care</Text>
        <Text style={styles.followUpSubtitle}>Daily care:</Text>
        {emergencyData.cuts_and_wounds.follow_up_care.daily_care.map((item: string, index: number) => (
          <Text key={index} style={styles.followUpItem}>• {item}</Text>
        ))}

        <Text style={styles.followUpSubtitle}>🚩 Signs of infection:</Text>
        {emergencyData.cuts_and_wounds.follow_up_care.signs_of_infection.map((item: string, index: number) => (
          <Text key={index} style={styles.infectionSign}>• {item}</Text>
        ))}
      </View>

      <View style={styles.whenToSeekHelpCard}>
        <Text style={styles.whenToSeekTitle}>🏥 When to Seek Medical Help:</Text>
        {emergencyData.cuts_and_wounds.when_to_seek_medical_help.map((item: string, index: number) => (
          <Text key={index} style={styles.seekHelpItem}>• {item}</Text>
        ))}
      </View>

      <View style={styles.doNotCard}>
        <Text style={styles.doNotTitle}>❌ What NOT to do:</Text>
        {emergencyData.cuts_and_wounds.what_not_to_do.map((item: string, index: number) => (
          <Text key={index} style={styles.doNotItem}>• {item}</Text>
        ))}
      </View>
    </View>
  );

  const renderEmergencyContactsSection = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>📞 Emergency Contacts</Text>

      <TouchableOpacity
        style={[styles.contactCard, styles.immediateEmergencyCard]}
        onPress={() => callEmergency('911')}
      >
        <Text style={styles.contactNumber}>911</Text>
        <Text style={styles.contactName}>Emergency Services</Text>
        <Text style={styles.contactDescription}>Life-threatening emergencies</Text>
        <Text style={styles.whenToCallTitle}>When to call:</Text>
        {emergencyData.emergency_contacts.immediate_emergency.when_to_call.slice(0, 4).map((item: string, index: number) => (
          <Text key={index} style={styles.whenToCallItem}>• {item}</Text>
        ))}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contactCard}
        onPress={() => callEmergency('1-800-222-1222')}
      >
        <Text style={styles.contactNumber}>{emergencyData.emergency_contacts.poison_control.number}</Text>
        <Text style={styles.contactName}>Poison Control</Text>
        <Text style={styles.contactDescription}>24/7 poison and overdose help</Text>
        <Text style={styles.whenToCallTitle}>When to call:</Text>
        {emergencyData.emergency_contacts.poison_control.when_to_call.map((item: string, index: number) => (
          <Text key={index} style={styles.whenToCallItem}>• {item}</Text>
        ))}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contactCard}
        onPress={() => callEmergency('1-800-686-7737')}
      >
        <Text style={styles.contactNumber}>{emergencyData.emergency_contacts.nurse_hotline.number}</Text>
        <Text style={styles.contactName}>Nurse Hotline</Text>
        <Text style={styles.contactDescription}>24/7 health advice from registered nurses</Text>
        <Text style={styles.whenToCallTitle}>When to call:</Text>
        {emergencyData.emergency_contacts.nurse_hotline.when_to_call.map((item: string, index: number) => (
          <Text key={index} style={styles.whenToCallItem}>• {item}</Text>
        ))}
      </TouchableOpacity>
    </View>
  );

  const renderEmergencySignsSection = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>🚨 Emergency Warning Signs</Text>

      <View style={styles.emergencySignCard}>
        <Text style={styles.emergencySignTitle}>💔 Heart Attack</Text>
        <Text style={styles.emergencySignSubtitle}>Signs:</Text>
        {emergencyData.emergency_situations.heart_attack.signs.map((sign: string, index: number) => (
          <Text key={index} style={styles.emergencySignItem}>• {sign}</Text>
        ))}
        <Text style={styles.emergencySignSubtitle}>Immediate Action:</Text>
        {emergencyData.emergency_situations.heart_attack.immediate_action.slice(0, 3).map((action: string, index: number) => (
          <Text key={index} style={styles.emergencyActionItem}>• {action}</Text>
        ))}
      </View>

      <View style={styles.emergencySignCard}>
        <Text style={styles.emergencySignTitle}>🧠 Stroke (F.A.S.T.)</Text>
        <Text style={styles.fastTitle}>F.A.S.T. Test:</Text>
        <Text style={styles.fastItem}>👤 Face: Smile appears uneven</Text>
        <Text style={styles.fastItem}>💪 Arms: Can't raise both arms</Text>
        <Text style={styles.fastItem}>🗣️ Speech: Slurred or strange words</Text>
        <Text style={styles.fastItem}>⏰ Time: Call 911 immediately</Text>
      </View>

      <View style={styles.emergencySignCard}>
        <Text style={styles.emergencySignTitle}>🫁 Severe Allergic Reaction</Text>
        <Text style={styles.emergencySignSubtitle}>Signs:</Text>
        {emergencyData.emergency_situations.severe_allergic_reaction.signs.map((sign: string, index: number) => (
          <Text key={index} style={styles.emergencySignItem}>• {sign}</Text>
        ))}
        <Text style={styles.emergencyActionTitle}>🚨 Action: Call 911 + Use EpiPen if available</Text>
      </View>

      <View style={styles.emergencySignCard}>
        <Text style={styles.emergencySignTitle}>💊 Medication Overdose</Text>
        <Text style={styles.emergencySignSubtitle}>Signs:</Text>
        {emergencyData.medication_emergencies.overdose.signs.map((sign: string, index: number) => (
          <Text key={index} style={styles.emergencySignItem}>• {sign}</Text>
        ))}
        <Text style={styles.emergencyActionTitle}>🚨 Action: Call 911 or Poison Control: 1-800-222-1222</Text>
      </View>
    </View>
  );

  const sectionButtons = [
    { key: 'burns', title: '🔥 Burns Treatment', icon: '🔥' },
    { key: 'cuts', title: '🩹 Cuts & Wounds', icon: '🩹' },
    { key: 'contacts', title: '📞 Emergency Contacts', icon: '📞' },
    { key: 'signs', title: '🚨 Emergency Signs', icon: '🚨' },
  ];

  if (selectedSection) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedSection(null)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {selectedSection === 'burns' && renderBurnsSection()}
          {selectedSection === 'cuts' && renderCutsSection()}
          {selectedSection === 'contacts' && renderEmergencyContactsSection()}
          {selectedSection === 'signs' && renderEmergencySignsSection()}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Emergency & First Aid Guide</Text>
          <Text style={styles.subtitle}>Essential emergency information and first aid procedures</Text>

          <View style={styles.emergencyBanner}>
            <Text style={styles.emergencyBannerTitle}>🚨 LIFE-THREATENING EMERGENCY</Text>
            <Text style={styles.emergencyBannerText}>Call 911 immediately</Text>
            <TouchableOpacity
              style={styles.call911Button}
              onPress={() => callEmergency('911')}
            >
              <Text style={styles.call911Text}>CALL 911</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionsContainer}>
            {sectionButtons.map((section) => (
              <TouchableOpacity
                key={section.key}
                style={styles.sectionButton}
                onPress={() => setSelectedSection(section.key)}
              >
                <Text style={styles.sectionIcon}>{section.icon}</Text>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerTitle}>⚠️ Important Disclaimer</Text>
            <Text style={styles.disclaimerText}>
              This guide provides general first aid information for educational purposes only.
              It is not a substitute for professional medical training or emergency medical services.
              In any serious emergency, always call 911 first.
              Consider taking a certified first aid course for proper training.
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
  emergencyBanner: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  emergencyBannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 8,
  },
  emergencyBannerText: {
    fontSize: 14,
    color: '#d32f2f',
    marginBottom: 12,
  },
  call911Button: {
    backgroundColor: '#f44336',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  call911Text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  sectionButton: {
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
  sectionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  sectionArrow: {
    fontSize: 18,
    color: '#3498db',
    fontWeight: 'bold',
  },
  sectionContent: {
    padding: 20,
  },
  burnTypeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyCard: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  burnTypeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  burnDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  treatmentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27ae60',
    marginBottom: 8,
  },
  treatmentStep: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 4,
    paddingLeft: 8,
  },
  warningText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e74c3c',
    marginTop: 8,
    marginBottom: 8,
  },
  warningStep: {
    fontSize: 14,
    color: '#e74c3c',
    marginBottom: 4,
    paddingLeft: 8,
  },
  emergencyTreatment: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f44336',
    marginBottom: 12,
    textAlign: 'center',
  },
  emergencyStep: {
    fontSize: 14,
    color: '#d32f2f',
    marginBottom: 4,
    paddingLeft: 8,
  },
  healingTime: {
    fontSize: 12,
    color: '#3498db',
    fontStyle: 'italic',
    marginTop: 8,
  },
  whenToSeekHelpCard: {
    backgroundColor: '#fff3cd',
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  whenToSeekTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 12,
  },
  seekHelpItem: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 6,
    paddingLeft: 8,
  },
  stepCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 4,
  },
  stepAction: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  stepInstruction: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 4,
    paddingLeft: 8,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  followUpCard: {
    backgroundColor: '#e8f5e8',
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  followUpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 12,
  },
  followUpSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d5330',
    marginTop: 8,
    marginBottom: 8,
  },
  followUpItem: {
    fontSize: 14,
    color: '#2d5330',
    marginBottom: 4,
    paddingLeft: 8,
  },
  infectionSign: {
    fontSize: 14,
    color: '#d32f2f',
    marginBottom: 4,
    paddingLeft: 8,
  },
  doNotCard: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
    borderRadius: 8,
    padding: 16,
  },
  doNotTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 12,
  },
  doNotItem: {
    fontSize: 14,
    color: '#d32f2f',
    marginBottom: 4,
    paddingLeft: 8,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  immediateEmergencyCard: {
    backgroundColor: '#ffebee',
    borderWidth: 2,
    borderColor: '#f44336',
  },
  contactNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
    textAlign: 'center',
  },
  whenToCallTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  whenToCallItem: {
    fontSize: 12,
    color: '#34495e',
    marginBottom: 2,
    alignSelf: 'flex-start',
  },
  emergencySignCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  emergencySignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  emergencySignSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 6,
  },
  emergencySignItem: {
    fontSize: 13,
    color: '#2c3e50',
    marginBottom: 4,
    paddingLeft: 8,
  },
  emergencyActionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginTop: 8,
  },
  emergencyActionItem: {
    fontSize: 13,
    color: '#e74c3c',
    marginBottom: 4,
    paddingLeft: 8,
  },
  fastTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  fastItem: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 6,
    paddingLeft: 8,
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