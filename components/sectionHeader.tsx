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
      style={styles.listTitleView(width)}
    >
      <Text style={[styles.listTitleText(width), {color: colors.text}]}>
        <Text style={styles.listTitleLine}>
          {/* Some browsers like Chrome see a string of all spaces
              as trailing whitespace and won't apply some styles to it.
              The zero-width space character \u200B prevents this. */}
          {(width > 617)
            ? '\u200B                                        \u200B'
            : (width > 449)
              ? '\u200B                              \u200B'
              : '\u200B                    \u200B'
          }
        </Text>
        {`  ${props.headerName}  `}
        <Text style={styles.listTitleLine}>
          {(width > 617)
            ? '\u200B                                        \u200B'
            : (width > 449)
              ? '\u200B                              \u200B'
              : '\u200B                    \u200B'
          }
        </Text>
      </Text>
    </View>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  listTitleView: (width) => ({
    alignItems: 'center',
    marginTop: (width > 449) ? 12 : 10,
  }),
  listTitleText: (width) => ({
    fontSize: (width > 449) ? 18 : 14,
    fontWeight: 'bold',
  }),
  listTitleLine: {
    textDecorationLine: 'line-through',
  },
});
