import { Tabs } from 'expo-router';
import {
  StyleSheet, Platform,
  Image
} from 'react-native';
import { useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  iconTDP, iconTDPFaded,
  iconTMA, iconTMAFaded,
  //iconTDS, iconTDSFaded,
  iconFM, iconFMFaded
} from '@/constants/imgUI';
import { SettingContext } from '@/constants/context';

/* **************** */
/*  MISSION SCREEN  */
/* **************** */
// Screen with nested tab navigator.
// Contained in drawer navigator to separate from other screens.
// Tabs won't appear in other drawer screens.
export default function TabLayout() {
  //const colorScheme = useColorScheme();

  // Fetch global setting states from context.
  const { device } = useContext(SettingContext);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: (device !== 'phone') ? 50 : 90
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
              size={(device !== 'phone') ? 30 : 30}
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
              style={styles.imgTabIcon(device)}
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
              style={styles.imgTabIcon(device)}
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
              style={styles.imgTabIcon(device)}
            />
          ),
          //tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  imgTabIcon: device => ({
    width: (device !== 'phone') ? 24 : 24,
    height: (device !== 'phone') ? 24 : 24,
  }),
});
