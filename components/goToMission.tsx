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
import { useState } from 'react';

import { myScreens } from '@/constants/imgMissions';

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

  // Determine which of the mission's two screenshots to show.
  let screenAB = 'MIS_' + props.missionID +
    (props.imgAB === 'B' ? '_B' : '_A');

  // Determine whether to show the loading text.
  let isClicked = false;
  // Clicked: checks if the button has been clicked.
  // Used to display the loading wheel.
  const [getClicked, setClicked] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.buttonMission,
        Platform.OS !== 'web' && {
          width: '46%',
          height: (props.boxSize)
            ? width*0.64*0.46 + (props.boxSize*15)
            : width*0.64*0.46,
        },
        Platform.OS === 'web' && {
          width: (width > 618) ? 280 : '45%',
          height: (width > 618)
            ? ((props.boxSize) ? 175 + (props.boxSize*20) : 175)
            : ((props.boxSize) ? width*0.6*0.45 + (props.boxSize*17)
              : width*0.6*0.45),
        },
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
        <View
          style={[
            styles.buttonImage,
            Platform.OS !== 'web' && {
              width: '95%',
              height: width*0.64*0.38,
            },
            Platform.OS === 'web' && {
              width: (width > 618) ? 270 : '94%',
              height: (width > 618) ? 150 : width*0.6*0.38,
            }
          ]}
        >
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
          styles.buttonText,
          Platform.OS !== 'web' && {
            fontSize: 11,
          },
          Platform.OS === 'web' && {
            fontSize: (width > 618) ? 15 : width*0.024,
          },
          {color: colors.text}
        ]}>
          {`${props.missionName}`}
          {props.subName && `:`}
        </Text>
      }
      {props.subName &&
        <Text style={[
          styles.buttonText,
          Platform.OS !== 'web' && {
            fontSize: 11,
          },
          Platform.OS === 'web' && {
            fontSize: (width > 618) ? 15 : width*0.024,
          },
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
  buttonMission: {
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 2,
    margin: (Platform.OS === 'web') ? 8 : 4,
    //width: (Platform.OS === 'web') ? 280 : 190,
    //height: (Platform.OS === 'web') ? 175 : 120,
  },
  buttonImage: {
    //width: (Platform.OS === 'web') ? 270 : 180,
    //height: (Platform.OS === 'web') ? 150 : 100,
  },
  buttonText: {
    //fontSize: (Platform.OS === 'web') ? 15 : 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centerWheel: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  }
});
