import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {
  StyleSheet, Platform,
  Image, Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  useWindowDimensions
} from 'react-native';
import { useState, useContext } from 'react';

import { stylesArrow } from '@/constants/stylesArrow';
import { myList } from '@/constants/jsonLists';
import { arrowLight, arrowDark } from '@/constants/imgUI';
import { SettingContext, FoundContext } from '@/constants/context';

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

  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch accumLoot state from context.
  const {accumLoot} = useContext(FoundContext);

  // Fetch global setting states from context.
  const {scheme, device,
    getCurrentTheme, setCurrentTheme} =
  useContext(SettingContext);

  // Clicked: checks if the button has been clicked.
  // Used to display the loading wheel.
  const [getPrevClicked, setPrevClicked] = useState(false);
  const [getNextClicked, setNextClicked] = useState(false);

  return (
    <View style={styles.goToView(device)}>
      {/* Empty space if no previous mission. */}
      {!props.goToPrev &&
        <View style={styles.goPrevBlank(device)}>
        </View>
      }
      {/* Previous mission button. */}
      {props.goToPrev &&
        <TouchableOpacity
          style={styles.goToArrow}
          // Set the lootlist screen with another mission.
          onPress={() => {
            setPrevClicked(true);
            // Add a slight delay so loading wheel appears
            // before proceeding to load the lootlist screen.
            setTimeout(() => {
              // Turn loading wheel off.
              setPrevClicked(false);
              // Pass mission's name as a parameter to lootlist screen.
              router.navigate(
                '/list/' + props.goToPrev
              );
            }, 10);
          }}
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
              styles.goToButton(device),
              styles.goPrevButton,
              {backgroundColor: colors.backLight,
              borderColor: colors.border}
            ]}
          >
            {/* Show the loading wheel when the button is clicked. */}
            {getPrevClicked &&
              <View style={styles.centerWheel}>
                <ActivityIndicator
                  size='small'
                  color='yellow'
                />
              </View>
            }
            {/* Show the text when the button is not clicked. */}
            {!getPrevClicked &&
              <Text style={[
                styles.goPrevText(device), {color: colors.text}
              ]}>
                {`Previous\nMission`}
                {/*{props.goToPrev}*/}
              </Text>
            }
          </View>
        </TouchableOpacity>
      }
      {/* Back to mission selection button. */}
      <TouchableOpacity
        style={[
          styles.goToButton(device),
          styles.goPrevButton,
          styles.goNextButton,
          {backgroundColor: colors.backLight,
          borderColor: colors.border}
        ]}
        onPress={() => router.navigate(backSwitch(props.pageID))}
      >
        <Text style={[
          styles.goBackText(device), {color: colors.text}
        ]}>
          {`Select\nMission`}
        </Text>
      </TouchableOpacity>
      {/* Empty space if no next mission. */}
      {!props.goToNext &&
        <View style={styles.goPrevBlank(device)}>
        </View>
      }
      {/* Next mission button. */}
      {props.goToNext &&
        <TouchableOpacity
          style={styles.goToArrow}
          // Set the lootlist screen with another mission.
          // Also, carry over the current loot total.
          onPress={() => {
            setNextClicked(true);
            // Add a slight delay so loading wheel appears
            // before proceeding to load the lootlist screen.
            setTimeout(() => {
              // Turn loading wheel off.
              setNextClicked(false);
              // Pass mission's name as a parameter to lootlist screen.
              // Also pass carryover loot as a parameter to next mission.
              router.navigate({
                pathname: '/list/' + props.goToNext,
                params: { carryingLoot: accumLoot.current[2][4] }
              });
            }, 10);
          }}
        >
          <View
            style={[
              styles.goToButton(device),
              styles.goNextButton,
              {backgroundColor: colors.backLight,
              borderColor: colors.border}
            ]}
          >
            {/* Show the loading wheel when the button is clicked. */}
            {getNextClicked &&
              <View style={styles.centerWheel}>
                <ActivityIndicator
                  size='small'
                  color='yellow'
                />
              </View>
            }
            {/* Show the text when the button is not clicked. */}
            {!getNextClicked &&
              <Text style={[
                styles.goNextText(device), {color: colors.text}
              ]}>
                {`Next\nMission`}
                {/*{props.goToNext}*/}
              </Text>
            }
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
  goToView: device => ({
    flexDirection: 'row',
    columnGap: (device !== 'phone') ? 120 : 60
  }),
  goToArrow: {
    flexDirection: 'row',
  },
  goToButton: device => ({
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: (device !== 'phone') ? 10 : 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    width: (device !== 'phone') ? 65 : 55
  }),
  goPrevButton: {
    borderRightWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  goPrevBlank: device => ({
    marginVertical: (device !== 'phone') ? 10 : 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    width: (device !== 'phone') ? 85 : 72
  }),
  goPrevText: device => ({
    fontSize: (device !== 'phone') ? 13 : 10,
    textAlign: 'left',
  }),
  goNextButton: {
    borderLeftWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  goNextBlank: {
    //marginVertical: (Platform.OS === 'web') ? 10 : 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    //width: (Platform.OS === 'web') ? 85 : 72,
  },
  goNextText: device => ({
    fontSize: (device !== 'phone') ? 13 : 10,
    textAlign: 'right',
  }),
  goBackText: device => ({
    fontSize: (device !== 'phone') ? 13 : 10,
    textAlign: 'center',
  }),
  centerWheel: {
    flex: 1,
    justifyContent: 'center',
  }
});
