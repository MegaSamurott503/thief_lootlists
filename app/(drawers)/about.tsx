import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  Text, View, ScrollView
} from 'react-native';
import { useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SectionHeader } from '@/components/sectionHeader';

import { myCredits } from '@/constants/credits';
import { SettingContext } from '@/constants/context';

/* **************** */
/*   ABOUT SCREEN   */
/* **************** */
// Screen for viewing changelog and credits.
// Contained in drawer navigator to separate from other screens.
export default function AboutScreen() {
  // Access safe area context insets.
  const insets = useSafeAreaInsets();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch global setting states from context.
  const {scheme, device,
    getCurrentTheme, setCurrentTheme} =
    useContext(SettingContext);

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <Text style={[
          styles.creditText, {color: colors.text}
        ]}>
          {(Platform.OS === 'web') ? `Site` : `App`}
          {` created by`}
        </Text>
        <Text style={[
          styles.creditText, styles.creditName,
          {color: colors.text}
        ]}>
          {`Kevin Kolpack (Grandmauden)`}
        </Text>

        <View style={[
          styles.credit,
          styles.creditCenter
        ]}>
          <Text style={[
            styles.creditText, {color: colors.text}
          ]}>
            {`This `}
            {(Platform.OS === 'web') ? `site` : `app`}
            {` is not affiliated with and is not supported by`}
          </Text>
          <Text style={[
            styles.creditText, {color: colors.text}
          ]}>
            {`Looking Glass Studios, Ion Storm, Nightdive Studios,`}
          </Text>
          <Text style={[
            styles.creditText, {color: colors.text}
          ]}>
            {`Eidos Montréal, Maze Theory,`}
          </Text>
          <Text style={[
            styles.creditText, {color: colors.text}
          ]}>
            {`Eidos Interactive, Square Enix, Vertigo Games,`}
          </Text>
          <Text style={[
            styles.creditText, {color: colors.text}
          ]}>
            {`or Embracer Group.`}
          </Text>
        </View>

        <View style={[
          styles.credit,
          styles.creditCenter
        ]}>
          <Text style={[
            styles.creditText, {color: colors.text}
          ]}>
            {`This `}
            {(Platform.OS === 'web') ? `site` : `app`}
            {` was not created using generative AI.`}
          </Text>
        </View>

        {/* API section */}
        <SectionHeader headerName="APIs Used"/>
        <View style={styles.credit}>
          {/* Map out each entry in API array. */}
          {myCredits.credits.api.map((apiKey, apiIndex) => (
            <View
              key={`api_${apiIndex}`}
              style={styles.creditCenter}
            >
              <Text style={[
                styles.creditText, styles.creditName,
                {color: colors.text}
              ]}>
                {`${apiKey.name}:`}
              </Text>
              <Text
                style={[
                  styles.url, {color: colors.url}
                ]}
                onPress={() => Linking.openURL(apiKey.link)}
              >
                {`${apiKey.link}`}
              </Text>
            </View>
          ))}
        </View>

        {/* Special Thanks section */}
        <SectionHeader headerName="Special Thanks"/>
        <View style={[
          styles.credit,
          styles.creditCenter
        ]}>
          {/* Map out each entry in special thanks array. */}
          {myCredits.credits.thanks.map((thankKey, thankIndex) => (
            <View key={`thank_${thankIndex}`}>
              <Text style={[
                styles.creditText, {color: colors.text}
              ]}>
                <Text style={styles.creditName}>
                  {`${thankKey.name}: `}
                </Text>
                {`${thankKey.reason}`}
              </Text>
            </View>
          ))}
        </View>

        {/* Changelog section */}
        <SectionHeader headerName="Changelog"/>
        <View>
          {/* Map out each entry in changelog array. */}
          {myCredits.credits.changelog.map((logKey, logIndex) => (
            <View key={`log_${logIndex}`}>
              <View style={[
                styles.changelog, styles.creditCenter
              ]}>
                <Text style={[
                  styles.creditText, styles.creditName,
                  {color: colors.text}
                ]}>
                  {`${logKey.version}`}
                </Text>
                <Text style={[
                  styles.creditText, {color: colors.text}
                ]}>
                  {`${logKey.date}`}
                </Text>
              </View>
              <View>
                {logKey.changes.map((changeKey, changeIndex) => (
                  <View key={`change_${changeIndex}`}>
                    <Text style={[
                      styles.creditText, {color: colors.text}
                    ]}>
                      {`• ${changeKey}`}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.creditCenter}>
                <Text style={[styles.changeLine, {color: colors.text}]}>
                  {(Platform.OS === 'web')
                    ? '                                                  '
                    : '                                        '
                  }
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  //credit: device => ({
  //  marginTop: (device !== 'phone') ? 12 : 10,
  //}),
  credit: {
    marginTop: (Platform.OS === 'web') ? 12 : 10,
  },
  creditCenter: {
    alignItems: 'center',
  },
  creditText: {
    fontSize: (Platform.OS === 'web') ? 14 : 12,
  },
  creditName: {
    fontWeight: 'bold',
  },
  changelog: {
    marginTop: (Platform.OS === 'web') ? 12 : 10,
    marginBottom: (Platform.OS === 'web') ? 8 : 6,
  },
  changeLine: {
    textDecorationLine: 'underline',
  },
  url: {
    fontSize: (Platform.OS === 'web') ? 14 : 11,
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
});
