import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="symptoms" options={{ title: 'Find by Symptoms' }} />
        <Stack.Screen name="results" options={{ title: 'Results' }} />
        <Stack.Screen name="korean-medicine" options={{ title: 'Korean Medicine' }} />
        <Stack.Screen name="safety" options={{ title: 'Safety Information' }} />
        <Stack.Screen name="emergency" options={{ title: 'Emergency & First Aid' }} />
        <Stack.Screen name="drug-interactions" options={{ title: 'Drug Interactions' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
