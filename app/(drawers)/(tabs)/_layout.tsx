import { ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import {
  StyleSheet, Platform,
  Image, useColorScheme
} from 'react-native';
import { useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  iconTDP, iconTDPFaded,
  iconTMA, iconTMAFaded,
  //iconTDS, iconTDSFaded,
  iconFM, iconFMFaded
} from '@/constants/imgUI';
import { MyLightTheme, MyDarkTheme } from '@/constants/themeColors';
import { SettingContext } from '@/constants/context';

/* **************** */
/*  MISSION SCREEN  */
/* **************** */
// Screen with nested tab navigator.
// Contained in drawer navigator to separate from other screens.
// Tabs won't appear in other drawer screens.
export default function TabLayout() {
  // Get the system's default color scheme.
  const scheme = useColorScheme();

  // Fetch global setting states from context.
  const {device,
    getCurrentTheme, setCurrentTheme} = useContext(SettingContext);

  return (
    // Wrap app root in 'ThemeProvider' to use light/dark themes.
    <ThemeProvider
      value={getCurrentTheme === 'default' && scheme === 'dark'
        ? MyDarkTheme
        : getCurrentTheme === 'dark'
          ? MyDarkTheme
          : MyLightTheme}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: (Platform.OS === 'web') ? 50 : 90
          }
          //tabBarButton: HapticTab,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name = {focused
                  ? 'information-circle' : 'information-circle-outline'}
                size={(Platform.OS === 'web') ? 30 : 30}
              />
            ),
            //tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="select/thief1"
          options={{
            title: 'TDP',
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused
                  ? iconTDP : iconTDPFaded}
                style={styles.imgTabIcon}
              />
            ),
            //tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="select/thief2"
          options={{
            title: 'TMA',
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused
                  ? iconTMA : iconTMAFaded}
                style={styles.imgTabIcon}
              />
            ),
            //tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="select/thiefFM"
          options={{
            title: 'FMs',
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused
                  ? iconFM : iconFMFaded}
                style={styles.imgTabIcon}
              />
            ),
            //tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  imgTabIcon: {
    width: (Platform.OS === 'web') ? 24 : 24,
    height: (Platform.OS === 'web') ? 24 : 24,
  },
});
