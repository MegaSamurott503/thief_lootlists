import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  Text, View,
  useWindowDimensions
} from 'react-native';
import { useContext } from 'react';

import { SettingContext } from '@/constants/context';

/* **************** */
/*  SECTION HEADER  */
/* **************** */
// Custom text component showing a header for each list section.
// The long strings of spaces are given a 'strikethrough' style.
export function SectionHeader(props) {
  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch global setting states from context.
  const { device } = useContext(SettingContext);

  return (
    <View
      style={styles.listTitleView}
    >
      <Text style={[
        styles.listTitleText,
        Platform.OS !== 'web' && {
          fontSize: 14,
        },
        Platform.OS === 'web' && {
          fontSize: (width > 460) ? 18 : width*0.039,
        },
        {color: colors.text}
      ]}>
        <Text style={styles.listTitleLine}>
          {(width > 631)
            ? '                                        '
            : '                              '
          }
        </Text>
        {`  ${props.headerName}  `}
        <Text style={styles.listTitleLine}>
          {(width > 631)
            ? '                                        '
            : '                              '
          }
        </Text>
      </Text>
    </View>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  listTitleView: {
    alignItems: 'center',
    marginTop: (Platform.OS === 'web') ? 12 : 10,
  },
  listTitleText: {
    //fontSize: (Platform.OS === 'web') ? 18 : 14,
    fontWeight: 'bold',
  },
  listTitleLine: {
    textDecorationLine: 'line-through',
  },
});
