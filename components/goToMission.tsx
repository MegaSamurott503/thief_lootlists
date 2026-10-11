import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {
  StyleSheet, Platform,
  ImageBackground, Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  useWindowDimensions
} from 'react-native';
import { useState, useContext } from 'react';

import { myScreens } from '@/constants/imgMissions';
import { SettingContext } from '@/constants/context';

/* **************** */
/*   GO TO MISSION  */
/* **************** */
// Custom button component to choose a mission's lootlist.
export function GoToMission(props) {
  // Access the router object.
  const router = useRouter();

  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch global setting states from context.
  const { device } = useContext(SettingContext);

  // Determine which of the mission's two screenshots to show.
  let screenAB = 'MIS_' + props.missionID +
    (props.imgAB === 'B' ? '_B' : '_A');

  // Clicked: checks if the button has been clicked.
  // Used to display the loading wheel.
  const [getClicked, setClicked] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.buttonMission(width, props.boxSize),
        {backgroundColor: colors.backLight,
        borderColor: colors.border}
      ]}
      onPress={() => {
        setClicked(true);
        // Add a slight delay so loading wheel appears
        // before proceeding to load the lootlist screen.
        setTimeout(() => {
          // Turn loading wheel off.
          setClicked(false);
          // Pass mission's name as a parameter to lootlist screen.
          router.navigate('/list/' + props.missionID, {
            missionTitle: props.missionID,
          });
        }, 10);
      }}
    >
      {props.missionID &&
        <View style={styles.buttonImage(width)}>
          {/* ImageBackground lets you show elements in front of the image. */}
          <ImageBackground
            source={myScreens[screenAB]}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <View style={styles.centerWheel}>
              {/* Show the loading wheel when the button is clicked. */}
              {getClicked &&
                <ActivityIndicator
                  size='large'
                  color='yellow'
                />
              }
            </View>
          </ImageBackground>
        </View>
      }
      {/* Use backquotes to denote parameters in a string. */}
      {props.missionName &&
        <Text style={[
          styles.buttonText(width),
          {color: colors.text}
        ]}>
          {`${props.missionName}`}
          {props.subName && `:`}
        </Text>
      }
      {props.subName &&
        <Text style={[
          styles.buttonText(width),
          {color: colors.text}
        ]}>
          {`${props.subName}`}
        </Text>
      }
    </TouchableOpacity>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  buttonMission: (width, boxSize) => ({
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 2,
    margin: (width > 449) ? 8 : 6,
    width: (width > 1234) ? width*0.22 :
      (width > 617) ? width*0.23 : width*0.45,
    height: (width > 1199)
      ? ((boxSize) ? width*0.14 + (boxSize*20)
        : width*0.14)
      : (width > 999)
        ? ((boxSize) ? width*0.1425 + (boxSize*17)
          : width*0.1425)
        : (width > 699)
          ? ((boxSize) ? width*0.145 + (boxSize*15)
            : width*0.145)
          : (width > 399)
            ? ((boxSize) ? width*0.28 + (boxSize*15)
              : width*0.28)
            : ((boxSize) ? width*0.28 + (boxSize*11)
              : width*0.28)
  }),
  buttonImage: (width, boxSize) => ({
    width: (width > 617) ? '98%' : '95%',
    height: (width > 617)
      ? width*0.12
      : width*0.235
  }),
  buttonText: (width) => ({
    fontSize: (width > 1234)
      ? width*0.011
      : (width > 617)
        ? width*0.013
        : width*0.024,
    fontWeight: 'bold',
    textAlign: 'center',
  }),
  centerWheel: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  }
});
