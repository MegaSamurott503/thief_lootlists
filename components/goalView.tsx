import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  ImageBackground,
  Text, View,
  useWindowDimensions
} from 'react-native';
import { useContext } from 'react';

import { stylesList } from '@/constants/stylesList';
import { stylesTotal } from '@/constants/stylesTotal';
import {
  bgDefaultLight, bgDefaultDark,
  bgFoundLight, bgFoundDark,
  bgFoundLightS, bgFoundDarkS,
} from '@/constants/imgUI';
import { SettingContext, FoundContext } from '@/constants/context';

/* **************** */
/*     GOAL VIEW    */
/* **************** */
// Custom view component of a loot goal and its percentage.
export function GoalView(props) {
  // Fetch FoundLoot and FoundPocket states from context.
  //const {getFoundLoot, setFoundLoot, getFoundPocket, setFoundPocket} =
  //  React.useContext(FoundContext);

  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch global setting states from context.
  const {scheme, device,
    getCurrentTheme, setCurrentTheme} =
    useContext(SettingContext);

  return (
    <>
      {/* If no value minimum, display an empty space. */}
      {props.goalLoot === 0 &&
        <View style={styles.emptyRowBox(device)} />
      }
      {/* Otherwise, display the loot goal. */}
      {props.goalLoot > 0 &&
        <View style={[
          stylesTotal.tableRowBox,
          {width: (device === 'phone')
                  ? (width < 400) ? 48 : 66
                  : (width < 626) ? 60 : 100,
          borderColor: colors.border}
        ]}>
          <ImageBackground
            source={(getCurrentTheme === 'dark' ||
              (getCurrentTheme === 'default' && scheme === 'dark'))
              ? ((props.foundLoot >= props.goalLoot)
                ? ((device !== 'phone' && width < 626)
                  ? bgFoundDarkS : bgFoundDark)
                : bgDefaultDark)
              : ((props.foundLoot >= props.goalLoot)
                ? ((device !== 'phone' && width < 626)
                  ? bgFoundLightS : bgFoundLight)
                : bgDefaultLight)}
            resizeMode="cover"
            style={[
              stylesTotal.totalBackground,
              (device !== 'phone') ? stylesTotal.totalBackgroundWeb : ''
            ]}
          >
            {/* Display found loot compared to loot goal. */}
            <Text style={[
              stylesTotal.tableRowText,
              {color: colors.text}
            ]}>
              {props.foundLoot}
              {((device === 'phone' && width < 400) ||
                (device !== 'phone' && width < 626)) &&
                "\n"
              }
              {" / "}
              {props.goalLoot}
              {((device === 'phone' && width >= 400) ||
                (device !== 'phone' && width >= 626)) &&
                " "
              }
            </Text>
            {/* Display loot goal percentage. */}
            <Text style={[
              stylesTotal.tableRowText,
              stylesList.locCount,
              {color: colors.text}
            ]}>
              {"( "}
              {`${Math.round(
                (props.goalLoot / props.totalLoot) * 100 )}`}
              {"% )"}
            </Text>
          </ImageBackground>
        </View>
      }
    </>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  emptyRowBox: device => ({
    width: (device !== 'phone') ? 100 : 66,
  }),
});
