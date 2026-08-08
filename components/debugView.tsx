import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  Text, View,
  useWindowDimensions
} from 'react-native';
import { useContext } from 'react';

import { SectionHeader } from '@/components/sectionHeader';

import { SettingContext } from '@/constants/context';

/* **************** */
/*  DEBUGGER VIEW   */
/* **************** */
// Custom view component to show information to help with testing.
export function DebugView(props) {

  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch global setting states from context.
  const {scheme, device,
    getCurrentTheme, setCurrentTheme} =
  useContext(SettingContext);

  return (
    <View>
      <SectionHeader headerName="Debug Info"/>

      <Text style={[styles.debugText, {color: colors.text}]}>
        {`Device type: ${device}`}
      </Text>
      <Text style={[styles.debugText, {color: colors.text}]}>
        {`Device color mode: ${scheme}`}
      </Text>
      <Text style={[styles.debugText, {color: colors.text}]}>
        {`Color mode setting: ${getCurrentTheme}`}
      </Text>
      <Text style={[styles.debugText, {color: colors.text}]}>
        {`Screen width: ${width}`}
      </Text>
    </View>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  debugText: {
    fontSize: (Platform.OS === 'web') ? 14 : 12,
    marginTop: 3,
  },
});
