import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {
  StyleSheet, Platform,
  Image, Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useContext } from 'react';

import { stylesArrow } from '@/constants/stylesArrow';
import { myList } from '@/constants/jsonLists';
import { arrowLight, arrowDark } from '@/constants/imgUI';
import { SettingContext } from '@/constants/context';

/* **************** */
/*    ARROWS VIEW   */
/* **************** */
// Custom view component with buttons to go to previous/next missions.
export function ArrowsView(props) {
  // Use the identifier to decide which mission screen to return to.
  function backSwitch(pageID) {
    switch(pageID) {
      case 't1':
        return '/select/thief1';
      case 't2':
        return '/select/thief2';
      case 'fm':
        return '/select/thiefFM';
      default:
        return '/select';
    }
  }

  // Access the router object.
  const router = useRouter();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch global setting states from context.
  const {scheme,
    getCurrentTheme, setCurrentTheme} =
  useContext(SettingContext);

  return (
    <View style={styles.goToView}>
      {/* Empty space if no previous mission. */}
      {!props.goToPrev &&
        <View style={styles.goPrevBlank}></View>
      }
      {/* Previous mission button. */}
      {props.goToPrev &&
        <TouchableOpacity
          style={styles.goToArrow}
          // Set the lootlist screen with another mission.
          onPress={() => router.navigate(
            '/list/' + props.goToPrev)}
        >
          <Image
            source={(getCurrentTheme === 'dark' ||
              (getCurrentTheme === 'default' && scheme === 'dark'))
              ? arrowDark : arrowLight}
            //source={arrowLight}
            style={[
              stylesArrow.arrowLeft,
              stylesArrow.arrowGoTo
            ]}
          />
          <View
            style={[
              styles.goToButton,
              styles.goPrevButton,
              {backgroundColor: colors.backLight,
              borderColor: colors.border}
            ]}
          >
            <Text style={[
              styles.goPrevText,
              {color: colors.text}
            ]}>
              {`Previous\nMission`}
              {/*{props.goToPrev}*/}
            </Text>
          </View>
        </TouchableOpacity>
      }
      {/* Back to mission selection button. */}
      <TouchableOpacity
        style={[
          styles.goToButton,
          styles.goPrevButton,
          styles.goNextButton,
          {backgroundColor: colors.backLight,
          borderColor: colors.border}
        ]}
        onPress={() => router.navigate(backSwitch(props.pageID))}
      >
        <Text style={[
          styles.goBackText,
          {color: colors.text}
        ]}>
          {`Select\nMission`}
        </Text>
      </TouchableOpacity>
      {/* Empty space if no next mission. */}
      {!props.goToNext &&
        <View style={styles.goNextBlank}></View>
      }
      {/* Next mission button. */}
      {props.goToNext &&
        <TouchableOpacity
          style={styles.goToArrow}
          // Set the lootlist screen with another mission.
          // Also, carry over the current loot total.
          onPress={() => router.navigate(
            '/list/' + props.goToNext,
            { carryingLoot: props.accumLoot }
          )}
        >
          <View
            style={[
              styles.goToButton,
              styles.goNextButton,
              {backgroundColor: colors.backLight,
              borderColor: colors.border}
            ]}
          >
            <Text style={[
              styles.goNextText,
              {color: colors.text}
            ]}>
              {`Next\nMission`}
              {/*{props.goToNext}*/}
            </Text>
          </View>
          <Image
            source={(getCurrentTheme === 'dark' ||
              (getCurrentTheme === 'default' && scheme === 'dark'))
              ? arrowDark : arrowLight}
            //source={arrowLight}
            style={[
              stylesArrow.arrowRight,
              stylesArrow.arrowGoTo
            ]}
          />
        </TouchableOpacity>
      }
    </View>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  goToView: {
    flexDirection: 'row',
    columnGap: (Platform.OS === 'web') ? 120 : 60,
  },
  goToArrow: {
    flexDirection: 'row',
  },
  goToButton: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: (Platform.OS === 'web') ? 10 : 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    width: (Platform.OS === 'web') ? 65 : 55,
  },
  goPrevButton: {
    borderRightWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  goPrevBlank: {
    marginVertical: (Platform.OS === 'web') ? 10 : 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    width: (Platform.OS === 'web') ? 85 : 72,
  },
  goPrevText: {
    fontSize: (Platform.OS === 'web') ? 13 : 10,
    textAlign: 'left',
  },
  goNextButton: {
    borderLeftWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  goNextBlank: {
    marginVertical: (Platform.OS === 'web') ? 10 : 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    width: (Platform.OS === 'web') ? 85 : 72,
  },
  goNextText: {
    fontSize: (Platform.OS === 'web') ? 13 : 10,
    textAlign: 'right',
  },
  goBackText: {
    fontSize: (Platform.OS === 'web') ? 13 : 10,
    textAlign: 'center',
  },
});
